import { Tabs } from "@mantine/core";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { find } from "es-toolkit/compat";
import { Display as DisplayType } from "../../../../types/competition/Display";
import { Display } from "./Display";
import { Round } from "@/types/competition/Round";

export const Displays = () => {
  const { getValues } = useFormContext();

  const displays: DisplayType[] = getValues("displays");
  const rounds: Round[] = getValues("rounds");

  const [activeTab, setActiveTab] = useState<string | null>("0");
  return (
    <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
      <Tabs.List mb="md">
        {displays.map(({ round }, index) => (
          <Tabs.Tab key={`${round}_tab`} value={index.toString()}>
            {find<Round>(rounds, { id: round })?.name || round}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {displays.map(({ round }, index) => (
        <Tabs.Panel key={`${round}_panel`} value={index.toString()}>
          <Display displayIndex={index} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
