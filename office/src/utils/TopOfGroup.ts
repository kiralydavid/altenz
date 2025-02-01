import { find } from "es-toolkit/compat";
import {Entry, EntryRound} from "@/types/entry/Entry";

export const topOfGroup = (entry: Entry, topCount: number, round: string): boolean => {
  const roundOfEntry = find<EntryRound>(entry.rounds, { roundId: round });

  if (!roundOfEntry) {
    return false;
  }

  return (roundOfEntry.placement || Number.MAX_VALUE) <= topCount;
};
