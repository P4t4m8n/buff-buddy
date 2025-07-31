import {
  TExerciseMuscle,
  TExerciseEquipment,
  TExerciseType,
} from "../../../../shared/models/exercise.model";

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
      notes?: string | null;
      exercise: IExercise;
      coreSet: ICoreSet;
    };
    userSets: IUserSet[];
  }[];
}

export interface IUserWorkoutEdit {
  id: string;
  dateCompleted: Date | string | null;
  ownerId: string;
  programId: string | null;
  workoutId: string | null;
  workout: {
    id: string;
    name: string | null;
    notes: string | null;
    userWorkouts: Array<{
      id: string;
      dateCompleted: Date | string | null;
      ownerId: string;
      userWorkoutExercises: Array<{
        id: string;
        workoutExercise: {
          id: string;
          order: number;
          notes: string | null;
          exercise: {
            id: string;
            name: string;
            youtubeUrl: string;
            types: TExerciseType[];
            equipment: TExerciseEquipment[];
            muscles: TExerciseMuscle[];
          };
          coreSet: {
            id: string;
            hasWarmup: boolean;
            restTime: number;
            createdAt: Date | string;
            updatedAt: Date | string;
            numberOfSets: number;
            reps: Array<{
              id: string;
              reps: number;
            }>;
            weight: Array<{
              id: string;
              weight: number | null;
              isBodyWeight: boolean;
            }>;
          };
        };
        userSets: Array<{
          id: string;
          reps: number;
          weight: number | null;
          isWarmup: boolean;
          isCompleted: boolean;
          isMuscleFailure: boolean;
          isJointPain: boolean;
          isBodyWeight: boolean;
          order: number;
        }>;
      }>;
    }>;
  } | null;
  userWorkoutExercises: Array<{
    id: string;
    workoutExercise: {
      id: string;
      order: number;
      notes: string | null;
      exercise: {
        id: string;
        name: string;
        youtubeUrl: string;
        types: TExerciseType[];
        equipment: TExerciseEquipment[];
        muscles: TExerciseMuscle[];
      };
      coreSet: {
        id: string;
        hasWarmup: boolean;
        restTime: number;
        createdAt: Date | string;
        updatedAt: Date | string;
        numberOfSets: number;
        reps: Array<{
          id: string;
          reps: number;
        }>;
        weight: Array<{
          id: string;
          weight: number | null;
          isBodyWeight: boolean;
        }>;
      };
    };
    userSets: Array<{
      id: string;
      reps: number;
      weight: number | null;
      isWarmup: boolean;
      isCompleted: boolean;
      isMuscleFailure: boolean;
      isJointPain: boolean;
      isBodyWeight: boolean;
    }>;
  }>;
}
