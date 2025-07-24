import { useWorkoutStore } from "../../../store/workout.store";
import Button from "../../UI/Button";
import { calendarUtil } from "../../../utils/calendar.util";
import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import type { IModelProps } from "../../UI/GenericModel";
import GenericModel from "../../UI/GenericModel";
import GenericList from "../../UI/GenericList";
import type {
  IProgramWorkoutDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import { programWorkoutUtil } from "../../../utils/programWorkout.util";
import ProgramWorkoutEditSelected from "./ProgramWorkoutEditSelected";
import WorkoutEdit from "../../Workout/Edit/WorkoutEdit";
import AvailableWorkoutPreview from "./AvailableWorkoutPreview";

interface ProgramWorkoutProps extends IModelProps<HTMLDivElement> {
  programWorkout?: IProgramWorkoutDTO;
  handleWorkouts?: (workout: IProgramWorkoutDTO) => void;
}

export default function ProgramWorkoutEdit({
  programWorkout,
  handleWorkouts,
  ...props
}: ProgramWorkoutProps) {
  const [selectedWorkout, setSelectedWorkout] =
    useState<IProgramWorkoutEditDTO | null>(null);
  const workouts = useWorkoutStore((state) => state.workouts);
  const loadWorkouts = useWorkoutStore((state) => state.loadWorkouts);
  const { modelRef, handleModel } = props;

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
      return {
        ...prev,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  const onSelectProgramWorkout = (
    workout?: IProgramWorkoutDTO,
    isCopy?: boolean
  ) => {
    const _workout = workout
      ? programWorkoutUtil.dtoToEditDto(workout, isCopy)
      : null;
    setSelectedWorkout(_workout);
  };

  const saveToProgram = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedWorkout && handleWorkouts && handleModel) {
      handleWorkouts(selectedWorkout);
      handleModel(e);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  useEffect(() => {
    const workoutEdit = programWorkoutUtil.dtoToEditDto(programWorkout);

    setSelectedWorkout(workoutEdit ?? null);
  }, [programWorkout]);

  const availableWorkouts = workouts.filter(
    (wo) => !selectedWorkout || wo.id !== selectedWorkout.id
  );

  return (
    <div
      ref={modelRef}
      className="h-main fixed inset-0 bg-main-orange p-2 z-10 flex flex-col gap-4"
    >
      <header className={""}>
        <h3 className="text-center">Pick a workout</h3>
        <ProgramWorkoutEditSelected
          selectedProgramWorkout={selectedWorkout}
          onDaysChange={onDaysChange}
          saveToProgram={saveToProgram}
          onSelectProgramWorkout={onSelectProgramWorkout}
          parentRef={modelRef}
        />
      </header>

      <GenericModel
        Model={WorkoutEdit}
        mode="create"
        buttonProps={{ buttonStyle: "model" }}
        isPortal={true}
        parentRef={modelRef}
      />

      <GenericList
        items={availableWorkouts}
        ItemComponent={AvailableWorkoutPreview}
        itemComponentProps={{ onSelectProgramWorkout }}
        getKey={(item) => item.id!}
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
