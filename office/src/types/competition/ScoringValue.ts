export type ScoringValueId = string;
export type ScoringValueLabel = string;
export interface ScoringValue {
  id: ScoringValueId;
  label: ScoringValueLabel;
  value: number;
}
