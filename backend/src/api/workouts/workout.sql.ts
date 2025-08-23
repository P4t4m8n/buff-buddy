import { Prisma } from "../../../prisma/generated/prisma";

import { dbUtil } from "../../shared/utils/db.util";

import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import { exerciseSQL } from "../exercises/exercise.sql";
import { userSQL } from "../users/users.sql";
import { workoutExerciseSQL } from "../workoutExercise/workoutExercise.sql";

import type { TCreateWorkoutExerciseInput } from "../../../../shared/validations/workoutExercise.validations";
import {
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
} from "../../../../shared/validations/workout.validations";

const WORKOUT_EXERCISE_SELECT: Prisma.WorkoutExerciseSelect = {
  id: true,
  order: true,
  notes: true,
  exercise: {
    select: exerciseSQL.EXERCISE_SELECT,
  },
  coreCardioSet: {
    select: coreCardioSetsSQL.CORE_CARDIO_SET_SELECT,
  },
  coreStrengthSet: {
    select: coreStrengthSetsSQL.CORE_STRENGTH_SET_SELECT,
  },
};

const WORKOUT_SELECT: Prisma.WorkoutSelect = {
  id: true,
  name: true,
  notes: true,
  isTemplate: true,
  owner: {
    select: userSQL.SMALL_USER_SELECT,
  },
  workoutExercises: {
    select: WORKOUT_EXERCISE_SELECT,
  },
};

const WORKOUT_SELECT_SMALL: Partial<Prisma.WorkoutSelect> = {
  id: true,
  name: true,
  notes: true,
};

const getWorkoutCreate = (
  data?: TCreateWorkoutInput | null,
  userId?: string | null
): Prisma.WorkoutCreateInput => {
  return {
    name: data?.name ?? data?.name,
    owner: { connect: { id: userId ?? undefined } },
    workoutExercises: {
      create: (data?.workoutExercises ?? []).map((we) =>
        workoutExerciseSQL.getWorkoutExerciseCreate(we)
      ),
    },
  };
};

const getWorkoutUpdate = (
  data: TUpdateWorkoutInput
): Prisma.WorkoutUpdateInput => {
  const { workoutExercises, ...workoutData } = data;

  const exercisesToCreate =
    (workoutExercises?.filter(
      (we) => we.crudOperation === "create"
    ) as TCreateWorkoutExerciseInput[]) ?? [];
  const exercisesToUpdate =
    workoutExercises?.filter((we) => we.crudOperation === "update") ?? [];
  const exercisesToDelete =
    workoutExercises?.filter((we) => we.crudOperation === "delete") ?? [];
  const x: Prisma.WorkoutUpdateInput = {
    id: workoutData.id,
    ...dbUtil.cleanData({
      notes: workoutData.notes,
      name: workoutData.name,
      isTemplate: workoutData.isTemplate,
    }),
    workoutExercises: {
      deleteMany: exercisesToDelete.map((we) => ({ id: we.id! })),
      create: exercisesToCreate.map((we) =>
        workoutExerciseSQL.getWorkoutExerciseCreate(we)
      ),
      update: exercisesToUpdate.map((we) => ({
        where: { id: we.id! },
        data: workoutExerciseSQL.getWorkoutExerciseUpdate(we),
      })),
    },
  };
  return x;
};

export const workoutSQL = {
  WORKOUT_SELECT,
  WORKOUT_SELECT_SMALL,
  WORKOUT_EXERCISE_SELECT,
  getWorkoutCreate,
  getWorkoutUpdate,
};
