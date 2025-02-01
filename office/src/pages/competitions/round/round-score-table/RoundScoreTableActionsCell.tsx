import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_Row } from "mantine-react-table";
import { Entry } from "@/types/entry/Entry";

interface RoundScoreTableActionsCellProps {
  row: MRT_Row<Entry>;
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export const RoundScoreTableActionsCell = ({
  row,
  onEdit,
  onDelete,
}: RoundScoreTableActionsCellProps) => (
  <Group>
    <ActionIcon
      size="md"
      onClick={() => {
        onEdit(row.original);
      }}
    >
      <IconEdit />
    </ActionIcon>
    <ActionIcon size="md" color="red" onClick={() => onDelete(row.original)}>
      <IconTrash />
    </ActionIcon>
  </Group>
);
