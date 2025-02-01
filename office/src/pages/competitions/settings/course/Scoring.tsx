import { Group } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import { TextInput, NumberInput } from "react-hook-form-mantine";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { ReorderableFormList } from "../ReorderableFormList";

export const Scoring = () => {
  const { control } = useFormContext();

  return (
    <ReorderableFormList
      path="scoring"
      item={(index, key) => (
        <Group key={key}>
          <TextInput
            placeholder={t("settings.basic.scoring.label")}
            name={`scoring.${index}.label`}
            control={control}
          />
          <NumberInput
            min={0}
            max={100}
            placeholder={t("settings.basic.scoring.value")}
            name={`scoring.${index}.value`}
            control={control}
          />
        </Group>
      )}
      emptyItemCreator={() => ({
        id: nanoid6(),
        label: "",
        value: "",
      })}
      addButtonLabel={t("settings.basic.scoring.add")}
      legend={t("settings.basic.scoring.title")}
    />
  );
};
