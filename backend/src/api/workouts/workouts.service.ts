import { prisma } from "../../../prisma/prisma";

import { workoutUtil } from "./workout.util";
import { workoutSQL } from "./workout.sql";

import type { Prisma, Workout } from "../../../prisma/generated/prisma";
import type { IWorkout } from "./workouts.models";
import type {
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
  TWorkoutQuery,
} from "../../../../shared/validations/workout.validations";

const get = async (
  filter: TWorkoutQuery,
  userId: string
): Promise<IWorkout[]> => {
  const where: Prisma.WorkoutWhereInput = workoutUtil.buildWhereClause(
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
};
const getById = async (
  id: string,
  userId: string
): Promise<IWorkout | null> => {
  return prisma.workout.findUnique({
    where: { id, ownerId: userId },
    select: workoutSQL.WORKOUT_SELECT,
  }) as unknown as Promise<IWorkout>;
};
const create = async (dto: TCreateWorkoutInput): Promise<IWorkout> => {
  return prisma.workout.create({
    data: workoutSQL.getWorkoutCreate(dto, dto?.ownerId),
    select: workoutSQL.WORKOUT_SELECT,
  }) as unknown as Promise<IWorkout>;
};
const update = async (
  id: string,
  dto: TUpdateWorkoutInput
): Promise<IWorkout> => {
  return (await prisma.workout.update({
    where: { id },
    data: workoutSQL.getWorkoutUpdate(dto),
    select: workoutSQL.WORKOUT_SELECT,
  })) as unknown as Promise<IWorkout>;
};
const remove = async (id: string): Promise<Workout> => {
  return prisma.workout.delete({
    where: { id },
  });
};
export const workoutsService = { get, getById, create, update, remove };
