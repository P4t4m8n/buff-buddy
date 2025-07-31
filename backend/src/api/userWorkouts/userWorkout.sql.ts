import { Prisma } from "../../../prisma/generated/prisma";
import { coreSetsSQL } from "../coreSets/coreSets.sql";
import { exerciseSQL } from "../exercises/exercise.sql";

const USER_EXERCISE_SELECT = {
  id: true,
  dateCompleted: true,
  program: {
    select: {
      id: true,
      name: true,
      notes: true,
      isActive: true,
      startDate: true,
      endDate: true,
    },
  },
  owner: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
  workout: {
    select: {
      id: true,
      name: true,
      notes: true,
    },
  },
  userWorkoutExercises: {
    select: {
      id: true,
      workoutExercise: {
        select: {
          id: true,
          order: true,
          notes: true,
          exercise: {
            select: exerciseSQL.EXERCISE_SELECT,
          },
          coreSet: {
            select: coreSetsSQL.CORE_SET_SELECT,
          },
        },
      },
      userSets: {
        select: {
          id: true,
          reps: true,
          weight: true,
          isWarmup: true,
          isCompleted: true,
          isMuscleFailure: true,
          isJointPain: true,
          isBodyWeight: true,
          order: true,
        },
      },
    },
  },
} as const satisfies Prisma.UserWorkoutSelect;

export const userWorkoutSql = {
  USER_EXERCISE_SELECT,
};
