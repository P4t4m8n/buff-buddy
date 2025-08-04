import { IWorkoutExerciseDTO } from "../../../../shared/models/workout.model";
import { coreCardioSetsUtil } from "../coreSets/coreCardioSets/coreCardioSets.util";
import { coreStrengthSetsUtil } from "../coreSets/coreStrengthSets/coreStrengthSets.util";
import { IWorkoutExercise } from "../workouts/workouts.models";

const buildDTO = (workoutExercise: IWorkoutExercise): IWorkoutExerciseDTO => {
  return {
    ...workoutExercise,
    coreStrengthSet: coreStrengthSetsUtil.toDTO(
      workoutExercise.coreStrengthSet
    ),
    coreCardioSet: coreCardioSetsUtil.toDTO(workoutExercise.coreCardioSet),
  };
};

export const workoutExerciseUtils = {
  buildDTO,
};
