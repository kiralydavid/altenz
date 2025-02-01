export interface TopOfGroup {
  type: "TOP_OF_GROUP";
  topCount: number;
  round: string;
}

export interface InGroup {
  type: "IN_GROUP";
  division?: string[];
  ageGroup?: string[];
}

export interface QualificationLevelDefinition {
  division?: string;
  ageGroup?: string;
  gender?: string;
  percentage: number;
}

export interface QualificationLevel {
  type: "QUALIFICATION_LEVEL";
  qualificationLevel: QualificationLevelDefinition[];
  rounds: string[];
}

export interface GroupSize {
  type: "GROUP_SIZE";
  size: number;
}

export type Requirement = TopOfGroup | InGroup | QualificationLevel | GroupSize;
