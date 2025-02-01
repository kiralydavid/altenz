import { Group } from "@mantine/core";
import { MultiSelect, NumberInput, SegmentedControl } from "react-hook-form-mantine";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import { ScoringValue } from "@/types/competition/ScoringValue";

interface TargetScoringProps {
  path: string;
  scoringValues: ScoringValue[];
}

export const TargetScoring = ({ path, scoringValues }: TargetScoringProps) => {
  const { getValues, control } = useFormContext();

  return (
    <Group>
      <SegmentedControl
        radius="xl"
        data={[
          { label: t("settings.course.targetScoring.exact"), value: "EXACT" },
          { label: t("settings.course.targetScoring.range"), value: "RANGE" },
        ]}
        withItemsBorders={false}
        mt="sm"
        name={`${path}.type`}
        control={control}
      />
      {getValues(`${path}.type`) === "EXACT" && (
        <>
          <MultiSelect
            label={t("settings.course.targetScoring.title")}
            data={scoringValues.map((item) => ({
              label: item.label,
              value: item.id,
            }))}
            name={`${path}.scores`}
            control={control}
          />
        </>
      )}
      {getValues(`${path}.type`) === "RANGE" && (
        <>
          <NumberInput min={0} max={999} placeholder="Min" name={`${path}.min`} control={control} />
          <NumberInput min={0} max={999} placeholder="Max" name={`${path}.max`} control={control} />
        </>
      )}
    </Group>
  );
};
