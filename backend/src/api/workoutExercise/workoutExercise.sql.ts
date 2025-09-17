import { dbUtil } from "../../shared/utils/db.util";

import type { Prisma } from "../../../prisma/generated/prisma";
import type {
  TCreateWorkoutExerciseInput,
  TUpdateWorkoutExerciseInput,
} from "../../../../shared/validations/workoutExercise.validations";

//INFO: Return Partial as workoutExercise create only happens when creating/editing a workout
const getWorkoutExerciseCreate = (
  dto: TCreateWorkoutExerciseInput | null
): Partial<Prisma.WorkoutExerciseCreateInput> => {
  return {
    order: dto?.order || 1,
    notes: dto?.notes,
    exercise: { connect: { id: dto?.exerciseData?.id } },
  };
};

const getWorkoutExerciseUpdate = (
  data: TUpdateWorkoutExerciseInput
): Prisma.WorkoutExerciseUpdateInput => {
  return {
    ...dbUtil.cleanData({
      order: data.order ?? undefined,
      notes: data.notes,
      exercise: { connect: { id: data.exerciseData?.id } },
    }),
  };
};

export const workoutExerciseSQL = {
  getWorkoutExerciseCreate,
  getWorkoutExerciseUpdate,
};
