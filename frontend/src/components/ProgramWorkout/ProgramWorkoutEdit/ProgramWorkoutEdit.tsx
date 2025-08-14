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
import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import { workoutUtils } from "../../../utils/workout.util";
import AvailableWorkoutPreview from "../../Program/ProgramEdit/AvailableWorkoutPreview";
import WorkoutEditModel from "../../Workout/WorkoutEditModel";

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
  const workouts = useWorkoutStore((state) => state.items);
  const loadWorkouts = useWorkoutStore((state) => state.loadItems);
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

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  useEffect(() => {
    const workoutEdit = programWorkoutUtil.dtoToEditDto(programWorkout);

    setSelectedWorkout(workoutEdit ?? null);
  }, [programWorkout]);

  const availableWorkouts = workouts.filter(
    (wo) => !selectedWorkout || wo.id !== selectedWorkout.workout?.id
  );

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
