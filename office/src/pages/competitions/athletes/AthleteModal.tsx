import { Button } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import { Select, TextInput } from "react-hook-form-mantine";
import { useEffect } from "react";
import { t } from "i18next";
import { useEntryDB } from "@/db/entry-context";
import { useCompetitionDB } from "@/db/competition-context";
import { Entry } from "@/types/entry/Entry";
import { tl } from "@/utils/utils";
import { createEntry } from "./createEntry";

interface AthleteModalProps {
  entryId?: string;
}

export const AthleteModal = ({ entryId }: AthleteModalProps) => {
  const { entries, putEntry } = useEntryDB();
  const { competition } = useCompetitionDB();
  const form = useForm<Pick<Entry, "name" | "division" | "ageGroup" | "gender">>();

  const editingEntry = entries.find((entry) => entry._id === entryId);

  useEffect(() => {
    form.reset(editingEntry);
  }, [editingEntry]);

  if (!competition) {
    return null;
  }

  const put = () => {
    if (editingEntry) {
      putEntry({
        ...editingEntry,
        ...form.getValues(),
      });
    } else {
      putEntry(createEntry(form.getValues(), competition));
    }
  };

  return (
    <FormProvider {...form}>
      <TextInput
        label={t("athletes.athleteModal.firstName")}
        name="name.last"
        control={form.control}
      />
      <TextInput
        label={t("athletes.athleteModal.lastName")}
        name="name.first"
        control={form.control}
      />
      <Select
        label={t("athletes.athleteModal.division")}
        name="division"
        control={form.control}
        data={competition.divisions.map((division) => ({
          label: tl(division.name) ?? "",
          value: division.id,
        }))}
      />
      <Select
        label={t("athletes.athleteModal.ageGroup")}
        name="ageGroup"
        control={form.control}
        data={competition.ageGroups.map((ageGroup) => ({
          label: tl(ageGroup.name) ?? "",
          value: ageGroup.id,
        }))}
      />
      <Select
        label={t("athletes.athleteModal.gender")}
        name="gender"
        control={form.control}
        data={competition.genders.map((gender) => ({
          label: tl(gender.name) ?? "",
          value: gender.id,
        }))}
      />
      <Button onClick={put}>{t("athletes.athleteModal.add")}</Button>
    </FormProvider>
  );
};
