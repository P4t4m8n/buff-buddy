import { prisma } from "../../../prisma/prisma";

import { programsSQL } from "./program.sql";

import { programsUtil } from "./programs.util";

import type { IProgram, IProgramWorkout } from "./programs.models";
import type {
  TProgramCreateValidatedInput,
  TProgramUpdateValidatedInput,
  TProgramQuery,
} from "../../../../shared/validations/program.validations";
import type { Prisma } from "../../../prisma/generated/prisma";
import type { TGetReturn } from "../../shared/models/server.model";

const get = (
  filter: TProgramQuery,
  userId?: string
): Promise<TGetReturn<IProgram>> => {
  const where: Prisma.ProgramWhereInput = programsUtil.buildWhereClause(
    filter,
    userId
  );
  console.log("🚀 ~ get ~ where:", where)

  const take = filter.take ? parseInt(filter.take.toString()) : 10;
  const skip = (filter?.skip ?? 0) * take;

  return prisma.$transaction([
    prisma.program.findMany({
      where,
      skip,
      take,
      select: programsSQL.PROGRAM_SELECT,
    }),
    prisma.program.count({ where }),
  ]);
};

const getById = async (
  id: string,
  userId?: string
): Promise<IProgram | null> => {
  return await prisma.program.findUnique({
    where: { id },
    select: programsSQL.PROGRAM_SELECT,
  });
};

const create = async (
  dto: TProgramCreateValidatedInput,
  userId?: string
): Promise<IProgram> => {
  return (await prisma.program.create({
    data: programsSQL.getProgramCreate(dto),
    select: programsSQL.PROGRAM_SELECT,
  })) as unknown as IProgram;
};
const update = async (
  id: string,
  dto: TProgramUpdateValidatedInput
): Promise<IProgram> => {
  return await prisma.program.update({
    where: { id },
    data: programsSQL.getProgramUpdate({ dto, userId: dto.ownerId! }),
    select: programsSQL.PROGRAM_SELECT,
  });
};

const remove = async (id: string): Promise<null | void> => {
  await prisma.program.delete({
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
