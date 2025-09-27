import { prisma } from "../../../prisma/prisma";

import { foodItemSQL } from "./foodItem.sql";
import { foodItemUtil } from "./foodItem.util";

import type {
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery,
} from "../../../../shared/validations/foodItem.validation";
import type { Prisma } from "../../../prisma/generated/prisma";

const get = async (filter: TFoodItemQuery) => {
  const where: Prisma.FoodItemWhereInput =
    foodItemUtil.buildWhereClause(filter);

  const take = filter.take ?? 100;
  const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

  return prisma.foodItem.findMany({
    where,
    take,
    skip,
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const getById = async (id: string) => {
  return await prisma.foodItem.findUnique({
    where: {
      id,
    },
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const getByBarCode = async (barcode: string) => {
  return await prisma.foodItem.findUnique({
    where: {
      barcode,
    },
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const create = async (dto: TFoodItemCreateValidatedInput) => {
  return await prisma.foodItem.create({
    data: {
      ...foodItemSQL.getFoodItemCreate(dto),
    },
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const update = async (dto: TFoodItemUpdateValidatedInput) => {
  return await prisma.foodItem.update({
    where: {
      id: dto.id,
    },
    data: {
      ...foodItemSQL.getFoodItemUpdate(dto),
    },
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const remove = async (id: string) => {
  return await prisma.foodItem.delete({
    where: {
      id,
    },
  });
};
export const foodItemService = {
  get,
  getById,
  getByBarCode,
  create,
  update,
  remove,
};
