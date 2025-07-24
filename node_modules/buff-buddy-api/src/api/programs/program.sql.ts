import { Prisma } from "../../../prisma/generated/prisma";
import { WORKOUT_SELECT } from "../workouts/workout.sql";

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
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
  programWorkouts: {
    select: {
      daysOfWeek: true,
      id: true,
      workout: {
        select: WORKOUT_SELECT,
      },
    },
  },
};
