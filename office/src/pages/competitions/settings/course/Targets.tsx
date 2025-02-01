import { TargetDefaults } from "./TargetDefaults";
import { TargetList } from "./TargetList";

interface TargetsProps {
  courseIndex: number;
}

export const Targets = ({ courseIndex }: TargetsProps) => (
  <div>
    <TargetDefaults courseIndex={courseIndex} />
    <TargetList courseIndex={courseIndex} />
  </div>
);
