import { TargetSelection } from "./TargetSelection";
import { TargetId } from "./Target";

export type StakeId = string;

export interface Stake {
  id: StakeId;
  name: string;
  custom: boolean;
  targetSelection?: TargetSelection[];
  targets: TargetId[];
}
