import {
  TUserMealCreateValidatedInput,
  TUserMealUpdateValidatedInput,
} from "../../../../shared/validations/userMeal.validation";
import { Prisma } from "../../../prisma/generated/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import { foodItemSQL } from "../foodItems/foodItems.sql";

const USER_MEAL_SELECT = {
  id: true,
  dateConsumed: true,
  notes: true,
  meal: {
    select: {
      id: true,
      name: true,
      mealType: true,
      images: {
        where: { isPrimary: true },
        select: {
          id: true,
          url: true,
          description: true,
          altText: true,
          isPrimary: true,
          publicId: true,
        },
      },
    },
  },
  userMealItems: {
    select: {
      id: true,
      quantity: true,
      foodItem: {
        select: foodItemSQL.FOOD_ITEM_SQL,
      },
    },
  },
};

const getUserMealCreate = (dto: TUserMealCreateValidatedInput) => {
  return {
    meal: {
      connect: { id: dto.mealId },
    },
    owner: {
      connect: { id: dto.ownerId },
    },
    notes: dto.notes,
    userMealItems: {
      create: dto.userMealItems.map((foodItem) => ({
        foodItem: {
          connect: { id: foodItem.foodItemId },
        },
        quantity: foodItem.quantity,
      })),
    },
  };
};

const getMealUpdate = (
  dto: TUserMealUpdateValidatedInput
): Prisma.UserMealUpdateInput => {
  const mealFoodItemToAdd =
    dto.userMealItems?.filter((item) => item.crudOperation === "create") ?? [];

  const mealFoodItemToUpdate =
    dto.userMealItems?.filter((item) => item.crudOperation === "update") ?? [];

  const mealFoodItemToDelete =
    dto.userMealItems?.filter((item) => item.crudOperation === "delete") ?? [];

  return {
    ...dbUtil.cleanData({
      notes: dto.notes,
      meal: {
        connect: { id: dto.mealId },
      },
      owner: {
        connect: { id: dto.ownerId },
      },
    }),
    userMealItems: {
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

const userMealSQL = {
  USER_MEAL_SELECT,
  getUserMealCreate,
  getMealUpdate,
};

export default userMealSQL;
