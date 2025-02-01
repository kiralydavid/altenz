import { Shots } from "./Shots";
import { Scoring } from "./Scoring";

export type TargetId = string;
export type TargetName = string;

export interface Target {
  id: TargetId;
  name: TargetName;
  customShots: boolean;
  customScores: boolean;
  scores?: Scoring;
  shots?: Shots[];
}
