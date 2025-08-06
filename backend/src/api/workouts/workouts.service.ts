import { Prisma, Workout } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { IWorkout, IWorkoutFilter } from "./workouts.models";
import {
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
} from "./workouts.validations";
import { workoutUtils } from "./workout.utils";
import { workoutSQL } from "./workout.sql";

export const workoutsService = {
  get: async (filter: IWorkoutFilter, userId: string): Promise<IWorkout[]> => {
    const where: Prisma.WorkoutWhereInput = workoutUtils.buildWhereClause(
      filter,
      userId
    );

    const take = filter.take ? parseInt(filter.take.toString()) : 20;
    const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

    return (await prisma.workout.findMany({
      where,
      skip,
      take,
      select: workoutSQL.WORKOUT_SELECT,
    })) as unknown as Promise<IWorkout[]>;
  },
  getById: async (id: string, userId: string): Promise<IWorkout | null> => {
    return prisma.workout.findUnique({
      where: { id, ownerId: userId },
      select: workoutSQL.WORKOUT_SELECT,
    }) as unknown as Promise<IWorkout>;
  },
  create: async (dto: TCreateWorkoutInput): Promise<IWorkout> => {
    return prisma.workout.create({
      data: workoutSQL.getWorkoutCreate(dto, dto?.ownerId),
      select: workoutSQL.WORKOUT_SELECT,
    }) as unknown as Promise<IWorkout>;
  },
  update: async (id: string, dto: TUpdateWorkoutInput): Promise<IWorkout> => {
    return (await prisma.workout.update({
      where: { id },
      data: workoutSQL.getWorkoutUpdate(dto),
      select: workoutSQL.WORKOUT_SELECT,
    })) as unknown as Promise<IWorkout>;
  },
  delete: async (id: string): Promise<Workout> => {
    return prisma.workout.delete({
      where: { id },
    });
  },
};
