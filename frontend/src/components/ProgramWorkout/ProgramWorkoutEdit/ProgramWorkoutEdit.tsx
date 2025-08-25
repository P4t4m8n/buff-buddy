import { useState, useEffect, useMemo, useCallback } from "react";

import { useWorkoutStore } from "../../../store/workout.store";

import { calendarUtil } from "../../../utils/calendar.util";
import { programWorkoutUtil } from "../../../utils/programWorkout.util";
import { workoutUtils } from "../../../utils/workout.util";

import { useItemsPage } from "../../../hooks/shared/useItemsPage";
import { INITIAL_WORKOUT_FILTER } from "../../../consts/filters.consts";

import WorkoutEditModel from "../../Workout/WorkoutEditModel";
import ProgramWorkoutEditSelected from "./ProgramWorkoutEditSelected";
import WorkoutFilter from "../../Workout/WorkoutFilter";
import WorkoutPreview from "../../Workout/WorkoutPreview";

import Button from "../../UI/Button";
import GenericModel from "../../UI/GenericModel";
import GenericList from "../../UI/GenericList";
import Loader from "../../UI/loader/Loader";

import type {
  IProgramWorkoutDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import type { MouseEvent } from "react";
import type { IModelProps } from "../../UI/GenericModel";

interface ProgramWorkoutProps extends IModelProps<HTMLDivElement> {
  programWorkout?: IProgramWorkoutDTO;
  handleProgramWorkouts?: (workout: IProgramWorkoutEditDTO) => void;
}

export default function ProgramWorkoutEdit({
  programWorkout,
  handleProgramWorkouts,
  ...props
}: ProgramWorkoutProps) {
  const [selectedWorkout, setSelectedWorkout] =
    useState<IProgramWorkoutEditDTO | null>(null);

  const {
    filter: workoutsFilter,
    setFilter: setWorkoutsFilter,
    items: workouts,
    isLoading,
  } = useItemsPage({
    useStore: useWorkoutStore,
    initialFilter: INITIAL_WORKOUT_FILTER,
  });

  const { modelRef, handleModel } = props;

  useEffect(() => {
    const workoutEdit = programWorkoutUtil.dtoToEditDto(programWorkout);

    setSelectedWorkout(workoutEdit ?? null);
  }, [programWorkout]);

  const onDaysChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const isChecked = target.checked;
    const fixedDay = calendarUtil.shortWeekdayToFull(value);
    setSelectedWorkout((prev) => {
      if (!prev) return null;
      const newDaysOfWeek = isChecked
        ? [...(prev.daysOfWeek || []), fixedDay]
        : (prev.daysOfWeek || []).filter((day) => day !== fixedDay);

      if (!newDaysOfWeek.length) {
        return {
          ...prev,
          daysOfWeek: [],
          crudOperation: "delete",
        };
      }
      return {
        ...prev,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  const onSelectProgramWorkout = (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    let _workout = null;
    if (workout) {
      const empty = programWorkoutUtil.getEmpty();
      _workout = programWorkoutUtil.dtoToEditDto({ ...empty, workout }, isCopy);
    }

    setSelectedWorkout(_workout);
  };

  const saveToProgram = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedWorkout && handleProgramWorkouts && handleModel) {
      handleProgramWorkouts(selectedWorkout);
      handleModel(e);
    }
  };

  const handleSelectedWorkoutUpdate = (workout: IWorkoutDTO | null) => {
    setSelectedWorkout((prev) => {
      if (!prev) return null;
      if (!workout) return prev;
      const updatedWorkout = workoutUtils.dtoToEditDto(workout);
      return {
        ...prev,
        workout: updatedWorkout,
      };
    });
  };

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
    <div
      ref={modelRef}
      className="h-main fixed inset-0 bg-black-500 p-2 z-10 flex flex-col gap-4"
    >
      <header className={""}>
        <h3 className="text-center">Pick a workout</h3>
        <ProgramWorkoutEditSelected
          selectedProgramWorkout={selectedWorkout}
          onDaysChange={onDaysChange}
          saveToProgram={saveToProgram}
          onSelectProgramWorkout={onSelectProgramWorkout}
          parentRef={modelRef}
          handleSelectedWorkoutUpdate={handleSelectedWorkoutUpdate}
        />
      </header>

      <GenericModel
        Model={WorkoutEditModel}
        mode="create"
        buttonProps={{ buttonStyle: "model" }}
        isOverlay={false}
        isPortal={true}
        parentRef={modelRef}
      />
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

      <Button
        onClick={handleModel}
        className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 min-h-10 mt-auto
              hover:text-white rounded transition-all duration-300
              hover:cursor-pointer  `}
      >
        Cancel
      </Button>
    </div>
  );
}
