import {
  TCreateFoodItemInput,
  TUpdateFoodItemInput,
} from "../../../../shared/validations/foodItem.validation";
import { Prisma } from "../../../prisma/generated/prisma";
import { dbUtil } from "../../shared/utils/db.util";

const FOOD_ITEM_SQL: Prisma.FoodItemSelect = {
  id: true,
  barcode: true,
  name: true,
  servingSize: true,
  calories: true,
  proteins: true,
  carbohydrates: true,
  sugars: true,
  fat: true,
  saturatedFat: true,
  fiber: true,
  salt: true,
  cholesterol: true,
  brand: true,
  categories: true,
  labels: true,
  images: true,
};

const getFoodItemCreate = (
  dto: TCreateFoodItemInput
): Prisma.FoodItemCreateInput => {
  const baseInput: Prisma.FoodItemCreateInput = {
    name: dto.name,
    barcode: dto.barcode,
    calories: dto.calories,
    proteins: dto.proteins,
    carbohydrates: dto.carbohydrates ?? 0,
    fat: dto.fat,
    fiber: dto.fiber,
    sugars: dto.sugars,
    salt: dto.salt,
    cholesterol: dto.cholesterol,
  };

  if (dto.images?.length) {
    baseInput.images = {
      connectOrCreate: dto.images.map((url) => ({
        where: { url },
        create: { url, createdAt: new Date() },
      })),
    };
  }
  if (dto.labels?.length) {
    baseInput.labels = {
      connectOrCreate: (dto?.labels ?? []).map(({ name }) => ({
        where: { name },
        create: { name, createdAt: new Date() },
      })),
    };
  }

  if (dto.brand) {
    baseInput.brand = {
      connectOrCreate: {
        where: { name: dto.brand[0].name },
        create: { name: dto.brand[0].name, createdAt: new Date() },
      },
    };
  }

  if (dto.categories?.length) {
    baseInput.categories = {
      connectOrCreate: (dto?.categories ?? []).map(({ name }) => ({
        where: { name },
        create: { name, createdAt: new Date() },
      })),
    };
  }

  return baseInput;
};

const getFoodItemUpdate = (
  dto: TUpdateFoodItemInput
): Prisma.FoodItemUpdateInput => {
  return dbUtil.cleanData({ ...dto }) as Prisma.FoodItemUpdateInput;
};

export const foodItemSQL = {
  FOOD_ITEM_SQL,
  getFoodItemCreate,
  getFoodItemUpdate,
};
