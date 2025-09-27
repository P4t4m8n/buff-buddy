import { prisma } from "../../../prisma/prisma";

import { mealsUtil } from "./meals.util";
import { mealsSQL } from "./meals.sql";

import type { IMealDTO } from "../../../../shared/models/meal.model";
import type {
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
  TMealQuery,
} from "../../../../shared/validations/meal.validations";
import type { Meal } from "../../../prisma/generated/prisma";

const get = async ({ filter }: { filter: TMealQuery }) => {
  const where = mealsUtil.buildWhereClause(filter);

  const take = filter.take ?? 100;
  const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

  return await prisma.meal.findMany({
    where,
    take,
    skip,
    select: mealsSQL.MEALS_SELECT,
  });
};

const getById = async (mealId: string) => {
  return await prisma.meal.findUnique({
    where: { id: mealId },
    select: mealsSQL.MEALS_SELECT,
  });
};

const create = async (dto: TMealCreateValidatedInput): Promise<IMealDTO> => {
  return await prisma.meal.create({
    data: mealsSQL.getMealCreate(dto),
    select: mealsSQL.MEALS_SELECT,
  });
};

const update = async (dto: TMealUpdateValidatedInput): Promise<IMealDTO> => {
  return await prisma.meal.update({
    where: { id: dto.id },
    data: mealsSQL.getMealUpdate(dto),
    select: mealsSQL.MEALS_SELECT,
  });
};

const remove = async (mealId: string): Promise<Meal> => {
  return await prisma.meal.delete({
    where: { id: mealId },
  });
};

export const mealsService = {
  get,
  getById,
  create,
  update,
  remove,
};
