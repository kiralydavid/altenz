import { Group } from "@mantine/core";
import { useFormContext, useWatch } from "react-hook-form";
import { Select, TextInput } from "react-hook-form-mantine";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";
import { ScoringValueCount } from "./ScoringValueCount";
import { Score } from "./Score";
import { StakeIndexScore } from "./StakeIndexScore";
import { RoundPlacement } from "./RoundPlacement";

const getColumnInputs = (columnType: string | undefined) => {
  switch (columnType) {
    case "PLACEMENT":
      return () => null;
    case "ROUND_PLACEMENT":
      return RoundPlacement;
    case "SCORING_VALUE_COUNT":
      return ScoringValueCount;
    case "SCORE":
      return Score;
    case "STAKE_SCORE":
      return Score;
    case "STAKE_INDEX_SCORE":
      return StakeIndexScore;
    case "SCORE_PERCENTAGE":
      return Score;
    case "QUALIFICATION":
      return Score;
    default:
      return () => null;
  }
};

interface DisplayProps {
  displayIndex: number;
}

export const Display = ({ displayIndex }: DisplayProps) => {
  const formContext = useFormContext();

  return (
    <ReorderableFormList
      key={`fields_${displayIndex}`}
      path={`displays.${displayIndex}.fields`}
      item={(index, key) => {
        useWatch({ name: `displays.${displayIndex}.fields.${index}` });

        return (
          <Group key={key}>
            <TextInput
              placeholder="Label"
              name={`displays.${displayIndex}.fields.${index}.label`}
              control={formContext.control}
              style={{ width: 80 }}
            />
            <Select
              placeholder="Type"
              data={[
                "PLACEMENT",
                "ROUND_PLACEMENT",
                "SCORING_VALUE_COUNT",
                "SCORE",
                "STAKE_SCORE",
                "STAKE_INDEX_SCORE",
                "SCORE_PERCENTAGE",
                "QUALIFICATION",
              ]}
              name={`displays.${displayIndex}.fields.${index}.type`}
              control={formContext.control}
              style={{ width: 150 }}
            />

            {getColumnInputs(
              formContext.getValues(`displays.${displayIndex}.fields.${index}.type`),
            )({
              formContext,
              displayIndex,
              columnIndex: index,
            })}
          </Group>
        );
      }}
      emptyItemCreator={() => ({ id: nanoid6(), type: "" })}
      addButtonLabel={t("settings.display.fields.add")}
      legend={t("settings.display.fields.title")}
    />
  );
};
