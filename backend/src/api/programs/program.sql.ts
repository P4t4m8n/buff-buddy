import { userSQL } from "../users/users.sql";
import { workoutSQL } from "../workouts/workouts.sql";

import type { DaysOfWeek, Prisma } from "../../../prisma/generated/prisma";
import type {
  TProgramCreateValidatedInput,
  TProgramUpdateValidatedInput,
} from "../../../../shared/validations/program.validations";
import type { TProgramWorkoutCreateValidatedInput } from "../../../../shared/validations/programWorkout.validations";
import { dbUtil } from "../../shared/utils/db.util";
import { TWorkoutCreateValidatedInput } from "../../../../shared/validations/workout.validations";

const PROGRAM_WORKOUTS_SELECT: Prisma.ProgramWorkoutSelect = {
  id: true,
  daysOfWeek: true,
  workoutLevel: true,
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
  dto: TProgramWorkoutCreateValidatedInput,
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
    workoutLevel: dto.workoutLevel,
    workoutGoal: dto.workoutGoal,
    workout:
      dto.workout?.id && !dto.workout.id.startsWith("temp/")
        ? { connect: { id: dto.workout.id } }
        : { create: workoutCreateData },
  };
};

const getProgramCreate = (
  dto: TProgramCreateValidatedInput
): Prisma.ProgramCreateInput => {
  return {
    name: dto.name,
    notes: dto.notes,
    isActive: dto.isActive,
    startDate: dto.startDate,
    endDate: dto.endDate,
    owner: {
      connect: { id: dto.ownerId! },
    },
    programWorkouts: {
      create: (dto.programWorkouts ?? []).map((w) =>
        getProgramWorkoutCreate(w, dto.ownerId!)
      ),
    },
  };
};

const getProgramUpdate = ({
  dto,
  userId,
}: {
  dto: TProgramUpdateValidatedInput;
  userId?: string;
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
              wo?.workout as TWorkoutCreateValidatedInput,
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
                wo?.workout as TWorkoutCreateValidatedInput,
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
