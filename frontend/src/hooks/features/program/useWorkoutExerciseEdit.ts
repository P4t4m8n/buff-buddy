import { useCallback, useEffect, useState } from "react";
import type { SetStateAction, Dispatch, ChangeEvent } from "react";
import { useExerciseStore } from "../../../store/exercise.store";

import { workoutExerciseUtils } from "../../../utils/workoutExercises.util";
import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";
import { coreSetUtil } from "../../../utils/coreSet.util";

interface IWorkoutExerciseEditHook {
  setWorkoutExerciseToEdit: Dispatch<
    SetStateAction<IWorkoutExerciseEditDTO | null>
  >;
  handleSelectExercise: (exercise: IExerciseDTO) => void;
  filterExercises: (searchValue: string) => IExerciseDTO[];
  handleInputChange: (e: ChangeEvent) => void;
  handleSetChange: (e: ChangeEvent) => void;
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
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);

  useEffect(() => {
    resetWorkoutExerciseToEdit();
    loadExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectExercise = (exercise: IExerciseDTO) => {
    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercise: exercise,
        exerciseId: exercise.id,
        coreSet: prev?.coreSet ? prev.coreSet : coreSetUtil.getEmpty(),
      };
    });
  };

  const filterExercises = (searchValue: string) => {
    if (!searchValue) return exercises;
    return exercises.filter((exercise) =>
      exercise?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      return type === "number"
        ? { ...prev, [name]: parseInt(value, 10) }
        : { ...prev, [name]: value };
    });
  };

  const handleSetChange = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    const key = name.split("-")[0];

    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      const updatedCoreSet = {
        ...prev.coreSet,
        weight: key === "isBodyWeight" ? 0 : prev?.coreSet?.weight ?? 1,
        [key]: type === "checkbox" ? checked : parseFloat(value),
      };
      return {
        ...prev,
        coreSet: updatedCoreSet,
      };
    });
  }, []);

  const resetWorkoutExerciseToEdit = () => {
    setWorkoutExerciseToEdit(
      workoutExercise
        ? workoutExercise
        : workoutExerciseUtils.getEmpty(workoutExercisesLength)
    );
  };

  return {
    setWorkoutExerciseToEdit,
    handleSelectExercise,
    filterExercises,
    handleInputChange,
    handleSetChange,
    resetWorkoutExerciseToEdit,
    workoutExerciseToEdit,
    exercises,
  };
};
