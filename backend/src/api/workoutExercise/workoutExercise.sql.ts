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
    isBodyWeight: dto?.isBodyWeight,
    hasWarmup: dto?.hasWarmup,
    
  };
};

const getWorkoutExerciseUpdate = (
  dto: TUpdateWorkoutExerciseInput
): Prisma.WorkoutExerciseUpdateInput => {
  return {
    ...dbUtil.cleanData({
      isBodyWeight: dto.isBodyWeight,
      hasWarmup: dto.hasWarmup,
      order: dto.order ?? undefined,
      notes: dto.notes,
      exercise: { connect: { id: dto.exerciseData?.id } },
    }),
  };
};

export const workoutExerciseSQL = {
  getWorkoutExerciseCreate,
  getWorkoutExerciseUpdate,
};
