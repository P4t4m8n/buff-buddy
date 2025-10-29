import { dbUtil } from "../../shared/utils/db.util";

import type { Prisma } from "../../../prisma/generated/prisma";
import type {
  TWorkoutExerciseCreateValidatedInput,
  TWorkoutExerciseUpdateValidatedInput,
} from "../../../../shared/validations/workoutExercise.validations";
import { exerciseSQL } from "../exercises/exercise.sql";

const WORKOUT_EXERCISE_SELECT: Prisma.WorkoutExerciseSelect = {
  id: true,
  order: true,
  notes: true,
  hasWarmup: true,
  isBodyWeight: true,
  isDropSet: true,
  isMyoReps: true,
  restTime: true,
  numberOfSets: true,
  maxNumberOfReps: true,
  exercise: {
    select: exerciseSQL.EXERCISE_SELECT,
  },
};
/*
 * INFO: Return Omitted workout from workoutExercise as workoutExercise
 * create only happens when creating/editing a workout
 */
const getWorkoutExerciseCreate = (
  dto: TWorkoutExerciseCreateValidatedInput | null
): Omit<Prisma.WorkoutExerciseCreateInput, "workout"> => {
  return {
    order: dto?.order || 1,
    notes: dto?.notes,
    exercise: { connect: { id: dto?.exerciseData?.id } },
    isBodyWeight: dto?.isBodyWeight,
    hasWarmup: dto?.hasWarmup,
    numberOfSets: dto?.numberOfSets,
    maxNumberOfReps: dto?.maxNumberOfReps,
    isDropSet: dto?.isDropSet,
    isMyoReps: dto?.isMyoReps,
  };
};

const getWorkoutExerciseUpdate = (
  dto: TWorkoutExerciseUpdateValidatedInput
): Prisma.WorkoutExerciseUpdateInput => {
  return {
    ...dbUtil.cleanData({
      isBodyWeight: dto.isBodyWeight,
      hasWarmup: dto.hasWarmup,
      numberOfSets: dto?.numberOfSets,
      maxNumberOfReps: dto?.maxNumberOfReps,
      isDropSet: dto?.isDropSet,
      isMyoReps: dto?.isMyoReps,
      order: dto.order ?? undefined,
      notes: dto.notes,
      exercise: { connect: { id: dto.exerciseData?.id } },
    }),
  };
};

export const workoutExerciseSQL = {
  getWorkoutExerciseCreate,
  getWorkoutExerciseUpdate,
  WORKOUT_EXERCISE_SELECT,
};
