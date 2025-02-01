import { MultiSelect } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";

interface SortByHighestScoreProps {
  formContext: UseFormReturn;
  roundIndex: number;
  evaluationIndex: number;
}

export const SortByHighestScore = ({
  formContext,
  roundIndex,
  evaluationIndex,
}: SortByHighestScoreProps) => (
  <>
    <MultiSelect
      placeholder={t("settings.round.evaluations.sortByHighestScore.rounds")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`rounds.${roundIndex}.evaluations.${evaluationIndex}.rounds`}
      control={formContext.control}
      defaultValue={[]}
    />
  </>
);
