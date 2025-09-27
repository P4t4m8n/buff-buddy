import { Link, Outlet } from "react-router";

import { programService } from "../../services/program.service";

import ProgramsList from "../../components/Program/ProgramPage/ProgramsList";

import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import Button from "../../components/UI/Button";

import type {
  IProgramDTO,
  IProgramFilter,
} from "../../../../shared/models/program.model";
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
import { useProgramsQuery } from "../../hooks/features/program/useProgramsQuery";
import { useGenericPage } from "../../hooks/shared/useGenericPage";

const INITIAL_FILTER: IProgramFilter = {
  skip: 0,
  take: 1000000,
  name: "",
};

export default function ProgramPage() {
  const {
    items: programs,
    isLoading,
    isPending,
    filter,
    deleteItem: deleteProgram,
    onSearch,
  } = useGenericPage<IProgramDTO, IProgramFilter>({
    initialFilter: INITIAL_FILTER,
    queryKey: QUERY_KEYS.PROGRAMS_QUERY_KEY,
    mutationKeyName: "programsMutationKey",
    itemIdKey: QUERY_KEYS.PROGRAM_ID_QUERY_KEY,
    useQuery: useProgramsQuery,
    removeFn: programService.remove,
  });
    console.log("🚀 ~ ProgramPage ~ programs:", programs)

  const isDeleting = isPending;
  return (
    <section className="h-main w-full grid ">
      <div className="flex flex-col">
        <header className="p-mobile md:p-desktop shadow-border-b ">
          <span className="text-center">
            <h2 className="text-3xl font-bold text-main-black ">
              Your Programs
            </h2>
            <p className="text-gray-300 text-lg">
              Manage, edit, or create new training routines to reach your goals!
            </p>
          </span>
          <Link to={"/programs/edit"}>
            <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
          </Link>
        </header>
        <ProgramsList
          programs={programs ?? []}
          deleteProgram={deleteProgram}
          isLoading={isLoading}
          isDeleting={isDeleting}
          onSubmit={onSearch}
          filter={filter}
        />
      </div>
      <Outlet />
    </section>
  );
}
