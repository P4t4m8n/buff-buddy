import { TMealQuery } from "../../../../shared/validations/meal.validations";
import { MealType, Prisma } from "../../../prisma/generated/prisma";

const buildWhereClause = (
  filter: TMealQuery,
): Prisma.MealWhereInput => {
  const where: Prisma.MealWhereInput = {};

  if (filter.name) {
    where.name = { contains: filter.name, mode: "insensitive" };
  }

  if (filter.mealType) {
    where.userMeals = {
      some: {
        meal: { mealType: { in: filter.mealType as unknown as MealType[] } }, //TS is fun
      },
    };
  }

  return where;
};

export const mealsUtil = {
  buildWhereClause,
};
