import {
  TCreateFoodItemInput,
  TUpdateFoodItemInput,
  TFoodItemQuery,
} from "../../../../shared/validations/foodItem.validation";
import { Prisma } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { foodItemSQL } from "./foodItem.sql";
import { foodItemUtil } from "./foodItem.util";

export const foodItemService = {
  getAll: async (filter: TFoodItemQuery) => {
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
  },
  getById: async (id: string) => {
    return await prisma.foodItem.findUnique({
      where: {
        id,
      },
      select: foodItemSQL.FOOD_ITEM_SQL,
    });
  },
  getByBarCode: async (barcode: string) => {
    return await prisma.foodItem.findUnique({
      where: {
        barcode,
      },
      select: foodItemSQL.FOOD_ITEM_SQL,
    });
  },
  create: async (dto: TCreateFoodItemInput) => {
    return await prisma.foodItem.create({
      data: {
        ...foodItemSQL.getFoodItemCreate(dto),
      },
      select: foodItemSQL.FOOD_ITEM_SQL,
    });
  },
  update: async (dto: TUpdateFoodItemInput) => {
    return await prisma.foodItem.update({
      where: {
        id: dto.id,
      },
      data: {
        ...foodItemSQL.getFoodItemUpdate(dto),
      },
      select: foodItemSQL.FOOD_ITEM_SQL,
    });
  },
  delete: async (id: string) => {
    return await prisma.foodItem.delete({
      where: {
        id,
      },
    });
  },
};
