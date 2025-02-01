import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { find } from "es-toolkit/compat";
import { t } from "i18next";
import { Entry } from "@/types/entry/Entry";
import { useCompetitionDB } from "@/db/competition-context";
import { useEntryDB } from "@/db/entry-context";
import { AthletesTableActionsCell } from "./AthletesTableActionsCell";
import { CategoryPart } from "@/types/competition/CategoryPart";

const getCategoryPartCellValue = (categoryParts: CategoryPart[], id: string) =>
  find<CategoryPart>(categoryParts, { id })?.code ?? "NOT_FOUND";

interface AthletesTableProps {
  onEdit: (id: string) => void;
  onDelete: (entry: Entry) => void;
}

export const AthletesTable = ({ onEdit, onDelete }: AthletesTableProps) => {
  const { entries } = useEntryDB();
  const { competition } = useCompetitionDB();

  if (!competition) {
    return <></>;
  }

  const columns = useMemo<MRT_ColumnDef<Entry>[]>(
    () => [
      {
        accessorKey: "name.last",
        header: t("athletes.lastName"),
      },
      {
        accessorKey: "name.first",
        header: t("athletes.firstName"),
      },
      {
        accessorKey: "division",
        header: t("athletes.division"),
        Cell: ({ cell }) => (
          <span>{getCategoryPartCellValue(competition?.divisions, cell.getValue<string>())}</span>
        ),
      },
      {
        accessorKey: "ageGroup",
        header: t("athletes.ageGroup"),
        Cell: ({ cell }) => (
          <span>{getCategoryPartCellValue(competition?.ageGroups, cell.getValue<string>())}</span>
        ),
      },
      {
        accessorKey: "gender",
        header: t("athletes.gender"),
        Cell: ({ cell }) => (
          <span>{getCategoryPartCellValue(competition?.genders, cell.getValue<string>())}</span>
        ),
      },
      {
        id: "actions",
        header: t("athletes.actions"),
        enableHiding: false,
        enableColumnActions: false,
        Cell: ({ row }) => (
          <AthletesTableActionsCell row={row} onEdit={onEdit} onDelete={onDelete} />
        ),
      },
    ],
    [],
  );

  const table = useMantineReactTable<Entry>({
    columns,
    data: entries,
    enableColumnActions: false,
  });

  return <MantineReactTable table={table} />;
};
