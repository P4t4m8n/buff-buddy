import type { IProgramExerciseDTO } from "../models/programExercise.model";
import { appUtil } from "../utils/app.util";
import { exerciseService } from "./exercise.service";

export const programExerciseService = {
  getEmpty: (order?: number): IProgramExerciseDTO => {
    return {
      id: appUtil.getTempId("temp"),
      order: order ?? 0,
      notes: "",
      exercise: exerciseService.getEmpty(),
      coreSets: [],
      daysOfWeek: [],
    };
  },
};
