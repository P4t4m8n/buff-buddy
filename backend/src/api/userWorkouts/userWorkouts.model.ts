import { IProgramBase } from "../programs/programs.models";
import { IUser } from "../users/users.model";
import { IUserCardioSet } from "../userSets/userCardioSets/userCardioSets.model";
import { IUserStrengthSet } from "../userSets/userStrengthSets/userStrengthSets.model";
import { IWorkoutBase, IWorkoutExercise } from "../workouts/workouts.models";

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
