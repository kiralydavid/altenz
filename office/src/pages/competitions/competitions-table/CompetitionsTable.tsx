import { useMemo } from "react";
import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { useCompetitionDB } from "@/db/competition-context";
import { Competition } from "@/types/competition/Competition";
import { CompetitionsTableActionsCell } from "./CompetitionsTableActionsCell";

interface CompetitionsTableProps {
  onCopy: (competition: Competition) => void;
  onDelete: (competition: Competition) => void;
}

export const CompetitionsTable = ({ onCopy, onDelete }: CompetitionsTableProps) => {
  const { competitions } = useCompetitionDB();

  const columns = useMemo<MRT_ColumnDef<Competition>[]>(
    () => [
      {
        accessorKey: "name",
        header: t("competitions.name"),
        Cell: ({ row }) => <Link to={`/c/${row.original._id}/settings`}>{row.original.name}</Link>,
      },
      {
        id: "actions",
        header: t("competitions.actions"),
        enableHiding: false,
        enableColumnActions: false,
        Cell: ({ row }) => (
          <CompetitionsTableActionsCell row={row} onCopy={onCopy} onDelete={onDelete} />
        ),
      },
    ],
    [],
  );

  const table = useMantineReactTable<Competition>({
    columns,
    data: competitions,
    enableColumnActions: false,
  });

  return <MantineReactTable table={table} />;
};
