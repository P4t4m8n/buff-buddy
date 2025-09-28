import { useCallback, useMemo } from "react";

import { workoutService } from "../../services/workout.service";

import { useWorkoutsQuery } from "../../hooks/features/workout/useWorkoutsQuery";
import { useGenericPage } from "../../hooks/shared/useGenericPage";

import { INITIAL_WORKOUT_FILTER } from "../../consts/filters.consts";
import { QUERY_KEYS } from "../../consts/queryKeys.consts";

import WorkoutFilter from "./WorkoutFilter";
import WorkoutPreview from "./WorkoutPreview";

import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";

import type { TWorkoutActionRoute } from "../../models/workout.model";
import type {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../shared/models/workout.model";

interface IWorkoutListProps {
  actionType: TWorkoutActionRoute;
  selectedWorkoutId?: string;
  onSelectProgramWorkout?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
}

export default function WorkoutList({
  actionType,
  selectedWorkoutId,
  onSelectProgramWorkout,
}: IWorkoutListProps) {
  const {
    items = [],
    isLoading,
    isDeleting,
    filter,
    deleteItem: deleteWorkout,
    onSearch,
    onResetForm,
  } = useGenericPage<IWorkoutDTO, IWorkoutFilter>({
    initialFilter: INITIAL_WORKOUT_FILTER,
    queryKey: QUERY_KEYS.WORKOUTS_QUERY_KEY,
    mutationKeyName: QUERY_KEYS.WORKOUT_MUTATION_KEY,
    itemIdKey: QUERY_KEYS.WORKOUT_ID_QUERY_KEY,
    useQuery: useWorkoutsQuery,
    removeFn: workoutService.remove,
  });

  const itemComponentProps = useMemo(() => {
    return actionType === "programEdit"
      ? {
          actionType: "programEdit" as TWorkoutActionRoute,
          onSelectProgramWorkout,
        }
      : {
          actionType: "workoutList" as TWorkoutActionRoute,
          onDeleteWorkout: deleteWorkout,
          isDeleting,
        };
  }, []);

  const getKey = useCallback((item: IWorkoutDTO) => item.id ?? "", []);

  const workouts = !selectedWorkoutId
    ? items
    : items.filter((wo) => wo.id !== selectedWorkoutId);

  return (
    <>
      <WorkoutFilter
        workoutsFilter={filter}
        isLoading={isLoading}
        onSearch={onSearch}
        onResetForm={onResetForm}
      />
      {isLoading ? (
        <Loader loaderType="cards-pulse" isFullScreen={false} />
      ) : (
        <GenericList
          items={workouts}
          ItemComponent={WorkoutPreview}
          itemComponentProps={itemComponentProps}
          getKey={getKey}
          ulStyle="xl:columns-3 lg:columns-2 md:columns-1 gap-4 h-[calc(100%-9.5rem)] overflow-auto p-desktop"
        />
      )}
    </>
  );
}
