import { prisma } from "../../../prisma/prisma";

import { userWorkoutSql } from "./userWorkout.sql";

import type { IUserWorkout } from "./userWorkouts.model";
import type { TCreateUserWorkoutInput } from "../../../../shared/validations/userWorkout.validations";

const getLastUserWorkouts = async (
  workoutId: string,
  userId: string
): Promise<IUserWorkout[]> => {
  return await prisma.userWorkout.findMany({
    where: {
      workoutId,
      ownerId: userId,
      dateCompleted: {
        not: null,
      },
    },
    orderBy: {
      dateCompleted: "desc",
    },
    take: 7,
    select: userWorkoutSql.USER_WORKOUT_SELECT,
  });
};
const create = async (dto: TCreateUserWorkoutInput): Promise<IUserWorkout> => {
  return (await prisma.userWorkout.create({
    data: userWorkoutSql.getCreateUserWork(dto),
    select: userWorkoutSql.USER_WORKOUT_SELECT,
  })) as unknown as IUserWorkout;
};
const remove = async (id: string) => {
  return await prisma.userWorkout.delete({
    where: { id },
  });
};

export const userWorkoutService = {
  getLastUserWorkouts,
  create,
  remove,
};
