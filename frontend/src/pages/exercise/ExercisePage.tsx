import ExerciseList from "../../components/Exercise/ExerciseList";
import ExerciseEdit from "../../components/Exercise/ExerciseEdit";
import GenericModel from "../../components/UI/GenericModel";
import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../../shared/models/exercise.model";
import { Outlet, useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";
import { useMutationKeyStore } from "../../store/mutationKeys.store";
import { useErrors } from "../../hooks/shared/useErrors";
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
import { useExercisesQuery } from "../../hooks/features/exercise/useExerciseQuery";
import { useMutation } from "@tanstack/react-query";
import { exerciseService } from "../../services/exercise.service";
import { queryClient } from "../../lib/queryClient";
import { IsDeletingContext } from "../../hooks/context/IsDeletingContext";
import LinkComponent from "../../components/UI/Link";

const INITIAL_FILTER: IExerciseFilter = {
  skip: 0,
  take: 1000000,
  name: "",
};

export default function ExercisePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    return {
      name: searchParams.get("name") || INITIAL_FILTER.name,
      skip: +(searchParams.get("skip") || INITIAL_FILTER.skip || 0),
      take: +(searchParams.get("take") || INITIAL_FILTER.take || 10),
    };
  }, [searchParams]);

  const setMutationKey = useMutationKeyStore((store) => store.setMutationKey);
  const key = useMutationKeyStore((store) => store.exerciseMutationKey);

  const { handleError } = useErrors();

  useEffect(() => {
    setMutationKey("exerciseMutationKey", [
      QUERY_KEYS.EXERCISES_QUERY_KEY,
      filter,
    ]);
  }, [filter]);

  const { data, isLoading } = useExercisesQuery(filter);
  const { data: exercises } = data ?? {};

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (exerciseId: string) => exerciseService.remove(exerciseId),
    onSuccess(_, exerciseId) {
      //INFO: Update the list base on the cache key
      queryClient.setQueryData<IExerciseDTO[]>(key, (old) => {
        return old?.filter((o) => o.id !== exerciseId);
      });
      //INFO: Update the EDIT and Details route
      queryClient.removeQueries({
        queryKey: ["exerciseId", exerciseId],
        exact: true,
      });
    },
    onError(error) {
      handleError({ error, emitToToast: true });
    },
  });

  const onDeleteExercise = async (exerciseId?: string) => {
    try {
      if (!exerciseId) return;
      await mutateAsync(exerciseId);
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

  return (
    <section className="h-main flex flex-col gap-4">
      <header className="p-mobile md:p-desktop  ">
        <span className="text-center flex flex-col items-center gap-2 pb-4">
          <h2 className="text-2xl font-bold text-white ">
            Welcome to Exercise Land!
          </h2>
          <p className="text-lg text-gray-200">
            Get ready to move, groove, and boost your mood with every workout!
          </p>
        </span>
        <LinkComponent
          to={"/exercises/edit"}
          mode="edit"
          linkStyle="model"
          className="w-fit"
        />
      </header>
      <IsDeletingContext value={isPending}>
        <ExerciseList
          filteredExercises={exercises}
          isLoading={isLoading}
          onDelete={onDeleteExercise}
          onSearch={onSearch}
        />
      </IsDeletingContext>
      <Outlet />
    </section>
  );
}
