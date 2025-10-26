//Lib
import { prisma } from "../../../prisma/prisma";
//Utils
import { dbUtil } from "../../shared/utils/db.util";
import userMealSQL from "./userMeal.sql";
import userMealUtil from "./userMealUtil";
//Types
import type { IUserMeal } from "./userMeal.model";
import type {
  TUserMealQuery,
  TUserMealCreateValidatedInput,
  TUserMealUpdateValidatedInput,
} from "../../../../shared/validations/userMeal.validation";

const get = (filter: TUserMealQuery): Promise<[IUserMeal[], number]> => {
  const where = userMealUtil.buildWhereClause(filter);

  const { skip, take } = dbUtil.buildSkipTakeClause(filter);

  return prisma.$transaction([
    prisma.userMeal.findMany({
      where,
      skip,
      take,
      select: userMealSQL.USER_MEAL_SELECT,
    }),
    prisma.userMeal.count({ where }),
  ]);
};

const getById = (id: string): Promise<IUserMeal | null> => {
  return prisma.meal.findUnique({
    where: { id },
    select: userMealSQL.USER_MEAL_SELECT,
  });
};

const create = (dto: TUserMealCreateValidatedInput): Promise<IUserMeal> => {
  return prisma.userMeal.create({
    data: userMealSQL.getUserMealCreate(dto),
    select: userMealSQL.USER_MEAL_SELECT,
  });
};

const update = (
  id: string,
  dto: TUserMealUpdateValidatedInput
): Promise<IUserMeal> => {
  return prisma.meal.update({
    where: { id },
    data: userMealSQL.getMealUpdate(dto),
    select: userMealSQL.USER_MEAL_SELECT,
  });
};

const remove = (id: string, ownerId?: string): Promise<IUserMeal | void> => {
  return prisma.userMeal.delete({
    where: { id, ownerId },
  });
};

const userMealService = {
  get,
  create,
  update,
  remove,
  getById,
};

export default userMealService;
