import { NumberInput, TextInput } from "react-hook-form-mantine";
import { useFormContext } from "react-hook-form";
import { Group } from "@mantine/core";
import { t } from "i18next";
import classes from "./AgeGroups.module.css";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";
import { TranslatedInput } from "../TranslatedInput";

export const AgeGroups = () => {
  const { control } = useFormContext();

  return (
    <ReorderableFormList
      path="ageGroups"
      item={(index, key) => (
        <Group key={key}>
          <TextInput
            placeholder={t("settings.basic.ageGroups.code")}
            name={`ageGroups.${index}.code`}
            control={control}
          />
          <TranslatedInput
            placeholder={t("settings.basic.ageGroups.name")}
            path={`ageGroups.${index}.name`}
          />
          <NumberInput
            className={classes.number}
            min={1}
            max={100}
            placeholder={t("settings.basic.ageGroups.from")}
            name={`ageGroups.${index}.from`}
            control={control}
          />
          <NumberInput
            className={classes.number}
            min={1}
            max={100}
            placeholder={t("settings.basic.ageGroups.to")}
            name={`ageGroups.${index}.to`}
            control={control}
          />
        </Group>
      )}
      emptyItemCreator={() => ({ id: nanoid6(), code: "", name: "", from: null, to: null })}
      addButtonLabel={t("settings.basic.ageGroups.add")}
      legend={t("settings.basic.ageGroups.title")}
    />
  );
};
