import { useCallback, useMemo } from "react";

import { useItemsPage } from "../../../../hooks/shared/useItemsPage";
import { useWorkoutStore } from "../../../../store/workout.store";

import WorkoutPreview from "../../../Workout/WorkoutPreview";
import WorkoutFilter from "../../../Workout/WorkoutFilter";

import {
  initialFilters,
} from "../../../../consts/filters.consts";

import Loader from "../../../UI/loader/Loader";
import GenericList from "../../../UI/GenericList";

import type {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../../../shared/models/workout.model";
import type { IProgramWorkoutEditDTO } from "../../../../../../shared/models/program.model";
import { useGenericPage } from "../../../../hooks/shared/useGenericPage";
import { QUERY_KEYS } from "../../../../consts/queryKeys.consts";
import { useWorkoutsQuery } from "../../../../hooks/features/workout/useWorkoutsQuery";
import { workoutService } from "../../../../services/workout.service";

interface IProgramWorkoutListProps {
  selectedWorkout: IProgramWorkoutEditDTO | null;
  onSelectProgramWorkout: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
}

export default function ProgramWorkoutList({
  selectedWorkout,
  onSelectProgramWorkout,
}: IProgramWorkoutListProps) {
  const {
    items: workouts = [],
    isLoading,
    isPending,
    filter,
    deleteItem: deleteWorkout,
    onSearch,
  } = useGenericPage<IWorkoutDTO, IWorkoutFilter>({
    initialFilter: initialFilters.INITIAL_WORKOUT_FILTER,
    queryKey: QUERY_KEYS.WORKOUTS_QUERY_KEY,
    mutationKeyName: "workoutsMutationKey",
    itemIdKey: QUERY_KEYS.WORKOUT_ID_QUERY_KEY,
    useQuery: useWorkoutsQuery,
    removeFn: workoutService.remove,
  });

  //Remove the selected workout from the list of available workouts
  const availableWorkouts = workouts.filter(
    (wo) => !selectedWorkout || wo.id !== selectedWorkout.workout?.id
  );

  const itemComponentProps = useMemo(
    () => ({ actionType: "programEdit", onSelectProgramWorkout }),
    []
  );

  const getKey = useCallback((item: IWorkoutDTO) => item.id!, []);

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }

  return (
    <>
      {/* <WorkoutFilter
        workoutsFilter={filter}
        setWorkoutsFilter={setWorkoutsFilter}
      /> */}
      <GenericList
        items={availableWorkouts}
        ItemComponent={WorkoutPreview}
        itemComponentProps={itemComponentProps}
        getKey={getKey}
        ulStyle="flex flex-col gap-4 h-[calc(100%-9.5rem)] overflow-auto"
      />
    </>
  );
}
