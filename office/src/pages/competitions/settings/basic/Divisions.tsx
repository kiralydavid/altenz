import { TextInput } from "react-hook-form-mantine";
import { useFormContext } from "react-hook-form";
import { Group } from "@mantine/core";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";
import { TranslatedInput } from "../TranslatedInput";

export const Divisions = () => {
  const { control } = useFormContext();

  return (
    <ReorderableFormList
      path="divisions"
      item={(index, key) => (
        <Group key={key}>
          <TextInput
            placeholder={t("settings.basic.divisions.code")}
            control={control}
            name={`divisions.${index}.code`}
          />
          <TranslatedInput
            placeholder={t("settings.basic.divisions.name")}
            path={`divisions.${index}.name`}
          />
        </Group>
      )}
      emptyItemCreator={() => ({
        id: nanoid6(),
        code: "",
        name: { en: "", hu: "", sk: "" },
      })}
      addButtonLabel={t("settings.basic.divisions.add")}
      legend={t("settings.basic.divisions.title")}
    />
  );
};
