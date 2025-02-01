import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { t } from "i18next";
import { Modal } from "@mantine/core";
import { useState } from "react";
import { find } from "es-toolkit/compat";
import { useEntryDB } from "@/db/entry-context";
import { Entry } from "@/types/entry/Entry";
import { useCompetitionDB } from "@/db/competition-context";
import { RoundScoreTable } from "./round-score-table/RoundScoreTable";
import { Scorecard } from "./scorecard/Scorecard";
import { evaluate } from "@/utils/Evaluator";

const getEntriesOfRound = (entries: Entry[], roundId: string): Entry[] =>
  entries.filter((entry) =>
    entry.rounds.find((entryRound) => entryRound.roundId === roundId && entryRound.qualified),
  );

export const RoundPage = () => {
  const { roundId } = useParams();
  const { entries } = useEntryDB();
  const { competition } = useCompetitionDB();

  const [scorecardEntryId, setScorecardEntryId] = useState<string | null>(null);
  const [scorecardModalOpened, { open, close }] = useDisclosure(false);

  const round = competition?.rounds.find((r) => r.id === roundId);

  if (!competition) {
    return <div>Competition data is missing</div>;
  }

  const evaluatedEntries = evaluate(entries, competition);

  const entriesOfRound = getEntriesOfRound(evaluatedEntries, roundId || "");

  if (!round) {
    return <div>Round data is missing</div>;
  }

  return (
    <div>
      Round: {round.name}
      <RoundScoreTable
        key={round.id}
        roundId={round.id}
        entries={entriesOfRound}
        onEdit={(entry) => {
          setScorecardEntryId(entry._id);
          open();
        }}
        onDelete={() => {}}
        displayFields={find(competition.displays, { round: round.id })?.fields || []}
      />
      <Modal
        opened={scorecardModalOpened}
        onClose={() => {
          setScorecardEntryId(null);
          close();
        }}
        title={t("round.scorecardModal.title")}
      >
        {scorecardEntryId && (
          <Scorecard
            key={`${scorecardEntryId}-${round.id}`}
            entryId={scorecardEntryId}
            round={round}
            competition={competition}
          />
        )}
      </Modal>
    </div>
  );
};
