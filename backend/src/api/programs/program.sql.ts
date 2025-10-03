//Utils
import { userSQL } from "../users/users.sql";
import { workoutSQL } from "../workouts/workouts.sql";
import { dbUtil } from "../../shared/utils/db.util";
//Types
import type { DaysOfWeek, Prisma } from "../../../prisma/generated/prisma";
import type {
  TProgramCreateValidatedInput,
  TProgramUpdateValidatedInput,
} from "../../../../shared/validations/program.validations";
import type { TProgramWorkoutCreateValidatedInput } from "../../../../shared/validations/programWorkout.validations";
import type { TWorkoutCreateValidatedInput } from "../../../../shared/validations/workout.validations";

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
  return {
    daysOfWeek: dto.daysOfWeek as DaysOfWeek[],
    workoutLevel: dto.workoutLevel,
    workoutGoal: dto.workoutGoal,
    workout: _connectOrCreateWorkout({
      workout: dto?.workout as TWorkoutCreateValidatedInput,
      userId,
    }),
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
        workout: _connectOrCreateWorkout({
          workout: wo?.workout as TWorkoutCreateValidatedInput,
          userId,
        }),
      })),
      update: workoutsToUpdate.map((wo) => ({
        where: { id: wo?.id! },
        data: {
          daysOfWeek: wo?.daysOfWeek as DaysOfWeek[],
          workout: _connectOrCreateWorkout({
            workout: wo?.workout as TWorkoutCreateValidatedInput,
            userId,
          }),
        },
      })),
    },
  };
};

const _connectOrCreateWorkout = ({
  workout,
  userId,
}: {
  workout: TWorkoutCreateValidatedInput;
  userId?: string;
}) => {
  const { id: workoutId } = workout;
  return workoutId && !workoutId.startsWith("temp/")
    ? { connect: { id: workoutId } }
    : {
        create: workoutSQL.getWorkoutCreate(workout, userId),
      };
};

export const programsSQL = {
  SMALL_PROGRAM_SELECT,
  PROGRAM_SELECT,
  PROGRAM_WORKOUTS_SELECT,
  getProgramCreate,
  getProgramUpdate,
};
