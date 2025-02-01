import { Collapse, Group } from "@mantine/core";
import { useFormContext, useWatch } from "react-hook-form";
import { TextInput, Switch } from "react-hook-form-mantine";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";
import { TargetScoring } from "./TargetScoring";
import { TargetShots } from "./TargetShots";

interface TargetListProps {
  courseIndex: number;
}

export const TargetList = ({ courseIndex }: TargetListProps) => {
  const { setValue, getValues, control } = useFormContext();

  return (
    <ReorderableFormList
      path={`courses.${courseIndex}.targets.targetList`}
      item={(index, key) => (
        <Group key={key}>
          <TextInput
            placeholder={t("settings.course.targets.name")}
            name={`courses.${courseIndex}.targets.targetList.${index}.name`}
            control={control}
          />
          <Switch
            size="xl"
            onLabel={t("settings.course.targets.customShots")}
            offLabel={t("settings.course.targets.defaultShots")}
            name={`courses.${courseIndex}.targets.targetList.${index}.customShots`}
            onChange={() => {
              if (getValues(`courses.${courseIndex}.targets.targetList.${index}.customShots`)) {
                setValue(`courses.${courseIndex}.targets.targetList.${index}.shots`, []);
              } else {
                setValue(`courses.${courseIndex}.targets.targetList.${index}.shots`, undefined);
              }
            }}
            control={control}
          />
          <Switch
            size="xl"
            onLabel={t("settings.course.targets.customScores")}
            offLabel={t("settings.course.targets.defaultScores")}
            name={`courses.${courseIndex}.targets.targetList.${index}.customScores`}
            onChange={() => {
              if (getValues(`courses.${courseIndex}.targets.targetList.${index}.customScores`)) {
                setValue(`courses.${courseIndex}.targets.targetList.${index}.scores`, {
                  type: "EXACT",
                  scores: [],
                });
              } else {
                setValue(`courses.${courseIndex}.targets.targetList.${index}.scores`, undefined);
              }
            }}
            control={control}
          />
        </Group>
      )}
      collapseContent={(index) => {
        useWatch({ name: `courses.${courseIndex}.targets.targetList.${index}` });

        return (
          <Collapse
            in={
              getValues(`courses.${courseIndex}.targets.targetList.${index}.customShots`) ||
              getValues(`courses.${courseIndex}.targets.targetList.${index}.customScores`)
            }
          >
            {getValues(`courses.${courseIndex}.targets.targetList.${index}.customScores`) && (
              <TargetScoring
                path={`courses.${courseIndex}.targets.targetList.${index}.scores`}
                scoringValues={getValues("scoring")}
              />
            )}
            {getValues(`courses.${courseIndex}.targets.targetList.${index}.customShots`) && (
              <TargetShots path={`courses.${courseIndex}.targets.targetList.${index}.shots`} />
            )}
          </Collapse>
        );
      }}
      emptyItemCreator={() => ({
        id: nanoid6(),
        name: "",
        customShots: false,
        customScores: false,
      })}
      addButtonLabel={t("settings.course.targets.add")}
      legend={t("settings.course.targets.title")}
    />
  );
};
