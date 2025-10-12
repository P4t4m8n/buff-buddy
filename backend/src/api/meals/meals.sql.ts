import { dbUtil } from "../../shared/utils/db.util";

import { foodItemSQL } from "../foodItems/foodItems.sql";
import { userSQL } from "../users/users.sql";

import type {
  TMealCreateValidatedInput,
  TMealUpdateValidatedInput,
} from "../../../../shared/validations/meal.validations";
import type { Prisma } from "../../../prisma/generated/prisma";

const MEALS_SELECT: Prisma.MealSelect = {
  id: true,
  name: true,
  notes: true,
  owner: { select: userSQL.SMALL_USER_SELECT },
  mealType: true,
  mealFoodItems: {
    select: {
      id: true,
      quantity: true,
      foodItem: {
        select: foodItemSQL.FOOD_ITEM_SQL,
      },
    },
  },
};

const getMealCreate = (dto: TMealCreateValidatedInput): Prisma.MealCreateInput => {
  return {
    name: dto.name,
    mealType: dto.mealType,
    notes: dto.notes,
    owner: {
      connect: {
        id: dto.ownerId,
      },
    },
    mealFoodItems: {
      create: dto.mealFoodItems.map((item) => ({
        quantity: item.quantity,
        foodItem: { connect: { id: item.foodItemId } },
      })),
    },
  };
};

const getMealUpdate = (dto: TMealUpdateValidatedInput): Prisma.MealUpdateInput => {
  const mealFoodItemToAdd =
    dto.mealFoodItems?.filter((item) => item.crudOperation === "create") ?? [];

  const mealFoodItemToUpdate =
    dto.mealFoodItems?.filter((item) => item.crudOperation === "update") ?? [];

  const mealFoodItemToDelete =
    dto.mealFoodItems?.filter((item) => item.crudOperation === "delete") ?? [];

  return {
    ...dbUtil.cleanData({
      name: dto.name,
      mealType: dto.mealType,
      notes: dto.notes,
    }),
    mealFoodItems: {
      create: mealFoodItemToAdd.map((item) => ({
        quantity: item.quantity,
        foodItem: { connect: { id: item.foodItemId } },
      })),
      update: mealFoodItemToUpdate.map((item) => ({
        where: { id: item.id },
        data: {
          ...dbUtil.cleanData({
            quantity: item.quantity,
          }),
          foodItem: { connect: { id: item.foodItemId } },
        },
      })),
      delete: mealFoodItemToDelete.map((item) => ({
        id: item.id,
      })),
    },
  };
};

export const mealSQL = {
  MEALS_SELECT,
  getMealCreate,
  getMealUpdate,
};
