import { Button } from "@mantine/core";
import { ScoringValue, ScoringValueId } from "@/types/competition/ScoringValue";

interface ExactScoreInputProps {
  targetScoringValueIds: ScoringValueId[];
  scoringValues: ScoringValue[];
  onClick: (scoringValueId: ScoringValueId) => void;
}

export const ExactScoreInput = ({
  targetScoringValueIds,
  scoringValues,
  onClick,
}: ExactScoreInputProps) => (
  <div>
    {targetScoringValueIds.map((sv) => (
      <Button onClick={() => onClick(sv)}>{scoringValues.find((sc) => sc.id === sv)?.label}</Button>
    ))}
  </div>
);
