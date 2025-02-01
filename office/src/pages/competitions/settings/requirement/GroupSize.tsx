import { NumberInput } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";

interface GroupSizeProps {
  formContext: UseFormReturn;
  roundIndex: number;
  requirementIndex: number;
}

export const GroupSize = ({ formContext, roundIndex, requirementIndex }: GroupSizeProps) => (
  <>
    <NumberInput
      style={{ width: 90 }}
      placeholder={t("settings.round.requirements.groupSize.size")}
      name={`rounds.${roundIndex}.requirements.${requirementIndex}.size`}
      control={formContext.control}
    />
  </>
);
