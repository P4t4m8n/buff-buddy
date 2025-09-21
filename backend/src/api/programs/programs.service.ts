import { prisma } from "../../../prisma/prisma";

import { programsSQL } from "./program.sql";

import { programsUtil } from "./programs.util";

import type {
  IProgram,
  IProgramFilter,
  IProgramWorkout,
} from "./programs.models";
import type {
  TCreateProgramInput,
  TUpdateProgramInput,
} from "../../../../shared/validations/program.validations";
import type { Prisma, Program } from "../../../prisma/generated/prisma";

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

  return await prisma.program.findMany({
    where,
    skip,
    take,
    select: programsSQL.PROGRAM_SELECT,
  });
};

const getById = async (
  id: string,
  userId: string
): Promise<IProgram | null> => {
  return await prisma.program.findUnique({
    where: { id, ownerId: userId },
    select: programsSQL.PROGRAM_SELECT,
  });
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
  return await prisma.program.update({
    where: { id, ownerId: userId },
    data: programsSQL.getProgramUpdate({ dto, userId }),
    select: programsSQL.PROGRAM_SELECT,
  });
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
