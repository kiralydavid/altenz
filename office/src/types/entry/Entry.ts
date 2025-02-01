import { DivisionId } from "../competition/Division";
import { AgeGroupId } from "../competition/AgeGroup";
import { GenderId } from "../competition/Gender";
import { StakeId } from "../competition/Stake";
import { RoundId } from "../competition/Round";
import { CourseId } from "../competition/Course";
import { ScoringValueId } from "../competition/ScoringValue";

interface Name {
  first: string;
  last: string;
}

export interface ScoreCount {
  scoringValueId: ScoringValueId;
  count: number;
}

export interface Hit {
  stakeId: StakeId;
  target: string;
  shot: number;
  scoringValueId?: ScoringValueId;
  scoringValue?: number;
}

export interface TeamInfo {
  team: string;
  teamIndex: number;
  startStake: StakeId;
}

export interface EntryRound {
  roundId: RoundId;
  courseId: CourseId;
  placement: number | null;
  qualified: boolean;
  teamInfo: TeamInfo | null;
  //scores: ScoreCount[];
  hits: Hit[];
  tiebreaker?: number;
}

export interface Entry {
  _id: string;
  _rev: string | undefined;
  name: Name;
  owner: string;
  division: DivisionId;
  ageGroup: AgeGroupId;
  gender: GenderId;
  rounds: EntryRound[];
  competition: string;
  placement: number | null;
}
