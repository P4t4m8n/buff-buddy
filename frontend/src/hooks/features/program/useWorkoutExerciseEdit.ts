import { useCallback, useEffect, useState } from "react";
import type { SetStateAction, Dispatch, ChangeEvent } from "react";
import { useExerciseStore } from "../../../store/exercise.store";

import { workoutExerciseUtils } from "../../../utils/workoutExercises.util";
import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";
import { coreSetsUtil } from "../../../utils/coreSets.util";

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
        coreSets: prev?.coreSets ? prev.coreSets : coreSetsUtil.getEmpty(),
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
      const updatedCoreSets = {
        ...prev.coreSets,
        weight: key === "isBodyWeight" ? 0 : prev?.coreSets?.weight ?? 1,
        [key]: type === "checkbox" ? checked : parseFloat(value),
        // crudOperation:
        //   set?.crudOperation !== "create"
        //     ? "update"
        //     : (set?.crudOperation as TCrudOperation),
      };
      return {
        ...prev,
        coreSets: updatedCoreSets,
      };
    });
  }, []);

  //TODO??refactor this function to improve readability and reduce complexity
  // const validateWorkoutExercise = (
  //   workoutExercise: IWorkoutExerciseEditDTO
  // ) => {
  //   const _workoutExerciseErrors: Partial<
  //     Record<keyof IWorkoutExerciseEditDTO, string>
  //   > = {};
  //   const _coreSetsErrors: Partial<Record<string, string>>[] = [];

  //   if (!workoutExercise.order || workoutExercise.order < 1) {
  //     _workoutExerciseErrors.order = "Order must be a positive number.";
  //   }

  //   if (!workoutExercise.exerciseId) {
  //     _workoutExerciseErrors.exerciseId = "Exercise must be selected.";
  //   }

  //   const { coreSets } = workoutExercise;

  //   if (!coreSets?.id) {
  //     console.error("Set ID is required.");
  //     return;
  //   }

  //   const error: Partial<Record<string, string>> = {
  //     id: coreSets.id,
  //   };

  //   let errorFlag = false;
  //   if (!coreSets.reps || coreSets.reps < 1) {
  //     error.reps = "Reps must be a positive number.";
  //     errorFlag = true;
  //   }
  //   if (coreSets.isBodyWeight && coreSets.weight && coreSets.weight < 0) {
  //     error.weight = "Weight cannot be negative.";
  //     errorFlag = true;
  //   }
  //   if (!coreSets.restTime || coreSets.restTime < 0) {
  //     error.restTime = "Rest time cannot be negative.";
  //     errorFlag = true;
  //   }

  //   if (errorFlag) {
  //     _coreSetsErrors.push(error);
  //   }
  //   const isWorkoutExerciseValid =
  //     Object.keys(_workoutExerciseErrors).length === 0;
  //   const isCoreSetsValid = Object.keys(_coreSetsErrors).length === 0;

  //   if (!isWorkoutExerciseValid) {
  //     setWorkoutExerciseErrors(_workoutExerciseErrors);
  //   } else {
  //     setWorkoutExerciseErrors(null);
  //   }
  //   if (!isCoreSetsValid) {
  //     setCoreSetsErrors(_coreSetsErrors);
  //   } else {
  //     setCoreSetsErrors(null);
  //   }

  //   return isWorkoutExerciseValid && isCoreSetsValid;
  // };

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
