import { Evaluation } from "./Evaluation";
import { Requirement } from "./Requirement";
import { CourseId } from "./Course";

export type RoundId = string;

export interface Round {
  id: RoundId;
  name: string;
  courses: CourseId[];
  requirements: Requirement[];
  evaluations: Evaluation[];
}
