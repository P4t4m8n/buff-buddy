import { IUserWorkoutDTO } from "../../../../shared/models/userWorkout";
import { userCardioSetsUtils } from "../userSets/userCardioSets/userCardioSets.util";
import { userStrengthSetsUtils } from "../userSets/userStrengthSets/userStrengthSets.util";
import { workoutExerciseUtils } from "../workoutExercise/workoutExercise.util";
import { IUserWorkout } from "./userWorkouts.model";

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
      return {
        id: uw.id,
        workoutExercise: workoutExerciseUtils.buildDTO(uw.workoutExercise),
        userStrengthSets: uw?.userStrengthSets?.map((us) =>
          userStrengthSetsUtils.buildDTO(us)
        ),
        userCardioSets: uw?.userCardioSets?.map((uc) =>
          userCardioSetsUtils.buildDTO(uc)
        ),
      };
    }),
  };
};
export const userWorkoutsUtils = {
  buildDTO,
};
