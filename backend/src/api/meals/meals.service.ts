import type { TMealQuery } from "../../../../shared/validations/meal.validations";
import { Prisma } from "../../../prisma/generated/prisma";
import { mealsUtil } from "./meals.util";
import { prisma } from "../../../prisma/prisma";
import { userSQL } from "../users/users.sql";

const getAll = async ({ filter }: { filter: TMealQuery }) => {
  const where = mealsUtil.buildWhereClause(filter);

  const take = filter.take ?? 100;
  const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

  return await prisma.meal.findMany({
    where,
    take,
    skip,
    select: {
      id: true,
      name: true,
      notes: true,
      owner: { select: userSQL.SMALL_USER_SELECT },
    },
  });
};

const getById = async (mealId: string) => {
  return prisma.meal.findUnique({
    where: { id: mealId },
    select: {
      id: true,
      name: true,
      notes: true,
      owner: { select: userSQL.SMALL_USER_SELECT },
    },
  });
};

export const mealsService = {
  getAll,
  getById,
};
