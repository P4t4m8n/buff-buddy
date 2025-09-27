import { dbUtil } from "../../shared/utils/db.util";

import { exerciseSQL } from "../exercises/exercise.sql";
import { userSQL } from "../users/users.sql";
import { workoutExerciseSQL } from "../workoutExercise/workoutExercise.sql";

import type { Prisma } from "../../../prisma/generated/prisma";
import type { TWorkoutExerciseCreateValidatedInput } from "../../../../shared/validations/workoutExercise.validations";
import type {
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
} from "../../../../shared/validations/workout.validations";

const WORKOUT_EXERCISE_SELECT: Prisma.WorkoutExerciseSelect = {
  id: true,
  order: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
  exercise: {
    select: exerciseSQL.EXERCISE_SELECT,
  },
};

const WORKOUT_SELECT = {
  id: true,
  name: true,
  notes: true,
  isTemplate: true,
  owner: {
    select: userSQL.SMALL_USER_SELECT,
  },
  workoutExercises: {
    select: {
      id: true,
      order: true,
      notes: true,
      hasWarmup: true,
      isBodyWeight: true,
      exercise: {
        select: exerciseSQL.EXERCISE_SELECT,
      },
    },
  },
};

const WORKOUT_SELECT_SMALL: Partial<Prisma.WorkoutSelect> = {
  id: true,
  name: true,
  notes: true,
};

const getWorkoutCreate = (
  data?: TWorkoutCreateValidatedInput | null,
  userId?: string | null
): Prisma.WorkoutCreateInput => {
  return {
    name: data?.name ?? data?.name,
    owner: { connect: { id: userId ?? undefined } },
    notes: data?.notes,
    isTemplate: data?.isTemplate ?? false,
    workoutExercises: {
      create: (data?.workoutExercises ?? []).map(
        (we) =>
          workoutExerciseSQL.getWorkoutExerciseCreate(
            we
          ) as Prisma.WorkoutExerciseCreateInput
      ),
    },
  };
};

const getWorkoutUpdate = (
  data: TWorkoutUpdateValidatedInput
): Prisma.WorkoutUpdateInput => {
  const { workoutExercises, ...workoutData } = data;

  const exercisesToCreate =
    (workoutExercises?.filter(
      (we) => we.crudOperation === "create"
    ) as TWorkoutExerciseCreateValidatedInput[]) ?? [];
  const exercisesToUpdate =
    workoutExercises?.filter((we) => we.crudOperation === "update") ?? [];
  const exercisesToDelete =
    workoutExercises?.filter((we) => we.crudOperation === "delete") ?? [];

  return {
    id: workoutData.id,
    ...dbUtil.cleanData({
      notes: workoutData.notes,
      name: workoutData.name,
      isTemplate: workoutData.isTemplate,
    }),
    workoutExercises: {
      deleteMany: exercisesToDelete.map((we) => ({ id: we.id! })),
      create: exercisesToCreate.map(
        (we) =>
          workoutExerciseSQL.getWorkoutExerciseCreate(
            we
          ) as Prisma.WorkoutExerciseCreateInput
      ),
      update: exercisesToUpdate.map((we) => ({
        where: { id: we.id! },
        data: workoutExerciseSQL.getWorkoutExerciseUpdate(we),
      })),
    },
  };
};

export const workoutSQL = {
  WORKOUT_SELECT,
  WORKOUT_SELECT_SMALL,
  WORKOUT_EXERCISE_SELECT,
  getWorkoutCreate,
  getWorkoutUpdate,
};
