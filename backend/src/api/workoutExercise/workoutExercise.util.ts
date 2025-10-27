import type { IWorkoutExerciseDTO } from "../../../../shared/models/workout.model";
import { IWorkoutExercise } from "./workoutExercise.mode";

const buildDTO = (workoutExercise?: IWorkoutExercise): IWorkoutExerciseDTO => {
  return {
    ...workoutExercise,
  };
};

export const workoutExerciseUtils = {
  buildDTO,
};
