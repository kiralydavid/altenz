import { SegmentedControl } from "@mantine/core";
import { Language, useLanguage } from "./language-context";

export const LanguageSelect = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <SegmentedControl
      fullWidth
      size="sm"
      radius="lg"
      value={language}
      data={[
        {
          value: "en",
          label: <img alt="en" src={new URL("../../../flags/s/GBR.svg", import.meta.url).href} />,
        },
        {
          value: "hu",
          label: <img alt="hu" src={new URL("../../../flags/s/HUN.svg", import.meta.url).href} />,
        },
        {
          value: "sk",
          label: <img alt="sk" src={new URL("../../../flags/s/SVK.svg", import.meta.url).href} />,
        },
      ]}
      withItemsBorders={false}
      onChange={(value) => setLanguage(value as Language)}
    />
  );
};
