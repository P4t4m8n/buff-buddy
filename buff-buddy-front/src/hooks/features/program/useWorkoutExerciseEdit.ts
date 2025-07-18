import { useCallback, useEffect, useState } from "react";
import type { SetStateAction, Dispatch, ChangeEvent } from "react";
import { useExerciseStore } from "../../../store/exercise.store";
import { coreSetsService } from "../../../services/coreSets.service";

import { workoutExerciseUtils } from "../../../utils/workoutExercises.util";
import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";
import type { ICoreSetEditDTO } from "../../../../../shared/models/set.model";
import type { TCrudOperation } from "../../../../../shared/models/app.model";

interface IWorkoutExerciseEditHook {
  setWorkoutExerciseToEdit: Dispatch<
    SetStateAction<IWorkoutExerciseEditDTO | null>
  >;
  handleSelectExercise: (exercise: IExerciseDTO) => void;
  filterExercises: (searchValue: string) => IExerciseDTO[];
  handleSets: (coreSet?: ICoreSetEditDTO) => void;
  handleInputChange: (e: ChangeEvent) => void;
  handleSetChange: (e: ChangeEvent) => void;
  validateWorkoutExercise: (
    workoutExercise: IWorkoutExerciseEditDTO
  ) => boolean;
  resetWorkoutExerciseToEdit: () => void;
  workoutExerciseToEdit: IWorkoutExerciseEditDTO | null;
  exercises: IExerciseDTO[];
  workoutExerciseErrors: Partial<
    Record<keyof IWorkoutExerciseEditDTO, string>
  > | null;
  coreSetsErrors: Partial<Record<string, string>>[] | null;
}

export const useWorkoutExerciseEdit = (
  workoutExercise?: IWorkoutExerciseEditDTO,
  workoutExercisesLength?: number
): IWorkoutExerciseEditHook => {
  const [workoutExerciseToEdit, setWorkoutExerciseToEdit] =
    useState<IWorkoutExerciseEditDTO | null>(null);
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);
  const [workoutExerciseErrors, setWorkoutExerciseErrors] = useState<Partial<
    Record<keyof IWorkoutExerciseEditDTO, string>
  > | null>(null);

  const [coreSetsErrors, setCoreSetsErrors] = useState<
    Partial<Record<string, string>>[] | null
  >(null);

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
        coreSets: prev?.coreSets?.length
          ? prev.coreSets
          : [coreSetsService.getEmpty()],
      };
    });
  };

  const filterExercises = (searchValue: string) => {
    if (!searchValue) return exercises;
    return exercises.filter((exercise) =>
      exercise?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSets = (coreSet?: ICoreSetEditDTO) => {
    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;

      const coreSets = prev?.coreSets ?? [];

      if (!coreSet) {
        const emptySet = coreSetsService.getEmpty(coreSets?.length + 1);
        return {
          ...prev,
          coreSets: organizeCoreSets([...coreSets, emptySet]),
        };
      }

      const idx = prev?.coreSets?.findIndex((cs) => cs.id === coreSet.id);

      if (idx === undefined || idx === -1) {
        return prev;
      }

      return {
        ...prev,
        coreSets: organizeCoreSets(coreSets.toSpliced(idx!, 1, coreSet)),
      };
    });
  };

  const organizeCoreSets = (coreSets: ICoreSetEditDTO[]): ICoreSetEditDTO[] => {
    return coreSets
      .sort((a, b) => (a?.order || 0) - (b?.order || 0))
      .map((ex, i) => {
        const isChangeOrder = ex.order !== i + 1;

        if (!isChangeOrder || ex.crudOperation === "delete") return ex;
        return {
          ...ex,
          order: i + 1,
          crudOperation:
            ex.crudOperation !== "create" ? "update" : ex.crudOperation,
        };
      });
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

    const [key, id] = name.split("-");

    setWorkoutExerciseToEdit((prev) => {
      if (!prev) return null;
      const updatedCoreSets = prev.coreSets?.map((set) => {
        if (set.id === id) {
          return {
            ...set,
            weight: key === "isBodyWeight" ? 0 : set.weight,
            [key]: type === "checkbox" ? checked : parseFloat(value),
            crudOperation:
              set?.crudOperation !== "create"
                ? "update"
                : (set?.crudOperation as TCrudOperation),
          };
        }
        return set;
      });
      return {
        ...prev,
        coreSets: updatedCoreSets,
      };
    });
  }, []);

  //TODO??refactor this function to improve readability and reduce complexity
  const validateWorkoutExercise = (
    workoutExercise: IWorkoutExerciseEditDTO
  ) => {
    const _workoutExerciseErrors: Partial<
      Record<keyof IWorkoutExerciseEditDTO, string>
    > = {};
    const _coreSetsErrors: Partial<Record<string, string>>[] = [];

    if (!workoutExercise.order || workoutExercise.order < 1) {
      _workoutExerciseErrors.order = "Order must be a positive number.";
    }

    if (!workoutExercise.exerciseId) {
      _workoutExerciseErrors.exerciseId = "Exercise must be selected.";
    }

    if (!workoutExercise.coreSets || workoutExercise.coreSets.length === 0) {
      _workoutExerciseErrors.coreSets = "At least one set is required.";
    }

    workoutExercise.coreSets?.forEach((set) => {
      if (!set.id) {
        console.error("Set ID is required.");
        return;
      }

      const error: Partial<Record<string, string>> = {
        id: set.id,
      };

      let errorFlag = false;
      if (!set.reps || set.reps < 1) {
        error.reps = "Reps must be a positive number.";
        errorFlag = true;
      }
      if (set.isBodyWeight && set.weight && set.weight < 0) {
        error.weight = "Weight cannot be negative.";
        errorFlag = true;
      }
      if (!set.restTime || set.restTime < 0) {
        error.restTime = "Rest time cannot be negative.";
        errorFlag = true;
      }

      if (errorFlag) {
        _coreSetsErrors.push(error);
      }
    });

    const isWorkoutExerciseValid =
      Object.keys(_workoutExerciseErrors).length === 0;
    const isCoreSetsValid = Object.keys(_coreSetsErrors).length === 0;

    if (!isWorkoutExerciseValid) {
      setWorkoutExerciseErrors(_workoutExerciseErrors);
    } else {
      setWorkoutExerciseErrors(null);
    }
    if (!isCoreSetsValid) {
      setCoreSetsErrors(_coreSetsErrors);
    } else {
      setCoreSetsErrors(null);
    }

    return isWorkoutExerciseValid && isCoreSetsValid;
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
    handleSelectExercise,
    filterExercises,
    handleSets,
    handleInputChange,
    handleSetChange,
    validateWorkoutExercise,
    resetWorkoutExerciseToEdit,
    workoutExerciseErrors,
    coreSetsErrors,
    workoutExerciseToEdit,
    exercises,
  };
};
