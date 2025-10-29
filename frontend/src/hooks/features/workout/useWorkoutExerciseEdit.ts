import { useEffect, useState } from "react";

import { workoutExerciseUtil } from "../../../utils/workoutExercises.util";

import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";
import { formUtil } from "../../../utils/form.util";

export const useWorkoutExerciseEdit = (
  workoutExercise?: IWorkoutExerciseEditDTO,
  workoutExercisesLength?: number
) => {
  const [workoutExerciseToEdit, setWorkoutExerciseToEdit] =
    useState<IWorkoutExerciseEditDTO | null>(null);

  useEffect(() => {
    resetWorkoutExerciseToEdit();
  }, []);

  const selectExercise = (exercise?: IExerciseDTO | null) => {
    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      const tempPrev = {
        ...prev,
        exerciseData: exercise
          ? {
              id: exercise?.id!,
              type: exercise?.type!,
            }
          : null,
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
        : workoutExerciseUtil.getEmpty(workoutExercisesLength)
    );
  };

  return {
    selectExercise,
    handleInputChange,
    resetWorkoutExerciseToEdit,
    workoutExerciseToEdit,
  };
};
