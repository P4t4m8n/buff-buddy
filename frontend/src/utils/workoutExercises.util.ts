import type { IWorkoutExerciseEditDTO } from "../../../shared/models/workout.model";
import { getTempId } from "../../../shared/utils/getTempId";

const getEmpty = (order?: number): IWorkoutExerciseEditDTO => {
  return {
    id: getTempId(),
    order: order ?? 0,
    notes: "",
    exerciseData: null,
    crudOperation: "create",
  };
};

export const workoutExerciseUtils = { getEmpty };
