import {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../shared/models/userWorkout";
import { coreSetsUtil } from "../coreSets/coreSets.util";
import { workoutUtils } from "../workouts/workout.utils";
import { IUserWorkout, IUserWorkoutEdit } from "./userWorkouts.model";

export const userWorkoutsUtils = {
  toDTO(data: IUserWorkout): IUserWorkoutDTO {
    return {
      id: data.id,
      dateCompleted: data.dateCompleted,
      program: data.program,
      owner: data.owner,
      workout: {
        id: data.workout?.id ?? "",
        name: data.workout?.name ?? null,
        notes: data.workout?.notes ?? null,
      },
      workoutExercises: data.userWorkoutExercises.map((uw) => ({
        userSets: uw.userSets,
        id: uw.id,
        order: uw.workoutExercise.order,
        notes: uw.workoutExercise.notes ?? null,
        exercise: uw.workoutExercise.exercise,
        coreSet: coreSetsUtil.toDTO(uw.workoutExercise?.coreSet),
      })),
    };
  },
  toEditDTO(data: IUserWorkoutEdit): IUserWorkoutEditDTO {
    return {
      id: data.id,
      ownerId: data.ownerId,
      dateCompleted: data.dateCompleted ? data.dateCompleted : null,
      programId: data.programId ?? null,
      workout: {
        id: data.workout?.id ?? "",
        name: data.workout?.name ?? null,
        notes: data.workout?.notes ?? null,
      },
      workoutExercises: data.userWorkoutExercises.map((uw) => {
        return {
          id: uw.id,
          order: uw.workoutExercise.order,
          notes: uw.workoutExercise.notes ?? null,
          exercise: uw.workoutExercise.exercise,
          workoutExerciseId: uw.workoutExercise.id,
          coreSet: coreSetsUtil.toDTO(uw.workoutExercise.coreSet),
          userSets: uw.userSets,
        };
      }),
      workoutId: data.workoutId ?? null,
    };
  },
};
