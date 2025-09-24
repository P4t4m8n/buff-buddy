import { useEffect, useMemo } from "react";
import { Link, Outlet, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../lib/queryClient";

import { programService } from "../../services/program.service";

import { useMutationKeyStore } from "../../store/mutationKeys.store";
import { useErrors } from "../../hooks/shared/useErrors";

import ProgramsList from "../../components/Program/ProgramPage/ProgramsList";

import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import Button from "../../components/UI/Button";

import type {
  IProgramDTO,
  IProgramFilter,
} from "../../../../shared/models/program.model";
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
import { useProgramsQuery } from "../../hooks/features/program/useProgramsQuery";

const INITIAL_FILTER: IProgramFilter = {
  skip: 0,
  take: 1000000,
  name: "",
};
export default function ProgramPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    return {
      name: searchParams.get("name") || INITIAL_FILTER.name,
      skip: +(searchParams.get("skip") || INITIAL_FILTER.skip || 0),
      take: +(searchParams.get("take") || INITIAL_FILTER.take || 10),
    };
  }, [searchParams]);

  const setMutationKey = useMutationKeyStore((store) => store.setMutationKey);
  const key = useMutationKeyStore((store) => store.programsMutationKey);

  const { handleError } = useErrors();

  useEffect(() => {
    setMutationKey("programsMutationKey", [
      QUERY_KEYS.PROGRAMS_QUERY_KEY,
      filter,
    ]);
  }, [filter]);

  const { data, isLoading } = useProgramsQuery(filter);

  const { data: programs } = data || {};

  const mutation = useMutation({
    mutationFn: (programId: string) => programService.remove(programId),
    onSuccess(_, programId) {
      //INFO: Update the list base on the cache key
      queryClient.setQueryData<IProgramDTO[]>(key, (old) => {
        return old?.filter((o) => o.id !== programId);
      });
      //INFO: Update the EDIT and Details route
      queryClient.removeQueries({
        queryKey: ["programId", programId],
        exact: true,
      });
    },
    onError(error) {
      handleError({ error, emitToToast: true });
    },
  });

  const onDeleteProgram = async (programId?: string) => {
    try {
      if (!programId) return;
      await mutation.mutateAsync(programId);
    } catch (error) {
      handleError({ error, emitToToast: true });
    }
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    setSearchParams({
      name: name || "",
      skip: "0",
      take: String(filter.take),
    });
  };

  const isDeleting = mutation.isPending;
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
          deleteProgram={onDeleteProgram}
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
