import { MultiSelect } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";

interface ScoreProps {
  formContext: UseFormReturn;
  displayIndex: number;
  columnIndex: number;
}

export const Score = ({ formContext, displayIndex, columnIndex }: ScoreProps) => (
  <>
    <MultiSelect
      placeholder={t("settings.display.fields.score.rounds")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`displays.${displayIndex}.fields.${columnIndex}.rounds`}
      control={formContext.control}
      defaultValue={[]}
    />
  </>
);
