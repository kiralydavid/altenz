import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import { IconPlus, IconX } from "@tabler/icons-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Course } from "./Course";
import { useLanguage } from "../language-context";
import { nanoid6 } from "@/utils/utils";

export const Courses = () => {
  const { tl } = useLanguage();
  const [activeTab, setActiveTab] = useState<string | null>("0");

  const { getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "courses",
  });

  const handleClickNew = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    append({
      id: nanoid6(),
      name: "",
      scoring: [],
      targets: {
        defaults: { scores: { type: "EXACT" }, shots: [] },
        targetList: [],
      },
      stakes: [],
    });
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
              getValues("courses").length > 1 && (
                <IconX
                  size="14"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    remove(index);
                    setActiveTab("0");
                  }}
                />
              )
            }
          >
            {tl(getValues(`courses.${index}.name`)) || `Course ${index}`}
          </Tabs.Tab>
        ))}
        <Tabs.Tab
          key="new"
          value="new"
          leftSection={<IconPlus size="14" />}
          onClick={handleClickNew}
        >
          {t("settings.course.add")}
        </Tabs.Tab>
      </Tabs.List>
      {fields.map(({ id }, index) => (
        <Tabs.Panel key={`${id}_panel`} value={index.toString()}>
          <Course index={index} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
