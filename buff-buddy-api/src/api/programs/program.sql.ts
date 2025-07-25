import { Prisma } from "../../../prisma/generated/prisma";
import { SMALL_USER_SELECT } from "../users/users.sql";
import { WORKOUT_SELECT } from "../workouts/workout.sql";

const PROGRAM_WORKOUTS_SELECT: Prisma.ProgramWorkoutSelect = {
  id: true,
  daysOfWeek: true,
  workout: {
    select: WORKOUT_SELECT,
  },
};

export const PROGRAM_SELECT: Prisma.ProgramSelect = {
  id: true,
  name: true,
  notes: true,
  isActive: true,
  startDate: true,
  endDate: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: SMALL_USER_SELECT,
  },
  programWorkouts: {
    select: PROGRAM_WORKOUTS_SELECT,
  },
};
