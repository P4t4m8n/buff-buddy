import type { IWorkoutExerciseEditDTO } from "../models/workout.model";
import { appUtil } from "./app.util";

export const workoutExerciseUtils = {
  getEmpty: (order?: number): IWorkoutExerciseEditDTO => {
    return {
      id: appUtil.getTempId(),
      order: order ?? 0,
      notes: "",
      exerciseId: "",
      coreSets: [],
      crudOperation: "create",
    };
  },
};
