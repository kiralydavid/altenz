import { NumberInput, Select } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";

interface TopOfGroupProps {
  formContext: UseFormReturn;
  roundIndex: number;
  requirementIndex: number;
}

export const TopOfGroup = ({ formContext, roundIndex, requirementIndex }: TopOfGroupProps) => (
  <>
    <NumberInput
      style={{ width: 90 }}
      placeholder={t("settings.round.requirements.topOfGroup.count")}
      name={`rounds.${roundIndex}.requirements.${requirementIndex}.topCount`}
      control={formContext.control}
    />
    <Select
      style={{ width: 180 }}
      placeholder={t("settings.round.requirements.topOfGroup.round")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`rounds.${roundIndex}.requirements.${requirementIndex}.round`}
      control={formContext.control}
    />
  </>
);
