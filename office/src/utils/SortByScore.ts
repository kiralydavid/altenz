import { calculateScoreSumOfRounds } from "./EntryUtils";
import { Entry } from "@/types/entry/Entry";
import { Competition } from "@/types/competition/Competition";

export const sortByScore = (
  a: Entry,
  b: Entry,
  rounds: string[],
  competition: Competition,
): number => {
  if (rounds.length === 0) {
    throw new Error("sortByScore needs at least one round to sort by!");
  }

  return (
    calculateScoreSumOfRounds(b, rounds, competition.scoring) -
    calculateScoreSumOfRounds(a, rounds, competition.scoring)
  );
};
