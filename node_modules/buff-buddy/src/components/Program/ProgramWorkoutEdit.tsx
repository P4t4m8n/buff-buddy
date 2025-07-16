import { useWorkoutStore } from "../../store/workout.store";
import EditModel from "../UI/EditModel";
import ProgramWorkoutEditWrapper from "./ProgramWorkoutEditWrapper";
import DynamicWorkoutPreview from "../Workout/DynamicWorkoutPreview";
import Button from "../UI/Button";
import Label from "../UI/Form/Label";
import CheckboxMulti from "../UI/Form/CheckboxMulti";
import { calendarUtil } from "../../utils/calendar.util";
import { useState, useEffect, Fragment } from "react";
import type { IWorkoutDTO } from "../../models/workout.model";
import type { MouseEvent, RefObject } from "react";

interface ProgramWorkoutProps {
  parentRef?: RefObject<HTMLDivElement | null>;
  workout?: IWorkoutDTO;
  handleModel: (e: MouseEvent<HTMLButtonElement>) => void;
  handleWorkouts?: (workout: IWorkoutDTO) => void;
}

export default function ProgramWorkoutEdit({
  parentRef,
  workout,
  handleModel,
  handleWorkouts,
}: ProgramWorkoutProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<IWorkoutDTO | null>(
    workout || null
  );
  const workouts = useWorkoutStore((state) => state.workouts);
  const loadWorkouts = useWorkoutStore((state) => state.loadWorkouts);

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
    setSelectedWorkout(workout ?? null);
  };

  const saveToProgram = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedWorkout && handleWorkouts) {
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
    <div className="h-main fixed inset-0 bg-main-orange p-2 z-10 flex flex-col gap-4">
      <header className={""}>
        <h3 className="text-center">Pick a workout</h3>
        {selectedWorkout ? (
          <div className="border p-2">
            <DynamicWorkoutPreview workout={selectedWorkout} />
            <div className="grid content-around h-28">
              <Label htmlFor="daysOfWeek">Days of the week</Label>
              <CheckboxMulti
                options={calendarUtil.getShortWeekDays(true)}
                selectedOptions={
                  calendarUtil.fullWeekdaysToShort(
                    selectedWorkout?.daysOfWeek || []
                  ) ?? []
                }
                inputName="daysOfWeek"
                listStyle="border rounded p-1 gap-2 w-full grid grid-cols-4 justify-center justify-items-center h-20"
                onChange={onDaysChange}
              />
              {/* {programExerciseErrors?.daysOfWeek ? (
                      <Label htmlFor="order" className=" text-sm text-red-orange">
                      {programExerciseErrors?.daysOfWeek}
                      </Label>
                      ) : null} */}
            </div>
            <Button
              className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 min-h-10 mt-auto
              hover:text-white rounded transition-all duration-300
              hover:cursor-pointer  `}
              onClick={saveToProgram}
            >
              Save to Program
            </Button>
          </div>
        ) : (
          <p className="text-center">No workout selected</p>
        )}
      </header>
      <EditModel
        isPortal={true}
        parentRef={parentRef}
        EditComponent={ProgramWorkoutEditWrapper}
        buttonProps={{
          className: "w-full h-10",
          buttonStyle: "model",
          type: "button",
        }}
        buttonChildren={<span className="text-white">Add WK</span>}
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
