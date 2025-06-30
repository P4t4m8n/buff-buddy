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
  const tableHeader = ["Name", "Dates", "IsActive", "Actions"];
  const gridCols =
    "grid-cols-[1fr_5.75rem] md:grid-cols-[minmax(10rem,1fr)_repeat(2,_1fr)_12.5rem]";
  return (
    <Table
      tableHeader={tableHeader}
      gridCols={gridCols}
      items={programs}
      onDelete={onDeleteProgram}
      ItemComponent={ProgramPreview}
    />
  );
}
