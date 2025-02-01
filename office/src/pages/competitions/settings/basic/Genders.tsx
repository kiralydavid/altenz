import { TextInput } from "react-hook-form-mantine";
import { useFormContext } from "react-hook-form";
import { Group } from "@mantine/core";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";
import { TranslatedInput } from "../TranslatedInput";

export const Genders = () => {
  const { control } = useFormContext();

  return (
    <ReorderableFormList
      path="genders"
      item={(index, key) => (
        <Group key={key}>
          <TextInput
            placeholder={t("settings.basic.genders.code")}
            name={`genders.${index}.code`}
            control={control}
          />
          <TranslatedInput
            placeholder={t("settings.basic.genders.name")}
            path={`genders.${index}.name`}
          />
        </Group>
      )}
      emptyItemCreator={() => ({ id: nanoid6(), code: "", name: "" })}
      addButtonLabel={t("settings.basic.genders.add")}
      legend={t("settings.basic.genders.title")}
    />
  );
};
