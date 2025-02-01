import { Division } from "./Division";
import { AgeGroup } from "./AgeGroup";
import { Gender } from "./Gender";
import { Course } from "./Course";
import { Round } from "./Round";
import { CompetitionState } from "./CompetitionState";
import { RulebookHead } from "./Rulebook";
import { Display } from "./Display";
import { ScoringValue } from "./ScoringValue";

export type CompetitionId = string;
export interface Competition {
  _id: CompetitionId;
  _rev: string | undefined;
  name: string;
  owner: string;
  state: CompetitionState;
  rulebook?: RulebookHead;
  divisions: Division[];
  ageGroups: AgeGroup[];
  genders: Gender[];
  scoring: ScoringValue[];
  courses: Course[];
  rounds: Round[];
  displays: Display[];
}
