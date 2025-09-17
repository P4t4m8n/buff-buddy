import type { IWorkoutExerciseDTO } from "../../../../shared/models/workout.model";
import type { IWorkoutExercise } from "../workouts/workouts.models";

const buildDTO = (workoutExercise: IWorkoutExercise): IWorkoutExerciseDTO => {
  return {
    ...workoutExercise,
  };
};

export const workoutExerciseUtils = {
  buildDTO,
};
