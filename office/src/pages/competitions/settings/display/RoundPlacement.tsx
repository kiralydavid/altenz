import { Select } from "react-hook-form-mantine";
import { UseFormReturn } from "react-hook-form";
import { t } from "i18next";
import { Round } from "@/types/competition/Round";

interface RoundPlacementProps {
  formContext: UseFormReturn;
  displayIndex: number;
  columnIndex: number;
}

export const RoundPlacement = ({ formContext, displayIndex, columnIndex }: RoundPlacementProps) => (
  <>
    <Select
      placeholder={t("settings.display.fields.roundPlacement.rounds")}
      data={formContext
        .getValues("rounds")
        .map((round: Round) => ({ label: round.name, value: round.id }))}
      name={`displays.${displayIndex}.fields.${columnIndex}.round`}
      control={formContext.control}
      defaultValue={[]}
      style={{ width: 200 }}
    />
  </>
);
