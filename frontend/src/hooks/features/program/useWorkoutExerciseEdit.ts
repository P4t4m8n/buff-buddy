import { useEffect, useState } from "react";
import { useExerciseStore } from "../../../store/exercise.store";

import { workoutExerciseUtils } from "../../../utils/workoutExercises.util";

import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";
import { formUtil } from "../../../utils/form.util";

interface IWorkoutExerciseEditHook {
  setWorkoutExerciseToEdit: React.Dispatch<
    React.SetStateAction<IWorkoutExerciseEditDTO | null>
  >;
  selectExercise: (exercise?: IExerciseDTO) => void;
  filterExercises: (searchValue: string) => IExerciseDTO[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetWorkoutExerciseToEdit: () => void;
  workoutExerciseToEdit: IWorkoutExerciseEditDTO | null;
  exercises: IExerciseDTO[];
}

export const useWorkoutExerciseEdit = (
  workoutExercise?: IWorkoutExerciseEditDTO,
  workoutExercisesLength?: number
): IWorkoutExerciseEditHook => {
  const [workoutExerciseToEdit, setWorkoutExerciseToEdit] =
    useState<IWorkoutExerciseEditDTO | null>(null);
  const exercises = useExerciseStore((state) => state.items);
  const loadExercises = useExerciseStore((state) => state.loadItems);

  useEffect(() => {
    resetWorkoutExerciseToEdit();
    loadExercises();
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

  const filterExercises = (searchValue: string) => {
    if (!searchValue) return exercises;
    return exercises.filter((exercise) =>
      exercise?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
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
    setWorkoutExerciseToEdit,
    selectExercise,
    filterExercises,
    handleInputChange,
    resetWorkoutExerciseToEdit,
    workoutExerciseToEdit,
    exercises,
  };
};
