import { useState } from "react";
import { Button, Group, Modal, Title, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { t } from "i18next";
import { useEntryDB } from "@/db/entry-context";
import { Entry } from "@/types/entry/Entry";
import { AthleteModal } from "./AthleteModal";
import { AthletesTable } from "./athletes-table/AthletesTable";
import { useCompetitionDB } from "@/db/competition-context";

export const AthletesPage = () => {
  const { competition } = useCompetitionDB();
  const { removeEntry } = useEntryDB();
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [editingEntryId, setEditingEntryId] = useState<string | undefined>(undefined);

  const openDeleteConfirmModal = (entry: Entry) => {
    modals.openConfirmModal({
      title: t("common.deleteConfirm.title"),
      children: (
        <Text size="sm">
          {t("athletes.deleteConfirmTitle", {
            firstName: entry.name.first,
            lastName: entry.name.last,
          })}
        </Text>
      ),
      labels: {
        confirm: t("common.deleteConfirm.confirm"),
        cancel: t("common.deleteConfirm.cancel"),
      },
      confirmProps: { color: "red" },
      onConfirm: () => removeEntry(entry),
    });
  };

  return (
    <>
      <Group>
        <Title order={4}>{t("athletes.title")}</Title>
        <Button
          onClick={() => {
            setEditingEntryId(undefined);
            open();
          }}
        >
          {t("athletes.add")}
        </Button>
      </Group>
      {competition && (
        <AthletesTable
          onEdit={(id) => {
            setEditingEntryId(id);
            open();
          }}
          onDelete={(entry) => {
            openDeleteConfirmModal(entry);
          }}
        />
      )}
      <Modal opened={modalOpened} onClose={close} title={t("athletes.athleteModal.title")}>
        <AthleteModal entryId={editingEntryId} />
      </Modal>
    </>
  );
};
