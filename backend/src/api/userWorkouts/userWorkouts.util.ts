import { IUserWorkoutDTO } from "../../../../shared/models/workoutStart.model";
import { coreSetsUtil } from "../coreSets/coreSets.util";
import { IUserWorkout } from "./userWorkouts.model";

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
        coreSet: coreSetsUtil.toDTO(uw.workoutExercise.coreSet),
      })),
    };
  },
};
