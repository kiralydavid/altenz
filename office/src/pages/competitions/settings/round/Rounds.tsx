import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Round } from "./Round";
import { nanoid6 } from "@/utils/utils";
import { Display } from "@/types/competition/Display";

export const Rounds = () => {
  const { getValues, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "rounds",
  });

  const [activeTab, setActiveTab] = useState<string | null>("0");

  const handleClickNew = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const roundId = nanoid6();
    append({
      id: roundId,
      name: "",
      courses: [],
      evaluations: [],
      requirements: [],
    });

    setValue("displays", [...getValues("displays"), { round: roundId, fields: [] }]);
    setActiveTab(fields.length.toString());
  };

  return (
    <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
      <Tabs.List mb="md">
        {fields.map(({ id }, index) => (
          <Tabs.Tab
            key={`${id}_tab`}
            value={index.toString()}
            rightSection={
              fields.length > 1 && (
                <IconX
                  size="14"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setValue(
                      "displays",
                      getValues("displays").filter(
                        (display: Display) => display.round !== getValues("rounds")[index].id,
                      ),
                    );
                    remove(index);
                    setActiveTab("0");
                  }}
                />
              )
            }
          >
            {getValues("rounds")[index].name || `Round ${index}`}
          </Tabs.Tab>
        ))}
        <Tabs.Tab value="new" leftSection={<IconPlus size="14" />} onClick={handleClickNew}>
          {t("settings.round.add")}
        </Tabs.Tab>
      </Tabs.List>
      {fields.map(({ id }, index) => (
        <Tabs.Panel key={`${id}_panel`} value={index.toString()}>
          <Round index={index} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
