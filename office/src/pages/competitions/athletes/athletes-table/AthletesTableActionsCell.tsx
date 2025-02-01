import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MRT_Row } from "mantine-react-table";
import { Entry } from "@/types/entry/Entry";

interface AthletesTableActionsCellProps {
  row: MRT_Row<Entry>;
  onEdit: (id: string) => void;
  onDelete: (entry: Entry) => void;
}

export const AthletesTableActionsCell = ({
  row,
  onEdit,
  onDelete,
}: AthletesTableActionsCellProps) => (
  <Group>
    <ActionIcon
      size="md"
      onClick={() => {
        onEdit(row.original._id);
      }}
    >
      <IconEdit />
    </ActionIcon>
    <ActionIcon size="md" color="red" onClick={() => onDelete(row.original)}>
      <IconTrash />
    </ActionIcon>
  </Group>
);
