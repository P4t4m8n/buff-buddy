import { Prisma } from "../../../prisma/generated/prisma";
import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import { exerciseSQL } from "../exercises/exercise.sql";
import { userSQL } from "../users/users.sql";
import {
  TCreateWorkoutExerciseInput,
  TUpdateWorkoutExerciseInput,
} from "../workoutExercise/workoutExercise.validations";
import {
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
} from "./workouts.validations";

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

const getWorkoutExerciseCreate = (
  dto: TCreateWorkoutExerciseInput | TUpdateWorkoutExerciseInput | null
): Prisma.WorkoutExerciseCreateInput => {
  return {
    order: dto?.order || 1,
    notes: dto?.notes,
    exercise: { connect: { id: dto?.exerciseId } },
    coreStrengthSet: {
      create: coreStrengthSetsSQL.getCreateCoreSets(dto?.coreStrengthSet),
    },
    coreCardioSet: {
      create: coreCardioSetsSQL.getCreateCoreSets(dto?.coreCardioSet),
    },

    workout: {
      create: undefined,
      connectOrCreate: undefined,
      connect: undefined,
    },
  };
};

const getWorkoutCreate = (
  dto?: TCreateWorkoutInput | TUpdateWorkoutInput | null,
  userId?: string | null
): Prisma.WorkoutCreateInput => {
  return {
    name: dto?.name ?? dto?.name,
    owner: { connect: { id: userId ?? undefined } },
    workoutExercises: {
      create: (dto?.workoutExercises ?? []).map((we) =>
        getWorkoutExerciseCreate(we)
      ),
    },
  };
};

export const workoutSQL = {
  WORKOUT_SELECT,
  WORKOUT_SELECT_SMALL,
  WORKOUT_EXERCISE_SELECT,
  getWorkoutCreate,
  getWorkoutExerciseCreate,
};
