import type { IProgramDTO } from "../../models/program.model";
import Table from "../UI/Table";
import ProgramPreview from "./ProgramPreview";

interface ExerciseTableProps {
  programs: IProgramDTO[];
  onDeleteProgram?: (id?: string) => Promise<void>;
}
export default function ProgramTable({
  programs,
  onDeleteProgram,
}: ExerciseTableProps) {
  const tableHeader = ["Name", "Dates", "Active", "Actions"];
  const gridCols =
    "grid-cols-[1fr_5.75rem] sm:grid-cols-[minmax(8rem,1fr)_minmax(13.5rem,1fr)_minmax(3rem,1fr)_12.5rem]";
  return (
    <Table
      tableHeader={tableHeader}
      gridCols={gridCols}
      items={programs}
      onDelete={onDeleteProgram}
      ItemComponent={ProgramPreview}
      whenHidden="sm"
    />
  );
}
