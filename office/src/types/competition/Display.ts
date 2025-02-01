import { RoundId } from "./Round";
import { ScoringValueId } from "./ScoringValue";
import { StakeId } from "./Stake";

interface Placement {
  type: "PLACEMENT";
}

interface RoundPlacement {
  type: "ROUND_PLACEMENT";
  round: RoundId;
}

interface StakeScore {
  type: "STAKE_SCORE";
  round: RoundId;
  stake: StakeId;
}

interface StakeIndexScore {
  type: "STAKE_INDEX_SCORE";
  round: RoundId;
  stakeIndex: number;
}

interface ScoringValueCount {
  type: "SCORING_VALUE_COUNT";
  rounds: RoundId[];
  scoringValue: ScoringValueId;
}

interface Score {
  type: "SCORE";
  rounds: RoundId[];
}

interface ScorePercentage {
  type: "SCORE_PERCENTAGE";
  rounds: RoundId[];
}

interface Qualification {
  type: "QUALIFICATION";
  rounds: RoundId[];
}

export type DisplayField = {
  id: string;
  label: string;
} & (
  | ScoringValueCount
  | Score
  | ScorePercentage
  | Qualification
  | StakeScore
  | StakeIndexScore
  | Placement
  | RoundPlacement
);

export interface Display {
  round: RoundId;
  fields: DisplayField[];
}
