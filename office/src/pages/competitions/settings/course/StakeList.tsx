import { Collapse, Group } from "@mantine/core";
import { MultiSelect, Switch, TextInput } from "react-hook-form-mantine";
import { useFormContext, useWatch } from "react-hook-form";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";
import { StakeTargetSelection } from "./StakeTargetSelection";
import classes from "./StakeList.module.css";
import { Target } from "@/types/competition/Target";

interface StakeListProps {
  courseIndex: number;
}

export const StakeList = ({ courseIndex }: StakeListProps) => {
  const { getValues, control } = useFormContext();

  return (
    <ReorderableFormList
      path={`courses.${courseIndex}.stakes`}
      item={(index, key) => (
        <Group key={key}>
          <TextInput
            placeholder={t("settings.course.stakes.name")}
            className={classes.name}
            name={`courses.${courseIndex}.stakes.${index}.name`}
            control={control}
          />
          <MultiSelect
            className={classes.targets}
            placeholder={t("settings.course.stakes.targets")}
            data={getValues(`courses.${courseIndex}.targets.targetList`).map((item: Target) => ({
              label: item.name,
              value: item.id,
            }))}
            name={`courses.${courseIndex}.stakes.${index}.targets`}
            control={control}
          />
          <Switch
            size="xl"
            onLabel={t("settings.course.stakes.custom")}
            offLabel={t("settings.course.stakes.default")}
            name={`courses.${courseIndex}.stakes.${index}.custom`}
            control={control}
          />
        </Group>
      )}
      collapseContent={(index) => {
        useWatch({ name: `courses.${courseIndex}.stakes.${index}.custom` });
        return (
          <Collapse in={getValues(`courses.${courseIndex}.stakes.${index}.custom`)}>
            <StakeTargetSelection courseIndex={courseIndex} stakeIndex={index} />
          </Collapse>
        );
      }}
      emptyItemCreator={() => ({
        id: nanoid6(),
        name: "",
        targets: [],
        targetSelection: [],
      })}
      addButtonLabel={t("settings.course.stakes.add")}
      legend={t("settings.course.stakes.title")}
    />
  );
};
