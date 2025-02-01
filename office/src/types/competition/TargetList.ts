import { Target } from "./Target";
import { Scoring } from "./Scoring";
import { Shots } from "./Shots";

export interface TargetDefaults {
  scores: Scoring;
  shots: Shots[];
}

export interface TargetList {
  defaults: TargetDefaults;
  targetList: Target[];
}
