import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";

export interface IWorkoutStore {
  workouts: IWorkoutDTO[];
  isLoading: boolean;
  isDeleting: boolean;
  isSavingId: string | null;
  isLoadingId: string | null;
  loadWorkouts: () => Promise<void>;
  getById: (id?: string) => Promise<IWorkoutDTO | null>;
  saveWorkout: (
    workoutToSave: IWorkoutEditDTO
  ) => Promise<IWorkoutDTO | null | undefined>;
  deleteWorkout: (id: string) => Promise<void>;
}
