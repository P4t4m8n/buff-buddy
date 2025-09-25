//-Core
import { Outlet } from "react-router";
//-Components
import ExerciseList from "../../components/Exercise/ExerciseList";
import LinkComponent from "../../components/UI/Link";
//-Consts
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
//-Services
import { exerciseService } from "../../services/exercise.service";
//-Hooks
import { useExercisesQuery } from "../../hooks/features/exercise/useExerciseQuery";
import { IsDeletingContext } from "../../hooks/context/IsDeletingContext";
import { useGenericPage } from "../../hooks/shared/useGenericPage";
//-Types
import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../../shared/models/exercise.model";

const INITIAL_FILTER: IExerciseFilter = {
  skip: 0,
  take: 1000000,
  name: "",
};

export default function ExercisePage() {
  const {
    items: exercises,
    isLoading,
    isPending,
    deleteItem: deleteExercise,
    onSearch,
  } = useGenericPage<IExerciseDTO, IExerciseFilter>({
    initialFilter: INITIAL_FILTER,
    queryKey: QUERY_KEYS.EXERCISES_QUERY_KEY,
    mutationKeyName: "exerciseMutationKey",
    itemIdKey: QUERY_KEYS.EXERCISE_ID_QUERY_KEY,
    useQuery: useExercisesQuery,
    removeFn: exerciseService.remove,
  });

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
          deleteItem={deleteExercise}
          onSearch={onSearch}
        />
      </IsDeletingContext>
      <Outlet />
    </section>
  );
}
