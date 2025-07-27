import { Prisma } from "../../../prisma/generated/prisma";
import { coreSetsSQL } from "../coreSets/coreSets.sql";
import { exerciseSQL } from "../exercises/exercise.sql";
import { SMALL_USER_SELECT } from "../users/users.sql";

export const WORKOUT_EXERCISE_SELECT: Prisma.WorkoutExerciseSelect = {
  id: true,
  order: true,
  notes: true,
  exercise: {
    select: exerciseSQL.EXERCISE_SELECT,
  },
  coreSet: {
    select: coreSetsSQL.CORE_SET_SELECT,
  },
};

export const WORKOUT_SELECT: Prisma.WorkoutSelect = {
  id: true,
  name: true,
  notes: true,
  owner: {
    select: SMALL_USER_SELECT,
  },
  workoutExercises: {
    select: WORKOUT_EXERCISE_SELECT,
  },
};
