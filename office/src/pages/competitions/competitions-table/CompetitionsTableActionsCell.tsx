import { ActionIcon, Group } from "@mantine/core";
import { IconCopy, IconTrash } from "@tabler/icons-react";
import { MRT_Row } from "mantine-react-table";
import { Competition } from "@/types/competition/Competition";

interface CompetitionsTableActionsCellProps {
  row: MRT_Row<Competition>;
  onCopy: (entry: Competition) => void;
  onDelete: (entry: Competition) => void;
}

export const CompetitionsTableActionsCell = ({
  row,
  onCopy,
  onDelete,
}: CompetitionsTableActionsCellProps) => (
  <Group>
    <ActionIcon size="md" onClick={() => onCopy(row.original)}>
      <IconCopy />
    </ActionIcon>
    <ActionIcon size="md" color="red" onClick={() => onDelete(row.original)}>
      <IconTrash />
    </ActionIcon>
  </Group>
);
