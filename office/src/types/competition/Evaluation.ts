import { ScoringValueId } from "./ScoringValue";

export interface SortByScore {
  type: "SORT_BY_SCORE";
  rounds: string[];
}

export interface SortByHighestScore {
  type: "SORT_BY_HIGHEST_SCORE";
  rounds: string[];
}

export interface Elimination {
  type: "ELIMINATION";
  numberOfMisses: number;
}

export interface Brackets {
  type: "BRACKETS";
}

interface RoundScoringValue {
  round: string;
  scoringValue: ScoringValueId;
}

interface TiebreakingValue {
  value: RoundScoringValue[];
  operator: "GT" | "LT";
}

export interface Tiebreaking {
  type: "TIEBREAKING";
  values: TiebreakingValue[];
}

export interface TiebreakerShot {
  type: "TIEBREAKER_SHOT";
}

export type Evaluation =
  | SortByScore
  | SortByHighestScore
  | Elimination
  | Tiebreaking
  | TiebreakerShot
  | Brackets;
