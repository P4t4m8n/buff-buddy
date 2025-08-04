import { DaysOfWeek, Prisma } from "../../../prisma/generated/prisma";
import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import { TCreateProgramWorkoutInput } from "../programWorkout/programWorkout.validations";
import { userSQL } from "../users/users.sql";
import { workoutSQL } from "../workouts/workout.sql";

import { TCreateProgramInput } from "./programs.validations";

const PROGRAM_WORKOUTS_SELECT: Prisma.ProgramWorkoutSelect = {
  id: true,
  daysOfWeek: true,
  workout: {
    select: workoutSQL.WORKOUT_SELECT,
  },
};

const PROGRAM_SELECT: Prisma.ProgramSelect = {
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
    select: userSQL.SMALL_USER_SELECT,
  },
  programWorkouts: {
    select: PROGRAM_WORKOUTS_SELECT,
  },
};

const getProgramWorkoutCreate = (
  dto: TCreateProgramWorkoutInput,
  userId: string
): Prisma.ProgramWorkoutCreateWithoutProgramInput => {
  const workoutCreateData: Prisma.WorkoutCreateInput = {
    name: dto.workout?.name ?? "Unnamed Workout",
    notes: dto.workout?.notes,
    owner: {
      connect: {
        id: userId,
      },
    },
    workoutExercises: {
      create: (dto.workout?.workoutExercises ?? []).map((we) => ({
        order: we.order ?? 1,
        notes: we.notes,
        exercise: {
          connect: {
            id: we.exerciseData.id,
          },
        },
        coreCardioSet: we.coreCardioSet
          ? {
              create: coreCardioSetsSQL.getCreateCoreSets(we.coreCardioSet),
            }
          : undefined,
        coreStrengthSet: we.coreStrengthSet
          ? {
              create: coreStrengthSetsSQL.getCreateCoreSets(we.coreStrengthSet),
            }
          : undefined,
      })),
    },
  };

  return {
    daysOfWeek: dto.daysOfWeek as DaysOfWeek[],
    workout: dto.workout?.id
      ? { connect: { id: dto.workout.id } }
      : { create: workoutCreateData },
  };
};

const getProgramCreate = (
  dto: TCreateProgramInput,
  userId: string
): Prisma.ProgramCreateInput => {
  return {
    name: dto.name,
    notes: dto.notes,
    isActive: dto.isActive,
    startDate: dto.startDate,
    endDate: dto.endDate,
    owner: {
      connect: { id: userId },
    },
    programWorkouts: {
      create: (dto.programWorkouts ?? []).map((w) =>
        getProgramWorkoutCreate(w, userId)
      ),
    },
  };
};

export const programsSQL = {
  PROGRAM_SELECT,
  PROGRAM_WORKOUTS_SELECT,
  getProgramCreate,
};
