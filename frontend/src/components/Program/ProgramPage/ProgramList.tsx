import type { IProgramDTO } from "../../../../../shared/models/program.model";
import GenericList from "../../UI/GenericList";
import ProgramPreview from "./ProgramPreview";

interface ExerciseTableProps {
  programs: IProgramDTO[];
  onDeleteProgram?: (id?: string) => Promise<void>;
}
export default function ProgramList({
  programs,
  onDeleteProgram,
}: ExerciseTableProps) {
  return (
    <GenericList
      items={programs}
      ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
               md:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))]
               h-auto overflow-auto gap-4 p-mobile md:p-desktop"
      ItemComponent={ProgramPreview}
      itemComponentProps={{ onDeleteProgram }}
      getKey={(item) => item.id!}
    />
  );
}
