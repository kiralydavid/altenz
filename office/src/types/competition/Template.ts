import { Rulebook } from "./Rulebook";
import { Division } from "./Division";
import { AgeGroup } from "./AgeGroup";
import { Gender } from "./Gender";

export type TemplateId = string;

export interface Template {
  id: TemplateId;
  rulebook: Rulebook;
  divisions: Division[];
  ageGroups: AgeGroup[];
  genders: Gender[];
}
