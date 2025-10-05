import { useEffect, useState } from "react";

import { workoutExerciseUtils } from "../../../utils/workoutExercises.util";

import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";
import { formUtil } from "../../../utils/form.util";

interface IWorkoutExerciseEditHook {
  selectExercise: (exercise?: IExerciseDTO) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetWorkoutExerciseToEdit: () => void;
  workoutExerciseToEdit: IWorkoutExerciseEditDTO | null;
}

export const useWorkoutExerciseEdit = (
  workoutExercise?: IWorkoutExerciseEditDTO,
  workoutExercisesLength?: number
): IWorkoutExerciseEditHook => {
  const [workoutExerciseToEdit, setWorkoutExerciseToEdit] =
    useState<IWorkoutExerciseEditDTO | null>(null);

  useEffect(() => {
    resetWorkoutExerciseToEdit();
  }, []);

  const selectExercise = (exercise?: IExerciseDTO) => {
    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      const tempPrev = {
        ...prev,
        exerciseData: {
          id: exercise?.id!,
          type: exercise?.type!,
        },
        exercise: exercise,
      };

      return tempPrev;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formUtil.handleInputChange(e, setWorkoutExerciseToEdit);
  };

  const resetWorkoutExerciseToEdit = () => {
    setWorkoutExerciseToEdit(
      workoutExercise
        ? workoutExercise
        : workoutExerciseUtils.getEmpty(workoutExercisesLength)
    );
  };

  return {
    selectExercise,
    handleInputChange,
    resetWorkoutExerciseToEdit,
    workoutExerciseToEdit,
  };
};
