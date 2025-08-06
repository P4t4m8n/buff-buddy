import { useCallback, useEffect, useState } from "react";
import { useExerciseStore } from "../../../store/exercise.store";

import { workoutExerciseUtils } from "../../../utils/workoutExercises.util";
import { coreCardioSetUtil } from "../../../utils/coreCardioSet";
import { coreStrengthSetUtil } from "../../../utils/coreStrengthSet.util";

import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";

interface IWorkoutExerciseEditHook {
  setWorkoutExerciseToEdit: React.Dispatch<
    React.SetStateAction<IWorkoutExerciseEditDTO | null>
  >;
  handleSelectExercise: (exercise: IExerciseDTO) => void;
  filterExercises: (searchValue: string) => IExerciseDTO[];
  handleInputChange: (e: React.ChangeEvent) => void;
  handleCoreStrengthSetChange: (e: React.ChangeEvent) => void;
  handleCoreCardioSetChange: (e: React.ChangeEvent) => void;
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
      const tempPrev = {
        ...prev,
        exerciseData: {
          id: exercise.id!,
          type: exercise.type!,
        },
        exercise: exercise,
      };
      if (exercise.type === "strength") {
        tempPrev.coreStrengthSet = coreStrengthSetUtil.getEmpty();
      } else if (exercise.type === "cardio") {
        tempPrev.coreCardioSet = coreCardioSetUtil.getEmpty();
      }
      return tempPrev;
    });
  };

  const filterExercises = (searchValue: string) => {
    if (!searchValue) return exercises;
    return exercises.filter((exercise) =>
      exercise?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleInputChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      return type === "number"
        ? { ...prev, [name]: parseInt(value, 10) }
        : { ...prev, [name]: value };
    });
  };

  const handleCoreStrengthSetChange = useCallback((e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    const key = name.split("-")[0];

    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      const updatedCoreSet = {
        ...prev.coreStrengthSet,
        weight: key === "isBodyWeight" ? 0 : prev?.coreStrengthSet?.weight ?? 1,
        [key]: type === "checkbox" ? checked : parseFloat(value),
      };
      return {
        ...prev,
        coreStrengthSet: updatedCoreSet,
      };
    });
  }, []);

  const handleCoreCardioSetChange = useCallback((e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    const key = name.split("-")[0];
    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      const updatedCoreCardioSet = {
        ...prev.coreCardioSet,
        [key]: type === "checkbox" ? checked : parseFloat(value),
      };
      return {
        ...prev,
        coreCardioSet: updatedCoreCardioSet,
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
    handleCoreStrengthSetChange,
    handleCoreCardioSetChange,
    resetWorkoutExerciseToEdit,
    workoutExerciseToEdit,
    exercises,
  };
};
