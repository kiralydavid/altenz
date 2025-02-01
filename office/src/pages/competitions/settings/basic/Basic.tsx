import { SegmentedControl, TextInput } from "react-hook-form-mantine";
import { Fieldset } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Divisions } from "./Divisions";
import { AgeGroups } from "./AgeGroups";
import { Genders } from "./Genders";
import { Scoring } from "../course/Scoring";

export const Basic = () => {
  const { control } = useFormContext();
  return (
    <>
      <Fieldset variant="unstyled" mb="xl">
        <TextInput
          label={t("settings.basic.name")}
          placeholder={t("settings.basic.name")}
          control={control}
          name="name"
        />
        <SegmentedControl
          fullWidth
          radius="xl"
          data={["Custom", "HDHIAA", "IFAA"]}
          withItemsBorders={false}
          mt="sm"
          control={control}
          name="rulebook"
        />
      </Fieldset>
      <Divisions />
      <AgeGroups />
      <Genders />
      <Scoring />
    </>
  );
};
