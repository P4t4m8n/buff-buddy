//Lib
import { prisma } from "../../../prisma/prisma";
//Utils
import { mealsUtil } from "./meals.util";
import { mealSQL } from "./meals.sql";
import { dbUtil } from "../../shared/utils/db.util";
//Types
import type {
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
  TMealQuery,
} from "../../../../shared/validations/meal.validations";
import type { IMeal } from "./meals.model";

const get = (filter: TMealQuery): Promise<[IMeal[], number]> => {
  const where = mealsUtil.buildWhereClause(filter);

  const { skip, take } = dbUtil.buildSkipTakeClause(filter);

  return prisma.$transaction([
    prisma.meal.findMany({
      where,
      skip,
      take,
      select: mealSQL.MEALS_SELECT,
    }),
    prisma.meal.count({ where }),
  ]);
};

const getById = (id: string): Promise<IMeal | null> => {
  return prisma.meal.findUnique({
    where: { id },
    select: mealSQL.MEALS_SELECT,
  });
};

const create = (dto: TMealCreateValidatedInput): Promise<IMeal> => {
  return prisma.meal.create({
    data: mealSQL.getMealCreate(dto),
    select: mealSQL.MEALS_SELECT,
  });
};

const update = (id: string, dto: TMealUpdateValidatedInput): Promise<IMeal> => {
  return prisma.meal.update({
    where: { id },
    data: mealSQL.getMealUpdate(dto),
    select: mealSQL.MEALS_SELECT,
  });
};

const remove = (id: string, ownerId?: string): Promise<IMeal | void> => {
  return prisma.meal.delete({
    where: { id, ownerId },
  });
};

export const mealService = {
  get,
  getById,
  create,
  update,
  remove,
};
