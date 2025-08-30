import { useCallback, useMemo } from "react";

import { useItemsPage } from "../../hooks/shared/useItemsPage";
import { useWorkoutStore } from "../../store/workout.store";

import { INITIAL_WORKOUT_FILTER } from "../../consts/filters.consts";

import WorkoutFilter from "./WorkoutFilter";

import WorkoutPreview from "./WorkoutPreview";

import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";

import type { TWorkoutActionRoute } from "../../models/workout.model";
import type { IWorkoutDTO } from "../../../../shared/models/workout.model";

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
    filter: workoutsFilter,
    setFilter: setWorkoutsFilter,
    items,
    isLoading,
    onDeleteItem,
  } = useItemsPage({
    useStore: useWorkoutStore,
    initialFilter: INITIAL_WORKOUT_FILTER,
  });

  const itemComponentProps = useMemo(() => {
    return actionType === "programEdit"
      ? { actionType: "programEdit", onSelectProgramWorkout }
      : { actionType: "workoutList", onDeleteWorkout: onDeleteItem };
  }, []);

  const getKey = useCallback((item: IWorkoutDTO) => item.id ?? "", []);

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }

  const workouts = !selectedWorkoutId
    ? items
    : items.filter((wo) => wo.id !== selectedWorkoutId);

  return (
    <>
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
    </>
  );
}
