import type { IProgramBase } from "../programs/programs.models";
import type { IUser } from "../users/users.model";
import type { IUserCardioSet } from "../userSets/userCardioSets/userCardioSets.model";
import type { IUserStrengthSet } from "../userSets/userStrengthSets/userStrengthSets.model";
import type {
  IWorkoutBase,
  IWorkoutExercise,
} from "../workouts/workouts.models";

export interface IUserWorkout {
  id: string;
  dateCompleted?: Date | null;
  program: IProgramBase | null;
  owner: IUser;
  workout: IWorkoutBase | null;
  userWorkoutExercises: {
    id: string;
    workoutExercise: IWorkoutExercise;
    userStrengthSets?: IUserStrengthSet[] | null;
    userCardioSets?: IUserCardioSet[] | null;
  }[];
}
