import { sortByScore } from "./SortByScore";
import { Competition } from "@/types/competition/Competition";
import { Evaluation } from "@/types/competition/Evaluation";
import { Entry } from "@/types/entry/Entry";
import { sortByHighestScore } from "./SortByHighestScore";

const callEvaluation = (evaluation: Evaluation, a: Entry, b: Entry, competition: Competition) => {
  switch (evaluation.type) {
    case "SORT_BY_SCORE":
      return sortByScore(a, b, evaluation.rounds, competition);
    case "SORT_BY_HIGHEST_SCORE":
      return sortByHighestScore(a, b, evaluation.rounds, competition);
    default:
      throw new Error(`Unknown evaluator type: ${evaluation.type}`);
  }
};

export const sortEntriesByEvaluations = (
  sortedEntries: Entry[],
  evaluations: Evaluation[],
  competition: Competition,
  tiedEntryIds: Set<string>,
) => {
  sortedEntries.sort((a, b) => {
    let compareResult = 0;

    for (const evaluator of evaluations) {
      const evaluationResult = callEvaluation(evaluator, a, b, competition);

      compareResult = compareResult || evaluationResult;

      if (compareResult !== 0) {
        break;
      }
    }

    if (compareResult === 0) {
      tiedEntryIds.add(a._id);
      tiedEntryIds.add(b._id);
    }

    return compareResult;
  });
};
