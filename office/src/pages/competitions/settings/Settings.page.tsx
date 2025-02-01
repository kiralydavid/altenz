import { Box, Tabs, Group, Title, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";
import { Courses } from "./course/Courses";
import { Rounds } from "./round/Rounds";
import { nanoid6 } from "@/utils/utils";
import { LanguageSelect } from "./LanguageSelect";
import { Language, LanguageContext } from "./language-context";
import { TranslatedLabel } from "@/types/common/TranslatedLabel";
import { useCompetitionDB } from "@/db/competition-context";
import { Competition } from "@/types/competition/Competition";
import { Basic } from "./basic/Basic";
import { Displays } from "./display/Displays";
import { Help } from "@/pages/competitions/settings/help/Help";
import classes from "./Settings.module.css";

export const SettingsPage = () => {
  const { competition, putCompetition } = useCompetitionDB();

  const form = useForm<Omit<Competition, "_id" | "_rev" | "owner" | "state">>({
    defaultValues: {
      name: "",
      rulebook: undefined,
      divisions: [],
      ageGroups: [],
      genders: [],
      scoring: [],
      courses: [
        {
          id: nanoid6(),
          name: { en: "", sk: "", hu: "" },
          targets: {
            defaults: { scores: { type: "EXACT", scores: [] }, shots: [] },
            targetList: [],
          },
          stakes: [],
        },
      ],
      rounds: [
        {
          id: nanoid6(),
          name: "",
          evaluations: [],
          requirements: [],
        },
      ],
      displays: [
        {
          round: "SUMMARY",
          fields: [],
        },
      ],
    },
  });

  useEffect(() => {
    if (!competition) {
      return;
    }

    form.reset(competition);
  }, [competition]);

  const [language, setLanguage] = useState<Language>("en");
  const tl = (obj: TranslatedLabel) => obj[language] || obj.en;

  const save = async () => {
    if (!competition) {
      return;
    }

    await putCompetition({
      ...form.getValues(),
      _id: competition._id,
      _rev: competition._rev,
      owner: competition.owner,
      state: competition.state,
    });
  };

  return (
    <div className={classes.Settings}>
      <LanguageContext.Provider value={{ language, setLanguage, tl }}>
        <FormProvider {...form}>
          <Box maw={700}>
            <Group justify="space-between" mb="sm">
              <Group>
                <Title order={4}>{t("settings.title")}</Title>
                <Button onClick={save}>{t("settings.save")}</Button>
              </Group>
              <LanguageSelect />
            </Group>
            <Tabs variant="outline" defaultValue="basic">
              <Tabs.List mb="md" grow>
                <Tabs.Tab value="basic">{t("settings.basicSettings")}</Tabs.Tab>
                <Tabs.Tab value="courses">{t("settings.courses")}</Tabs.Tab>
                <Tabs.Tab value="rounds">{t("settings.rounds")}</Tabs.Tab>
                <Tabs.Tab value="displays">{t("settings.displays")}</Tabs.Tab>
                <Tabs.Tab value="publishing">{t("settings.publishing")}</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="basic">
                <Basic />
              </Tabs.Panel>
              <Tabs.Panel value="courses">
                <Courses />
              </Tabs.Panel>
              <Tabs.Panel value="rounds">
                <Rounds />
              </Tabs.Panel>
              <Tabs.Panel value="displays">
                <Displays />
              </Tabs.Panel>
              <Tabs.Panel value="publishing">
                <textarea value={JSON.stringify(competition)} />
              </Tabs.Panel>
            </Tabs>
          </Box>
          <Help />
        </FormProvider>
      </LanguageContext.Provider>
    </div>
  );
};
