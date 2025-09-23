import type {
  IProgramDTO,
  IProgramFilter,
} from "../../../../../shared/models/program.model";
import GenericList from "../../UI/GenericList";
import Loader from "../../UI/loader/Loader";
import ProgramFilter from "./ProgramFilter";
import ProgramPreview from "./ProgramPreview";

interface IProgramsListProps {
  programs: IProgramDTO[];
  deleteProgram: (programId?: string) => Promise<void>;
  isLoading: boolean;
  isDeleting: boolean;
  filter: IProgramFilter | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ProgramsList({
  programs,
  deleteProgram,
  isLoading,
  isDeleting,
  filter,
  onSubmit,
}: IProgramsListProps) {
  if (isLoading) {
    return <Loader loaderType="screen" />;
  }
  return (
    <div>
      <ProgramFilter filter={filter} onSubmit={onSubmit} />
      <GenericList
        items={programs}
        ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]
      md:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))]
      h-auto overflow-auto gap-4 p-mobile md:p-desktop"
        ItemComponent={ProgramPreview}
        itemComponentProps={{ deleteProgram, isDeleting }}
        getKey={(item) => item.id!}
        NoItemsComponent={NoProgramsComponent}
      />
    </div>
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
