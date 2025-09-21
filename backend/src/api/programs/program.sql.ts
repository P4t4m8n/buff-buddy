import { userSQL } from "../users/users.sql";
import { workoutSQL } from "../workouts/workout.sql";

import type { DaysOfWeek, Prisma } from "../../../prisma/generated/prisma";
import type {
  TCreateProgramInput,
  TUpdateProgramInput,
} from "../../../../shared/validations/program.validations";
import type { TCreateProgramWorkoutInput } from "../../../../shared/validations/programWorkout.validations";
import { dbUtil } from "../../shared/utils/db.util";
import { TCreateWorkoutInput } from "../../../../shared/validations/workout.validations";

const PROGRAM_WORKOUTS_SELECT: Prisma.ProgramWorkoutSelect = {
  id: true,
  daysOfWeek: true,
  level: true,
  workoutGoal: true,
  workout: {
    select: workoutSQL.WORKOUT_SELECT,
  },
  programId: true,
};

const SMALL_PROGRAM_SELECT: Prisma.ProgramSelect = {
  id: true,
  name: true,
  notes: true,
  isActive: true,
  startDate: true,
  endDate: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
};
const PROGRAM_SELECT = {
  ...SMALL_PROGRAM_SELECT,
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
            id: we.exerciseData?.id,
          },
        },
      })),
    },
  };

  return {
    daysOfWeek: dto.daysOfWeek as DaysOfWeek[],
    level: dto.level,
    workoutGoal: dto.workoutGoal,
    workout:
      dto.workout?.id && !dto.workout.id.startsWith("temp/")
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

const getProgramUpdate = ({
  dto,
  userId,
}: {
  dto: TUpdateProgramInput;
  userId: string;
}) => {
  const programData = dbUtil.cleanData({
    name: dto.name,
    notes: dto.notes,
    isActive: dto.isActive,
    startDate: dto.startDate,
    endDate: dto.endDate,
  });

  const workoutsToCreate =
    dto.programWorkouts?.filter((wo) => wo?.crudOperation === "create") ?? [];

  const workoutsToUpdate =
    dto.programWorkouts?.filter((wo) => wo?.crudOperation === "update") ?? [];

  const workoutsToDelete =
    dto.programWorkouts?.filter((wo) => wo?.crudOperation === "delete") ?? [];
  return {
    ...programData,
    programWorkouts: {
      delete: workoutsToDelete.map((wo) => ({ id: wo?.id })),

      create: workoutsToCreate.map((wo) => ({
        daysOfWeek: wo?.daysOfWeek as DaysOfWeek[],
        workout: {
          connectOrCreate: {
            where: { id: wo?.workout?.id },
            create: workoutSQL.getWorkoutCreate(
              wo?.workout as TCreateWorkoutInput,
              userId
            ),
          },
        },
      })),
      update: workoutsToUpdate.map((wo) => ({
        where: { id: wo?.id! },
        data: {
          daysOfWeek: wo?.daysOfWeek as DaysOfWeek[],
          workout: {
            connectOrCreate: {
              where: { id: wo?.workout?.id },
              create: workoutSQL.getWorkoutCreate(
                wo?.workout as TCreateWorkoutInput,
                userId
              ),
            },
          },
        },
      })),
    },
  };
};

export const programsSQL = {
  SMALL_PROGRAM_SELECT,
  PROGRAM_SELECT,
  PROGRAM_WORKOUTS_SELECT,
  getProgramCreate,
  getProgramUpdate,
};
