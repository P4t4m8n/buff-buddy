import React from "react";

import IsActiveInput from "../UI/Form/IsActiveInput";

import type { IWorkoutFilter } from "../../../../shared/models/workout.model";

interface IWorkoutFilterProps {
  workoutsFilter: IWorkoutFilter;
  setWorkoutsFilter: React.Dispatch<React.SetStateAction<IWorkoutFilter>>;
}
function WorkoutFilterMemo({
  workoutsFilter,
  setWorkoutsFilter,
}: IWorkoutFilterProps) {
  const { programId, dayOfWeek, exerciseId, isCompleted, isTemplate } =
    workoutsFilter;
  console.log("🚀 ~ WorkoutFilter ~ isTemplate:", isTemplate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    let newVal: boolean | string | number | null;
    switch (type) {
      case "checkbox":
        newVal = checked;
        break;
      case "number":
        newVal = parseFloat(value);
        break;
      default:
        newVal = value;
        break;
    }
    setWorkoutsFilter((prev) => {
      return {
        ...prev,
        [name]: newVal,
      };
    });
  };
  return (
    <div className="flex flex-wrap gap-3 items-end p-2">
      <IsActiveInput
        handleInputChange={handleChange}
        isActive={!!isTemplate}
        inputName="isTemplate"
      />
    </div>
  );
}

const arePropsEqual = (
  prevProps: IWorkoutFilterProps,
  nextProps: IWorkoutFilterProps
) => {
  if (
    prevProps.workoutsFilter !== nextProps.workoutsFilter ||
    prevProps.setWorkoutsFilter !== nextProps.setWorkoutsFilter
  ) {
    return false;
  }

  return true;
};

export default React.memo(
  WorkoutFilterMemo,
  arePropsEqual
) as typeof WorkoutFilterMemo;
