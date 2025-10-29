import type { IModel } from "../../shared/models/db.model";
import type { IExercise } from "../exercises/exercises.model";

export interface IWorkoutExercise extends IModel {
  order: number;
  notes: string | null;
  hasWarmup?: boolean;
  isBodyWeight?: boolean;
  numberOfSets?: number | null;
  maxNumberOfReps?: number | null;
  isDropSet: boolean;
  isMyoReps: boolean;
  restTime?: number | null;
  exercise?: IExercise;
}
