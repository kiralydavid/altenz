import { Stake } from "./Stake";
import { TargetList } from "./TargetList";
import { TranslatedLabel } from "../common/TranslatedLabel";

export type CourseId = string;

export interface Course {
  id: CourseId;
  name: TranslatedLabel;
  targets: TargetList;
  stakes: Stake[];
}
