import { find, groupBy } from "es-toolkit/compat";
import { useCompetitionDB } from "@/db/competition-context";
import { useEntryDB } from "@/db/entry-context";
import { evaluate } from "@/utils/Evaluator";
import { RoundScoreTable } from "../round/round-score-table/RoundScoreTable";

export const ResultsPage = () => {
  const { competition } = useCompetitionDB();
  const { entries } = useEntryDB();

  if (!competition) {
    return <div>No comp</div>;
  }

  const sortedEntries = evaluate(entries, competition);

  const groupedEntries = groupBy(sortedEntries, (entry) => {
    const key = `${entry.division}-${entry.ageGroup}-${entry.gender}`;
    return key;
  });

  const displayFields = [...(find(competition.displays, { round: "SUMMARY" })?.fields || [])];

  return (
    <div>
      {Object.keys(groupedEntries).map((group) => (
        <>
          <h4>{group}</h4>
          <RoundScoreTable
            key={`SUMMARY_${group}`}
            roundId="SUMMARY"
            entries={groupedEntries[group].toSorted(
              (a, b) => (a.placement ?? 9999) - (b.placement ?? 9999),
            )}
            onEdit={() => {}}
            onDelete={() => {}}
            displayFields={displayFields}
          />
        </>
      ))}
    </div>
  );
};
