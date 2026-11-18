import type { Prisma } from "../../../prisma/generated/prisma";

const PROGRAM_SELECT = {
  id: true,
  startDate: true,
  endDate: true,
  programWorkouts: {
    select: {
      daysOfWeek: true,
      workout: { select: { id: true, name: true } },
    },
  },
} satisfies Prisma.ProgramSelect;

const USER_WORKOUT_SELECT = {
  dateCompleted: true,
  workoutId: true,
} satisfies Prisma.UserWorkoutSelect;

const USER_WORKOUT_DETAILS_SELECT = {
  dateCompleted: true,
  userWorkoutExercises: {
    select: {
      workoutExercise: {
        select: {
          exercise: {
            select: { id: true, name: true, muscles: { select: { name: true } } },
          },
        },
      },
      userStrengthSets: {
        select: { reps: true, weight: true, isCompleted: true },
      },
    },
  },
} satisfies Prisma.UserWorkoutSelect;

export const dashboardSQL = {
  PROGRAM_SELECT,
  USER_WORKOUT_SELECT,
  USER_WORKOUT_DETAILS_SELECT,
};
