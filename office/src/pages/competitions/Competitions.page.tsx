import { Button, Group, Text, Title } from "@mantine/core";
import { t } from "i18next";
import { modals } from "@mantine/modals";
import { nanoid12, nanoid6 } from "@/utils/utils";
import { Competition } from "@/types/competition/Competition";
import { CompetitionState } from "@/types/competition/CompetitionState";
import { useCompetitionDB } from "@/db/competition-context";
import { CompetitionsTable } from "./competitions-table/CompetitionsTable";

const createEmptyCompetition = (): Competition => {
  const courseId = nanoid6();
  const roundId = nanoid6();
  return {
    _id: nanoid12(),
    _rev: undefined,
    owner: "",
    state: CompetitionState.DRAFT,
    name: `Test ${nanoid6()}`,
    rulebook: undefined,
    divisions: [],
    ageGroups: [],
    genders: [],
    scoring: [],
    courses: [
      {
        id: courseId,
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
        id: roundId,
        name: "Round 0",
        evaluations: [],
        requirements: [],
        courses: [courseId],
      },
    ],
    displays: [
      {
        round: roundId,
        fields: [],
      },
      {
        round: "SUMMARY",
        fields: [],
      },
    ],
  };
};

export const CompetitionsPage = () => {
  const { putCompetition, removeCompetition } = useCompetitionDB();

  const openDeleteConfirmModal = (competition: Competition) => {
    modals.openConfirmModal({
      title: t("common.deleteConfirm.title"),
      children: (
        <Text size="sm">{t("competitions.deleteConfirmTitle", { name: competition.name })}</Text>
      ),
      labels: {
        confirm: t("common.deleteConfirm.confirm"),
        cancel: t("common.deleteConfirm.cancel"),
      },
      confirmProps: { color: "red" },
      onConfirm: () => removeCompetition(competition),
    });
  };

  const copyCompetition = (competition: Competition) => {
    putCompetition({
      ...competition,
      _id: nanoid12(),
      _rev: "",
      name: `${competition.name} Copy`,
    });
  };

  return (
    <div>
      <Group>
        <Title order={4}>{t("competitions.title")}</Title>
        <Button onClick={() => putCompetition(createEmptyCompetition())}>
          {t("competitions.create")}
        </Button>
      </Group>
      <CompetitionsTable onCopy={copyCompetition} onDelete={openDeleteConfirmModal} />
    </div>
  );
};
