import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { IExercise } from "../exercises/exercises.models";

import { IUser } from "../users/users.model";

export interface IWorkoutExercise {
  id: string;
  order: number;
  notes: string | null;
  exercise: IExercise;
  hasWarmUp?: boolean;
  isBodyWeight?: boolean;
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
}
