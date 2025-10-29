import { IModel } from "../../shared/models/db.model";
import type { IProgramBase } from "../programs/programs.models";
import type { IUser } from "../users/users.model";
import type { IUserCardioSet } from "../userSets/userCardioSets/userCardioSets.model";
import type { IUserStrengthSet } from "../userSets/userStrengthSets/userStrengthSets.model";
import { IWorkoutExercise } from "../workoutExercise/workoutExercise.mode";
import { IWorkout } from "../workouts/workouts.models";

export interface IUserWorkout extends IModel {
  dateCompleted?: Date | null;
  program: IProgramBase | null;
  owner: IUser;
  workout?: Partial<IWorkout> | null;
  userWorkoutExercises: {
    id: string;
    workoutExercise?: IWorkoutExercise;
    userStrengthSets?: IUserStrengthSet[] | null;
    userCardioSets?: IUserCardioSet[] | null;
  }[];
}
