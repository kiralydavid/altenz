import { MultiSelect } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";

interface SortByScoreProps {
  formContext: UseFormReturn;
  roundIndex: number;
  evaluationIndex: number;
}

export const SortByScore = ({ formContext, roundIndex, evaluationIndex }: SortByScoreProps) => (
  <>
    <MultiSelect
      placeholder={t("settings.round.evaluations.sortByScore.rounds")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`rounds.${roundIndex}.evaluations.${evaluationIndex}.rounds`}
      control={formContext.control}
      defaultValue={[]}
    />
  </>
);
