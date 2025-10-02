import { prisma } from "../../../prisma/prisma";

import { exerciseSQL } from "./exercise.sql";
import { exerciseUtil } from "./exercise.util";

import type { Prisma } from "../../../prisma/generated/prisma";
import type {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
  TExerciseQuery,
} from "../../../../shared/validations/exercise.validation";
import type { IExercise } from "./exercises.models";

const get = (filter: TExerciseQuery): Promise<[IExercise[], number]> => {
  const where: Prisma.ExerciseWhereInput =
    exerciseUtil.buildWhereClause(filter);

  const take = filter.take ? parseInt(filter.take.toString()) : 10;
  const skip = (filter?.skip ?? 0) * take;

  return prisma.$transaction([
    prisma.exercise.findMany({
      where,
      skip,
      take,
      select: exerciseSQL.EXERCISE_SELECT,
    }),
    prisma.exercise.count({ where }),
  ]);
};
const getById = async (id: string): Promise<IExercise | null> => {
  return await prisma.exercise.findUnique({
    where: { id },
    select: exerciseSQL.EXERCISE_SELECT,
  });
};
const create = async (
  dto: TExerciseCreateValidatedInput
): Promise<IExercise> => {
  return await prisma.exercise.create({
    data: exerciseSQL.getExerciseCreate(dto),
    select: exerciseSQL.EXERCISE_SELECT,
  });
};
const update = async (
  id: string,
  dto: TExerciseUpdateValidatedInput
): Promise<IExercise> => {
  return await prisma.exercise.update({
    where: { id },
    data: exerciseSQL.getExerciseUpdate(dto),
  });
};
const remove = async (id: string): Promise<void> => {
  await prisma.exercise.delete({
    where: { id },
  });
};
export const exerciseService = {
  get,
  getById,
  create,
  update,
  remove,
};
