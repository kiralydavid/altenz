import { ScoringValueId } from "./ScoringValue";

export interface Exact {
  type: "EXACT";
  scores: ScoringValueId[];
}

export interface Range {
  type: "RANGE";
  min: number;
  max: number;
}

export type Scoring = Exact | Range;
