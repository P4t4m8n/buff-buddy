import { userCardioSetsUtils } from "../userSets/userCardioSets/userCardioSets.util";
import { userStrengthSetsUtils } from "../userSets/userStrengthSets/userStrengthSets.util";
import { workoutExerciseUtils } from "../workoutExercise/workoutExercise.util";

import type { IUserWorkout } from "./userWorkouts.model";
import type {
  IUserWorkoutDTO,
  IUserWorkoutExercisesDTO,
} from "../../../../shared/models/userWorkout";

const buildDTO = (data: IUserWorkout): IUserWorkoutDTO => {
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
    userWorkoutExercises: data.userWorkoutExercises.map((uw) => {
      const uwe: IUserWorkoutExercisesDTO = {
        id: uw.id,

        ...workoutExerciseUtils.buildDTO(uw.workoutExercise),
      };
      const userStrengthSets = uw?.userStrengthSets?.map((us) =>
        userStrengthSetsUtils.buildDTO(us)
      );
      const userCardioSets = uw?.userCardioSets?.map((uc) =>
        userCardioSetsUtils.buildDTO(uc)
      );

      if (userStrengthSets) uwe.userStrengthSets = userStrengthSets;
      if (userCardioSets) uwe.userCardioSets = userCardioSets;
      return uwe;
    }),
  };
};
export const userWorkoutsUtils = {
  buildDTO,
};
