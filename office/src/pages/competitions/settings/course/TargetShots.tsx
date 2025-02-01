import { NumberInput, Select } from "react-hook-form-mantine";
import { useFormContext } from "react-hook-form";
import { Group } from "@mantine/core";
import { t } from "i18next";
import classes from "./TargetShots.module.css";
import { ReorderableFormList } from "../ReorderableFormList";
import { Division } from "@/types/competition/Division";
import { AgeGroup } from "@/types/competition/AgeGroup";
import { Gender } from "@/types/competition/Gender";

interface TargetShotsProps {
  path: string;
}

export const TargetShots = ({ path }: TargetShotsProps) => {
  const { getValues, control } = useFormContext();

  return (
    <ReorderableFormList
      path={path}
      item={(index, key) => (
        <Group key={key}>
          <Select
            placeholder={t("settings.course.targetShots.all")}
            label={t("settings.course.targetShots.division")}
            className={classes.smallInput}
            data={getValues("divisions").map((item: Division) => ({
              label: item.code,
              value: item.id,
            }))}
            name={`${path}.${index}.division`}
            control={control}
          />
          <Select
            placeholder={t("settings.course.targetShots.all")}
            label={t("settings.course.targetShots.ageGroup")}
            className={classes.smallInput}
            data={getValues("ageGroups").map((item: AgeGroup) => ({
              label: item.code,
              value: item.id,
            }))}
            name={`${path}.${index}.ageGroup`}
            control={control}
          />
          <Select
            placeholder={t("settings.course.targetShots.all")}
            label={t("settings.course.targetShots.gender")}
            className={classes.smallInput}
            data={getValues("genders").map((item: Gender) => ({
              label: item.code,
              value: item.id,
            }))}
            name={`${path}.${index}.gender`}
            control={control}
          />
          <NumberInput
            label={t("settings.course.targetShots.shots")}
            className={classes.smallInput}
            placeholder="Shots"
            name={`${path}.${index}.shotCount`}
            control={control}
          />
        </Group>
      )}
      emptyItemCreator={() => ({
        ageGroup: "",
        division: "",
        gender: "",
        shotCount: "",
      })}
      addButtonLabel={t("settings.course.targetShots.add")}
      legend={t("settings.course.targetShots.title")}
    />
  );
};
