import { NumberInput } from "@mantine/core";
import { Range } from "@/types/competition/Scoring";

interface RangeScoreInputProps {
  scoring: Range;
  value: number | undefined;
  onChange: (value: number) => void;
}

export const RangeScoreInput = ({ scoring, value, onChange }: RangeScoreInputProps) => (
  <div>
    <NumberInput
      value={value}
      min={scoring.min}
      max={scoring.max}
      onChange={(newValue) => onChange(parseInt(newValue.toString(), 10))}
    />
  </div>
);
