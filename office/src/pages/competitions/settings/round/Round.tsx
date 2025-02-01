import { Fieldset } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { MultiSelect, TextInput } from "react-hook-form-mantine";
import { t } from "i18next";
import { Requirements } from "./Requirements";
import { Evaluations } from "./Evaluations";
import { Course } from "@/types/competition/Course";
import { tl } from "@/utils/utils";

interface RoundProps {
  index: number;
}

export const Round = ({ index }: RoundProps) => {
  const { getValues, control } = useFormContext();

  return (
    <Fieldset mt="md">
      <TextInput
        label={t("settings.round.name")}
        placeholder={t("settings.round.name")}
        name={`rounds.${index}.name`}
        control={control}
      />
      <MultiSelect
        placeholder={t("settings.round.courses")}
        data={getValues("courses").map((course: Course) => ({
          label: tl(course.name),
          value: course.id,
        }))}
        name={`rounds.${index}.courses`}
        control={control}
        defaultValue={[]}
      />
      <Requirements roundIndex={index} />
      <Evaluations roundIndex={index} />
    </Fieldset>
  );
};
