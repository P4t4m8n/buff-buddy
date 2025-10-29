import { IModel } from "../../shared/models/db.model";
import type { IUser } from "../users/users.model";
import type { IWorkoutExercise } from "../workoutExercise/workoutExercise.mode";

export interface IWorkout extends IModel {
  owner?: IUser | null;
  workoutExercises?: IWorkoutExercise[] | null;
  name?: string | null;
  notes?: string | null;
  isTemplate?: boolean;
}
