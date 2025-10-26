import { TUserMealQuery } from "../../../../shared/validations/userMeal.validation";
import { Prisma } from "../../../prisma/generated/prisma/client";

const buildWhereClause = (filter: TUserMealQuery) => {
  const where: Prisma.UserMealWhereInput = {};

  if (filter.ownerId) {
    where.ownerId = { equals: filter.ownerId };
  }

  if (filter.mealName) {
    where.meal = {
      name: { contains: filter.mealName, mode: "insensitive" },
    };
  }

  if (filter.dateConsumed) {
    where.dateConsumed = { equals: filter.dateConsumed };
  }

  return where;
};

const userMealUtil = {
  buildWhereClause,
};

export default userMealUtil;
