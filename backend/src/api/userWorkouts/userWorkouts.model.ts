import { ICoreSet } from "../coreSets/coreSets.models";
import { IExercise } from "../exercises/exercises.models";
import { IUser } from "../users/users.model";
import { IUserSet } from "../userSets/userSets.model";

export interface IUserWorkout {
  id: string;
  dateCompleted?: Date | null;
  program: {
    id: string;
    name: string;
    notes: string | null;
    isActive: boolean;
    startDate: Date;
    endDate: Date | null;
  } | null;
  owner: IUser;
  workout: {
    id: string;
    name?: string | null;
    notes?: string | null;
  } | null;
  userWorkoutExercises: {
    id: string;
    workoutExercise: {
      id: string;
      order: number;
      notes?: string|null;
      exercise: IExercise;
      coreSet: ICoreSet;
    };
    userSets: IUserSet[];
  }[];
}
