import type { IExercise } from "../exercises/exercises.models";
import type { IUser } from "../users/users.model";

export interface IWorkoutExercise {
  id: string;
  order: number;
  notes: string | null;
  exercise: IExercise;
  hasWarmUp?: boolean;
  isBodyWeight?: boolean;
  restTime?: number | null;
}

export interface IWorkoutBase {
  id: string;
  name?: string | null;
  notes?: string | null;
  isTemplate?: boolean;
}

export interface IWorkout extends IWorkoutBase {
  owner?: IUser | null;
  workoutExercises?: IWorkoutExercise[] | null;
  notes?: string | null;
}
