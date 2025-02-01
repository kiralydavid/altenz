import { Group } from "@mantine/core";
import { useFormContext, useWatch } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { SortByScore } from "../evaluation/SortByScore";
import { ReorderableFormList } from "../ReorderableFormList";
import { SortByHighestScore } from "../evaluation/SortByHighestScore";

const getEvaluationInputs = (evaluation: string | undefined) => {
  switch (evaluation) {
    case "SORT_BY_SCORE":
      return SortByScore;
    case "SORT_BY_HIGHEST_SCORE":
      return SortByHighestScore;
    default:
      return () => null;
  }
};

interface EvaluationsProps {
  roundIndex: number;
}

export const Evaluations = ({ roundIndex }: EvaluationsProps) => {
  const formContext = useFormContext();

  return (
    <ReorderableFormList
      path={`rounds.${roundIndex}.evaluations`}
      item={(index, key) => {
        useWatch({ name: `rounds.${roundIndex}.evaluations.${index}` });

        return (
          <Group key={key}>
            <Select
              placeholder="Type"
              data={["SORT_BY_SCORE", "SORT_BY_HIGHEST_SCORE"]}
              name={`rounds.${roundIndex}.evaluations.${index}.type`}
              control={formContext.control}
            />

            {getEvaluationInputs(
              formContext.getValues(`rounds.${roundIndex}.evaluations.${index}.type`),
            )({
              formContext,
              roundIndex,
              evaluationIndex: index,
            })}
          </Group>
        );
      }}
      emptyItemCreator={() => ({ id: nanoid6(), type: "" })}
      addButtonLabel={t("settings.round.evaluations.add")}
      legend={t("settings.round.evaluations.title")}
    />
  );
};
