import { useCallback, useMemo } from "react";

import { useItemsPage } from "../../../hooks/shared/useItemsPage";
import { useWorkoutStore } from "../../../store/workout.store";

import WorkoutPreview from "../../Workout/WorkoutPreview";
import WorkoutFilter from "../../Workout/WorkoutFilter";

import { INITIAL_WORKOUT_FILTER } from "../../../consts/filters.consts";

import Loader from "../../UI/loader/Loader";
import GenericList from "../../UI/GenericList";

import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import type { IProgramWorkoutEditDTO } from "../../../../../shared/models/program.model";

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
  console.log("Rendering ProgramWorkoutList");

  const {
    filter: workoutsFilter,
    setFilter: setWorkoutsFilter,
    items: workouts,
    isLoading,
  } = useItemsPage({
    useStore: useWorkoutStore,
    initialFilter: INITIAL_WORKOUT_FILTER,
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
      <WorkoutFilter
        workoutsFilter={workoutsFilter}
        setWorkoutsFilter={setWorkoutsFilter}
      />
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
