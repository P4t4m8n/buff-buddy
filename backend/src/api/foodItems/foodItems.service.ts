import { prisma } from "../../../prisma/prisma";

import { foodItemSQL } from "./foodItems.sql";
import { foodItemUtil } from "./foodItems.util";
import { dbUtil } from "../../shared/utils/db.util";

import type {
  TFoodItemCreateValidatedInput,
  TFoodItemUpdateValidatedInput,
  TFoodItemQuery,
} from "../../../../shared/validations/foodItem.validation";
import type { Prisma } from "../../../prisma/generated/prisma";
import type { IFoodItem, IFoodItemInfo } from "./foodItems.model";
import {
  IFoodItemInfoFilter,
  TFoodItemInfo,
} from "../../../../shared/models/foodItem.model";

const get = (filter: TFoodItemQuery): Promise<[IFoodItem[], number]> => {
  const where: Prisma.FoodItemWhereInput =
    foodItemUtil.buildWhereClause(filter);

  const { skip, take } = dbUtil.buildSkipTakeClause(filter);

  return prisma.$transaction([
    prisma.foodItem.findMany({
      where,
      skip,
      take,
      select: foodItemSQL.FOOD_ITEM_SQL,
    }),
    prisma.foodItem.count({ where }),
  ]);
};
const getById = (id: string): Promise<IFoodItem | null> => {
  return prisma.foodItem.findUnique({
    where: {
      id,
    },
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const getByBarCode = (barcode: string): Promise<IFoodItem | null> => {
  return prisma.foodItem.findUnique({
    where: {
      barcode,
    },
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const create = (dto: TFoodItemCreateValidatedInput): Promise<IFoodItem> => {
  console.log("🚀 ~ create ~ dto:", dto)
  return prisma.foodItem.create({
    data: foodItemSQL.getFoodItemCreate(dto),
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const update = (
  id: string,
  dto: TFoodItemUpdateValidatedInput
): Promise<IFoodItem> => {
  return prisma.foodItem.update({
    where: { id },
    data: foodItemSQL.getFoodItemUpdate(dto),
    select: foodItemSQL.FOOD_ITEM_SQL,
  });
};
const remove = (id: string): Promise<IFoodItem | void> => {
  return prisma.foodItem.delete({ where: { id } });
};
const getFoodItemInfo = (type: TFoodItemInfo, _: IFoodItemInfoFilter) => {
  switch (type) {
    case "brand":
      return prisma.$transaction([
        prisma.foodItemBrand.findMany({}),
        prisma.foodItemBrand.count({}),
      ]);
    case "categories":
      return prisma.$transaction([
        prisma.foodItemCategory.findMany({}),
        prisma.foodItemCategory.count({}),
      ]);
    case "labels":
      return prisma.$transaction([
        prisma.foodItemLabel.findMany({}),
        prisma.foodItemLabel.count({}),
      ]);

    default:
      throw new Error("Invalid food item info type");
  }
};
export const foodItemService = {
  get,
  getById,
  getByBarCode,
  create,
  update,
  remove,
  getFoodItemInfo,
};
