import { useWorkoutStore } from "../../../store/workout.store";
import ProgramWorkoutEditWrapper from "./ProgramWorkoutEditWrapper";
import DynamicWorkoutPreview from "../../Workout/DynamicWorkoutPreview";
import Button from "../../UI/Button";
import { calendarUtil } from "../../../utils/calendar.util";
import { useState, useEffect, Fragment } from "react";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../../shared/models/workout.model";
import type { MouseEvent } from "react";
import type { IModelProps } from "../../UI/GenericModel";
import ProgramWorkoutEditSelected from "./ProgramWorkoutEditSelected";
import GenericModel from "../../UI/GenericModel";
import { workoutUtils } from "../../../utils/workout.util";

interface ProgramWorkoutProps extends IModelProps<HTMLDivElement> {
  workout?: IWorkoutEditDTO;
  handleWorkouts?: (workout: IWorkoutEditDTO) => void;
}

export default function ProgramWorkoutEdit({
  workout,
  handleWorkouts,
  ...props
}: ProgramWorkoutProps) {
  const [selectedWorkout, setSelectedWorkout] =
    useState<IWorkoutEditDTO | null>(workout || null);
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

  const onSelectWorkout = (workout?: IWorkoutDTO) => {
    const _workout = workout ? workoutUtils.dtoToEditDto(workout) : null;
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
    setSelectedWorkout(workout ?? null);
  }, [workout]);

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
          selectedWorkout={selectedWorkout}
          onDaysChange={onDaysChange}
          saveToProgram={saveToProgram}
        />
      </header>

      <GenericModel
        Model={ProgramWorkoutEditWrapper}
        mode="create"
        buttonProps={{ buttonStyle: "model" }}
        isPortal={true}
        parentRef={modelRef}
      />

      <ul className="flex flex-col gap-4 h-[calc(100%-9.5rem)] overflow-auto">
        {availableWorkouts.map((wo) => (
          <Fragment key={wo.id}>
            <DynamicWorkoutPreview
              workout={wo}
              onSelectWorkout={onSelectWorkout}
            />
          </Fragment>
        ))}
      </ul>
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
