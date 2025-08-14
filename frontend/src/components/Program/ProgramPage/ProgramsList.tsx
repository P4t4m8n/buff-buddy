import type { IProgramDTO } from "../../../../../shared/models/program.model";
import GenericList from "../../UI/GenericList";
import Loader from "../../UI/loader/Loader";
import ProgramPreview from "./ProgramPreview";

interface IProgramsListProps {
  programs: IProgramDTO[];
  onDeleteProgram: (id?: string) => Promise<void>;
  isLoading: boolean;
}

export default function ProgramsList({
  programs,
  onDeleteProgram,
  isLoading,
}: IProgramsListProps) {
  if (isLoading) {
    return <Loader loaderType="screen" />;
  }
  return (
    <GenericList
      items={programs}
      ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
                    md:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))]
                    h-auto overflow-auto gap-4 p-mobile md:p-desktop"
      ItemComponent={ProgramPreview}
      itemComponentProps={{ onDeleteProgram }}
      getKey={(item) => item.id!}
      NoItemsComponent={NoProgramsComponent}
    />
  );
}

const NoProgramsComponent = () => (
  <span className="flex flex-col items-center justify-center h-full">
    <h3 className="text-2xl font-bold ">No programs found</h3>
    <p className="text-main-orange/90">
      Create your first program to get started!
    </p>
  </span>
);
