import { useCallback, useMemo } from "react";

import { useWorkoutStore } from "../../store/workout.store";

import GenericList from "../../components/UI/GenericList";
import WorkoutPreview from "../../components/Workout/WorkoutPreview";

import type {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../shared/models/workout.model";
import WorkoutFilter from "../../components/Workout/WorkoutFilter";
import { useItemsPage } from "../../hooks/shared/useItemsPage";
import Loader from "../../components/UI/loader/Loader";
import { INITIAL_WORKOUT_FILTER } from "../../consts/filters.consts";

export default function WorkoutListPage() {
  const {
    filter: workoutsFilter,
    setFilter: setWorkoutsFilter,
    items: workouts,
    isLoading,
    onDeleteItem,
  } = useItemsPage({
    useStore: useWorkoutStore,
    initialFilter: INITIAL_WORKOUT_FILTER,
  });

  const itemComponentProps = useMemo(
    () => ({ actionType: "workoutList", onDeleteWorkout: onDeleteItem }),
    []
  );
  const getKey = useCallback((item: IWorkoutDTO) => item.id!, []);

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }

  return (
    <div className="h-main p-2">
      <WorkoutFilter
        workoutsFilter={workoutsFilter}
        setWorkoutsFilter={setWorkoutsFilter}
      />
      <GenericList
        items={workouts}
        ItemComponent={WorkoutPreview}
        itemComponentProps={itemComponentProps}
        getKey={getKey}
        ulStyle="flex flex-col gap-4 h-[calc(100%-9.5rem)] overflow-auto"
      />
    </div>
  );
}
