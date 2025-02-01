import { Group } from "@mantine/core";
import { useFormContext, useWatch } from "react-hook-form";
import { Select } from "react-hook-form-mantine";
import { t } from "i18next";
import { nanoid6 } from "@/utils/utils";
import { TopOfGroup } from "../requirement/TopOfGroup";
import { GroupSize } from "../requirement/GroupSize";
import { ReorderableFormList } from "../ReorderableFormList";

const getRequirementInputs = (requirement: string | undefined) => {
  switch (requirement) {
    case "TOP_OF_GROUP":
      return TopOfGroup;
    case "GROUP_SIZE":
      return GroupSize;
    default:
      return () => null;
  }
};

interface RequirementsProps {
  roundIndex: number;
}

export const Requirements = ({ roundIndex }: RequirementsProps) => {
  const formContext = useFormContext();

  return (
    <ReorderableFormList
      path={`rounds.${roundIndex}.requirements`}
      item={(index, key) => {
        useWatch({ name: `rounds.${roundIndex}.requirements.${index}` });

        return (
          <Group key={key}>
            <Select
              placeholder={t("settings.round.requirements.type")}
              data={["TOP_OF_GROUP", "IN_GROUP", "QUALIFICATION_LEVEL", "GROUP_SIZE"]}
              name={`rounds.${roundIndex}.requirements.${index}.type`}
              control={formContext.control}
            />

            {getRequirementInputs(
              formContext.getValues(`rounds.${roundIndex}.requirements.${index}.type`),
            )({
              formContext,
              roundIndex,
              requirementIndex: index,
            })}
          </Group>
        );
      }}
      emptyItemCreator={() => ({ id: nanoid6(), type: "" })}
      addButtonLabel={t("settings.round.requirements.add")}
      legend={t("settings.round.requirements.title")}
    />
  );
};
