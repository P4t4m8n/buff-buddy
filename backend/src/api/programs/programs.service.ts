import { prisma } from "../../../prisma/prisma";

import { workoutSQL } from "../workouts/workout.sql";
import { programsSQL } from "./program.sql";

import { dbUtil } from "../../shared/utils/db.util";
import { programsUtil } from "./programs.util";

import type {
  IProgram,
  IProgramFilter,
  IProgramWorkout,
} from "./programs.models";
import type { TCreateWorkoutInput } from "../../../../shared/validations/workout.validations";
import type {
  TCreateProgramInput,
  TUpdateProgramInput,
} from "../../../../shared/validations/program.validations";
import type {
  DaysOfWeek,
  Prisma,
  Program,
} from "../../../prisma/generated/prisma";

//TODO?? move to raw SQL for performance due to junction tables and reorganize of structure data

const get = async (
  filter: IProgramFilter,
  userId: string
): Promise<IProgram[]> => {
  const where: Prisma.ProgramWhereInput = programsUtil.buildWhereClause(
    filter,
    userId
  );

  const take = filter.take ?? 20;
  const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

  //TODO?? I have no idea hwy the type dont work
  return (await prisma.program.findMany({
    where,
    skip,
    take,
    select: programsSQL.PROGRAM_SELECT,
  })) as unknown as IProgram[];
};

const getById = async (
  id: string,
  userId: string
): Promise<IProgram | null> => {
  return (await prisma.program.findUnique({
    where: { id, ownerId: userId },
    select: programsSQL.PROGRAM_SELECT,
  })) as unknown as IProgram;
};

const create = async (
  dto: TCreateProgramInput,
  userId: string
): Promise<IProgram> => {
  return (await prisma.program.create({
    data: programsSQL.getProgramCreate(dto, userId),
    select: programsSQL.PROGRAM_SELECT,
  })) as unknown as IProgram;
};
//TODO?? moving to raw sql in the end, so lazy solution for now
const update = async (
  id: string,
  dto: TUpdateProgramInput,
  userId: string
): Promise<IProgram> => {
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

  return (await prisma.program.update({
    where: { id, ownerId: userId },
    data: {
      ...programData,
      programWorkouts: {
        delete: workoutsToDelete.map((wo) => ({ id: wo?.id! })),
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
    },
    select: programsSQL.PROGRAM_SELECT,
  })) as unknown as IProgram;
};

const remove = async (id: string): Promise<Program> => {
  return await prisma.program.delete({
    where: { id },
  });
};

const getProgramWorkout = async (
  workoutId: string
): Promise<IProgramWorkout | null> => {
  return prisma.programWorkout.findFirst({
    where: { workoutId },
    select: programsSQL.PROGRAM_WORKOUTS_SELECT,
  });
};

export const programsService = {
  get,
  getById,
  create,
  update,
  remove,
  getProgramWorkout,
};
