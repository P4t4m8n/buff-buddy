import type { TFoodItemQuery } from "../../../../shared/validations/foodItem.validation";
import type { Prisma } from "../../../prisma/generated/prisma";

export const foodItemUtil = {
  buildWhereClause(filter: TFoodItemQuery): Prisma.FoodItemWhereInput {
    const where: Prisma.FoodItemWhereInput = {};

    if (filter.name) {
      where.name = { contains: filter.name, mode: "insensitive" };
    }
    if (filter.barcode) {
      where.barcode = { contains: filter.barcode, mode: "insensitive" };
    }
    if (filter.calories) {
      where.calories = { equals: filter.calories };
    }
    if (filter.protein) {
      where.proteins = { equals: filter.protein };
    }

    return where;
  },
};
