import { Fieldset } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import { TargetShots } from "./TargetShots";
import { TargetScoring } from "./TargetScoring";

interface TargetDefaultsProps {
  courseIndex: number;
}

export const TargetDefaults = ({ courseIndex }: TargetDefaultsProps) => {
  const { getValues } = useFormContext();

  return (
    <Fieldset legend={t("settings.course.targets.defaults.title")}>
      <TargetScoring
        path={`courses.${courseIndex}.targets.defaults.scores`}
        scoringValues={getValues("scoring")}
      />
      <TargetShots path={`courses.${courseIndex}.targets.defaults.shots`} />
    </Fieldset>
  );
};
