import { Division } from "./Division";
import { AgeGroup } from "./AgeGroup";
import { Gender } from "./Gender";

export type RulebookId = string;

export interface Rulebook {
  id: RulebookId;
  name: string;
  competitionType: string;

  divisions: Division[];
  ageGroups: AgeGroup[];
  genders: Gender[];
}

export type RulebookHead = Pick<Rulebook, "id" | "name" | "competitionType">;
