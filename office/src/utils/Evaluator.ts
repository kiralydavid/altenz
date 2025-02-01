import { cloneDeep, find, groupBy } from "es-toolkit/compat";
import { setQualified } from "./Requirement";
import { sortEntriesByEvaluations } from "./Evaluation";
import {Entry, EntryRound} from "@/types/entry/Entry";
import { Competition } from "@/types/competition/Competition";
import {Round} from "@/types/competition/Round";

const assignPlacements = (sortedEntries: Entry[], roundId: string, tiedEntryIds: Set<string>) => {
  let currentPlacement = 1;
  let lastWasTied = false;

  for (const [index, entry] of sortedEntries.entries()) {
    const roundOfEntry = find<EntryRound>(entry.rounds, { roundId });

    if (!roundOfEntry) {
      continue;
    }

    if (!(tiedEntryIds.has(entry._id) && lastWasTied)) {
      currentPlacement = index + 1;
    }

    roundOfEntry.placement = currentPlacement;

    lastWasTied = tiedEntryIds.has(entry._id);
  }
};

export const evaluateRound = (
  entries: Entry[],
  competition: Competition,
  roundId: string,
): Entry[] => {
  const round = find<Round>(competition.rounds, { id: roundId });

  if (!round) {
    throw new Error(`Round not found: ${roundId}`);
  }

  const { evaluations, requirements } = round;

  const tiedEntryIds = new Set<string>();

  if (requirements) {
    setQualified(entries, requirements, competition, roundId);
  }

  sortEntriesByEvaluations(entries, evaluations, competition, tiedEntryIds);

  assignPlacements(entries, roundId, tiedEntryIds);

  return entries;
};

export const evaluate = (entries: Entry[], competition: Competition): Entry[] => {
  const sortedEntries = cloneDeep(entries);

  const groupedEntries = groupBy(
    sortedEntries,
    (entry) => `${entry.division}-${entry.ageGroup}-${entry.gender}`,
  );

  competition.rounds.forEach((round) => {
    Object.values(groupedEntries).forEach((entriesOfGroup) => {
      evaluateRound(entriesOfGroup, competition, round.id);
    });
  });

  const reverseRoundOrder = competition.rounds.toReversed().map((round) => round.id);

  for (const entry of sortedEntries) {
    const placements = reverseRoundOrder.map(
      (roundId) => entry.rounds.find((r) => r.roundId === roundId)?.placement,
    );

    entry.placement = placements.find(Boolean) ?? null;
  }

  return sortedEntries;
};
