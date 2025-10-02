//Services
import { programService } from "../../services/program.service";
//Consts
import { INITIAL_FILTERS } from "../../consts/filters.consts";
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
//Hooks
import { useProgramsQuery } from "../../hooks/features/program/useProgramsQuery";
import { useGenericPage } from "../../hooks/shared/useGenericPage";
//UI
import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";
import Pagination from "../UI/Pagination";
//Components
import ProgramFilter from "./ProgramFilter";
import ProgramPreview from "./ProgramPreview";
//Types
import type {
  IProgramDTO,
  IProgramFilter,
} from "../../../../shared/models/program.model";

export default function ProgramsList() {
  const {
    items: programs,
    isLoading,
    isDeleting,
    filter,
    meta,
    deleteItem: deleteProgram,
    onSearch,
    onResetSearchForm,
    onPaginate,
  } = useGenericPage<IProgramDTO, IProgramFilter>({
    initialFilter: INITIAL_FILTERS.INITIAL_PROGRAM_FILTER,
    queryKey: QUERY_KEYS.PROGRAMS_QUERY_KEY,
    mutationKeyName: QUERY_KEYS.PROGRAM_MUTATION_KEY,
    itemIdKey: QUERY_KEYS.PROGRAM_ID_QUERY_KEY,
    useQuery: useProgramsQuery,
    removeFn: programService.remove,
  });
  if (isLoading) {
    return <Loader loaderType="screen" />;
  }
  return (
    <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
      <ProgramFilter
        onResetForm={onResetSearchForm}
        programFilter={filter}
        onSearch={onSearch}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Loader loaderType="cards-pulse" isFullScreen={false} />
      ) : (
        <>
          <GenericList
            items={programs}
            ulStyle="gap-4 h-full overflow-y-auto px-desktop w-full 
                     grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]
                     grid-rows-[repeat(auto-fill,14rem)] p-desktop"
            ItemComponent={ProgramPreview}
            itemComponentProps={{ deleteProgram, isDeleting }}
            getKey={(item) => item.id!}
            NoItemsComponent={NoProgramsComponent}
          />
          <Pagination meta={meta} onPaginate={onPaginate} />
        </>
      )}
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
