import { MultiSelect, Select } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";
import { ScoringValue } from "@/types/competition/ScoringValue";

interface ScoringValueCountProps {
  formContext: UseFormReturn;
  displayIndex: number;
  columnIndex: number;
}

export const ScoringValueCount = ({
  formContext,
  displayIndex,
  columnIndex,
}: ScoringValueCountProps) => (
  <>
    <MultiSelect
      nothingFoundMessage={t("settings.display.fields.scoringValueCount.rounds")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`displays.${displayIndex}.fields.${columnIndex}.rounds`}
      control={formContext.control}
      defaultValue={[]}
      style={{ width: 200 }}
    />
    <Select
      placeholder={t("settings.display.fields.scoringValueCount.scoringValue")}
      data={formContext.getValues("scoring").map((scoringValue: ScoringValue) => ({
        label: scoringValue.label,
        value: scoringValue.id,
      }))}
      name={`displays.${displayIndex}.fields.${columnIndex}.scoringValue`}
      control={formContext.control}
      defaultValue={[]}
      style={{ width: 70 }}
    />
  </>
);
