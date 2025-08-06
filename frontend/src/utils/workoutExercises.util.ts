import type { IWorkoutExerciseEditDTO } from "../../../shared/models/workout.model";
import { appUtil } from "./app.util";

const getEmpty = (order?: number): IWorkoutExerciseEditDTO => {
  return {
    id: appUtil.getTempId(),
    order: order ?? 0,
    notes: "",
    exerciseData: null,
    crudOperation: "create",
  };
};

export const workoutExerciseUtils = { getEmpty };
