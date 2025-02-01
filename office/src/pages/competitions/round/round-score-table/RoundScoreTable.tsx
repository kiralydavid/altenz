import { useMemo } from "react";
import { MRT_ColumnDef, MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { find } from "es-toolkit/compat";
import { t } from "i18next";
import { Entry } from "@/types/entry/Entry";
import { useCompetitionDB } from "@/db/competition-context";
import { RoundScoreTableActionsCell } from "./RoundScoreTableActionsCell";
import { CategoryPart } from "@/types/competition/CategoryPart";
import { DisplayField } from "@/types/competition/Display";
import { Competition } from "@/types/competition/Competition";
import { calculateDisplayValue } from "@/utils/DisplayUtils";

const getCategoryPartCellValue = (categoryParts: CategoryPart[], id: string) =>
  find<CategoryPart>(categoryParts, { id })?.code ?? "NOT_FOUND";

const generateDisplayColumns = (
  displayFields: DisplayField[],
  competition: Competition,
): MRT_ColumnDef<Entry>[] =>
  displayFields.map((field) => ({
    id: field.id,
    header: field.label,
    accessorFn: (originalRow) => calculateDisplayValue(field, originalRow, competition),
    size: 70,
  }));

interface RoundScoreTableProps {
  roundId: string;
  entries: Entry[];
  displayFields: DisplayField[];
  onEdit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
}

export const RoundScoreTable = ({
  roundId,
  entries,
  displayFields,
  onEdit,
  onDelete,
}: RoundScoreTableProps) => {
  const { competition } = useCompetitionDB();

  if (!competition) {
    return <div>Competition data is missing</div>;
  }

  const generatedDisplayColumns = generateDisplayColumns(displayFields, competition);

  const columns = useMemo<MRT_ColumnDef<Entry>[]>(
    () => [
      {
        id: "name",
        header: t("round.name"),
        Cell: ({ row }) => (
          <div>
            <div>
              {row.original.name.last} {row.original.name.first}
            </div>
          </div>
        ),
      },
      {
        id: "category",
        header: t("round.category"),
        accessorFn: (row) =>
          `${getCategoryPartCellValue(
            competition?.divisions || [],
            row.division,
          )} ${getCategoryPartCellValue(
            competition?.ageGroups || [],
            row.ageGroup,
          )} ${getCategoryPartCellValue(competition?.genders || [], row.gender)}`,
        Cell: ({ row }) => (
          <>
            <span>
              {getCategoryPartCellValue(competition?.divisions || [], row.original.division)}
            </span>
            <span>
              {getCategoryPartCellValue(competition?.ageGroups || [], row.original.ageGroup)}
            </span>
            <span>{getCategoryPartCellValue(competition?.genders || [], row.original.gender)}</span>
          </>
        ),
      },
      ...generatedDisplayColumns,
      {
        id: "actions",
        header: t("round.actions"),
        enableHiding: false,
        enableColumnActions: false,
        Cell: ({ row }) => (
          <RoundScoreTableActionsCell row={row} onEdit={onEdit} onDelete={onDelete} />
        ),
      },
    ],
    [roundId],
  );

  const table = useMantineReactTable<Entry>({
    columns,
    data: entries,
    enableColumnActions: false,
  });

  return <MantineReactTable key={roundId} table={table} />;
};
