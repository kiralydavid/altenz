import { IconLanguage } from "@tabler/icons-react";
import { TextInput } from "react-hook-form-mantine";
import { useFormContext } from "react-hook-form";
import { TextInputProps } from "@mantine/core";
import { useLanguage } from "./language-context";

type TranslatedInputProps = { path: string; placeholder: string } & TextInputProps;

export const TranslatedInput = ({ path, placeholder, ...props }: TranslatedInputProps) => {
  const { language } = useLanguage();

  const { control, getValues } = useFormContext();

  const fallbackValue: string | undefined = getValues(`${path}.en`);

  return (
    <TextInput
      {...props}
      key={`${path}.${language}`}
      control={control}
      name={`${path}.${language}`}
      placeholder={fallbackValue || placeholder}
      rightSection={<IconLanguage />}
    />
  );
};
