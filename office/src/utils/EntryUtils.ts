import { countBy, find, keyBy, sum } from "es-toolkit/compat";
import {Entry, EntryRound, Hit, ScoreCount} from "@/types/entry/Entry";
import { ScoringValue } from "@/types/competition/ScoringValue";
import { Competition } from "@/types/competition/Competition";

export const scoreCountsFromHits = (hits: Hit[]): ScoreCount[] => {
  const hitsWithScoringValue = hits.filter((hit) => !!hit.scoringValue);
  const countOfValues = countBy(hitsWithScoringValue, (hit) => hit.scoringValue!);
  return Object.entries(countOfValues).map(([scoringValue, count]) => ({
    scoringValueId: scoringValue,
    count,
  }));
};

export const scoreFromHits = (hits: Hit[], scoring: ScoringValue[]): number => {
  const scoringMap = keyBy(scoring, (scoringValue) => scoringValue.id);
  const hitsWithScoringValue = hits.filter((hit) => !!hit.scoringValue);
  const values = hitsWithScoringValue.map((hit) =>
    hit.scoringValueId ? scoringMap[hit.scoringValueId].value : hit.scoringValue!,
  );
  return sum(values);
};

export const calculateScoreSumOfRounds = (
  entry: Entry,
  rounds: string[],
  scoring: ScoringValue[],
): number => {
  let sumScoreOfEntry = 0;

  rounds.forEach((roundId) => {
    const round = find<EntryRound>(entry.rounds, { roundId });

    if (round) {
      if (round.hits.length > 0) {
        sumScoreOfEntry += scoreFromHits(round.hits, scoring);
      } else {
        //sumScoreOfEntry += scoreFromScoreCounts(round.scores, course.scoring);
      }
    }
  });

  return sumScoreOfEntry;
};

export const highestScoreOfRounds = (
  entry: Entry,
  rounds: string[],
  competition: Competition,
): number => {
  let highestScore = 0;

  rounds.forEach((roundId) => {
    const round = find<EntryRound>(entry.rounds, { roundId });

    if (round) {
      round.hits.forEach((hit) => {
        const numericValue = scoreFromHits([hit], competition.scoring);
        if (numericValue > highestScore) {
          highestScore = numericValue;
        }
      });
    }
  });

  return highestScore;
};
