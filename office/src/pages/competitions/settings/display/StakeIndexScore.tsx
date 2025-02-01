import { NumberInput, Select } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";

interface StakeIndexScoreProps {
  formContext: UseFormReturn;
  displayIndex: number;
  columnIndex: number;
}

export const StakeIndexScore = ({
  formContext,
  displayIndex,
  columnIndex,
}: StakeIndexScoreProps) => (
  <>
    <Select
      placeholder={t("settings.display.fields.scoringValueCount.rounds")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`displays.${displayIndex}.fields.${columnIndex}.round`}
      control={formContext.control}
      defaultValue={[]}
      style={{ width: 200 }}
    />
    <NumberInput
      min={1}
      max={100}
      placeholder={t("settings.display.fields.scoringValueCount.stakeIndex")}
      name={`displays.${displayIndex}.fields.${columnIndex}.stakeIndex`}
      control={formContext.control}
      style={{ width: 70 }}
    />
  </>
);
