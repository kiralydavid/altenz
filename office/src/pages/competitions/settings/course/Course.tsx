import { Fieldset } from "@mantine/core";
import { t } from "i18next";
import { Targets } from "./Targets";
import { StakeList } from "./StakeList";
import { TranslatedInput } from "../TranslatedInput";

interface CourseProps {
  index: number;
}

export const Course = ({ index }: CourseProps) => (
  <Fieldset mt="md">
    <TranslatedInput
      label={t("settings.course.name")}
      placeholder="Name"
      path={`courses.${index}.name`}
    />
    <Targets courseIndex={index} />
    <StakeList courseIndex={index} />
  </Fieldset>
);
