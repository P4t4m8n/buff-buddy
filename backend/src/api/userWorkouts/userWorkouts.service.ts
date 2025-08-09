import { TCreateUserWorkoutInput } from "../../../../shared/validations/userWorkout.validations";
import { prisma } from "../../../prisma/prisma";
import { IUserWorkout } from "./userWorkouts.model";
import { userWorkoutSql } from "./userWorkout.sql";

export const userWorkoutService = {
  create: async (dto: TCreateUserWorkoutInput): Promise<IUserWorkout> => {
    return (await prisma.userWorkout.create({
      data: userWorkoutSql.getCreateUserWork(dto),
      select: userWorkoutSql.USER_WORKOUT_SELECT,
    })) as unknown as IUserWorkout;
  },
  getLastUserWorkout: async (
    workoutId: string,
    userId: string
  ): Promise<IUserWorkout | null> => {
    return (await prisma.userWorkout.findFirst({
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
      take: 1,
      select: userWorkoutSql.USER_WORKOUT_SELECT,
    })) as unknown as IUserWorkout;
  },
};
