import type { IExerciseDTO } from "../../../shared/models/exercise.model";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";

export interface IWorkoutStore extends IStoreBase {
  workouts: IWorkoutDTO[];
  loadWorkouts: () => Promise<void>;
  getById: (id?: string) => Promise<IWorkoutDTO | null>;
  saveWorkout: (
    workoutToSave: IWorkoutEditDTO
  ) => Promise<IWorkoutDTO | null | undefined>;
  deleteWorkout: (id: string) => Promise<void>;
}

export interface IExerciseStore extends IStoreBase {
  exercises: IExerciseDTO[];
  loadExercises: () => Promise<void>;
  saveExercise: (exerciseToSave: IExerciseDTO) => Promise<boolean>;
  deleteExercise: (id: string) => Promise<void>;
}

export interface IStoreBase {
  isLoading: boolean; //Loading state for a list items
  isDeleting: boolean; //Loading state for item deletion
  isSavingId: string | null; //Loading state for the currently edited item to prevent render or blocking of other items
  isLoadingId: string | null; //Loading state for the currently loaded item
}
