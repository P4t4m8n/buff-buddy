import type { IWorkoutExerciseEditDTO } from "../../../shared/models/workout.model";
import { appUtil } from "./app.util";
import { coreSetUtil } from "./coreSet.util";

export const workoutExerciseUtils = {
  getEmpty: (order?: number): IWorkoutExerciseEditDTO => {
    return {
      id: appUtil.getTempId(),
      order: order ?? 0,
      notes: "",
      exerciseId: "",
      coreSet: coreSetUtil.getEmpty(),
      crudOperation: "create",
    };
  },
};
