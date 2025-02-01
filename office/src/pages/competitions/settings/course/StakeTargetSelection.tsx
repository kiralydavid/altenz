import { Group } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import classes from "./StakeTargetSelection.module.css";
import { ReorderableFormList } from "../ReorderableFormList";
import { Division } from "@/types/competition/Division";
import { AgeGroup } from "@/types/competition/AgeGroup";
import { Gender } from "@/types/competition/Gender";

interface StakeTargetSelectionProps {
  courseIndex: number;
  stakeIndex: number;
}

export const StakeTargetSelection = ({ courseIndex, stakeIndex }: StakeTargetSelectionProps) => {
  const { getValues, control } = useFormContext();

  return (
    <ReorderableFormList
      path={`courses.${courseIndex}.stakes.${stakeIndex}.targetSelection`}
      item={(index, key) => (
        <Group key={key}>
          <Select
            label="Division"
            className={classes.smallInput}
            data={getValues("divisions").map((item: Division) => ({
              label: item.code,
              value: item.id,
            }))}
            name={`courses.${courseIndex}.stakes.${stakeIndex}.targetSelection.${index}.division`}
            control={control}
          />
          <Select
            label="Age group"
            className={classes.smallInput}
            data={getValues("ageGroups").map((item: AgeGroup) => ({
              label: item.code,
              value: item.id,
            }))}
            name={`courses.${courseIndex}.stakes.${stakeIndex}.targetSelection.${index}.ageGroup`}
            control={control}
          />
          <Select
            label="Gender"
            className={classes.smallInput}
            data={getValues("genders").map((item: Gender) => ({
              label: item.code,
              value: item.id,
            }))}
            name={`courses.${courseIndex}.stakes.${stakeIndex}.targetSelection.${index}.gender`}
            control={control}
          />
          <Select
            label="Select"
            className={classes.smallInput}
            data={["ALL", "ONE"]}
            name={`courses.${courseIndex}.stakes.${stakeIndex}.targetSelection.${index}.select`}
            control={control}
          />
        </Group>
      )}
      emptyItemCreator={() => ({
        ageGroup: "",
        division: "",
        gender: "",
        select: "ALL",
      })}
      addButtonLabel="Add target selection"
      legend="Shots"
    />
  );
};
