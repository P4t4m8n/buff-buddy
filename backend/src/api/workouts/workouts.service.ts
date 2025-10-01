import { prisma } from "../../../prisma/prisma";

import { workoutUtil } from "./workouts.util";
import { workoutSQL } from "./workouts.sql";

import type { Prisma } from "../../../prisma/generated/prisma";
import type { IWorkout } from "./workouts.models";
import type {
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
  TWorkoutQuery,
} from "../../../../shared/validations/workout.validations";
import type { IApiService, TGetReturn } from "../../shared/models/server.model";

const get = (
  filter: TWorkoutQuery,
  userId?: string
): Promise<TGetReturn<IWorkout>> => {
  const where: Prisma.WorkoutWhereInput = workoutUtil.buildWhereClause(
    filter,
    userId
  );

  const take = filter.take ? parseInt(filter.take.toString()) : 10;
  const skip = (filter?.skip ?? 0) * take;

  return prisma.$transaction([
    prisma.workout.findMany({
      where,
      skip,
      take,
      orderBy: { name: "asc" },
      select: workoutSQL.WORKOUT_SELECT,
    }),
    prisma.workout.count({ where }),
  ]);
};
const getById = async (id: string): Promise<IWorkout | null> => {
  return prisma.workout.findUnique({
    where: { id },
    select: workoutSQL.WORKOUT_SELECT,
  });
};
const create = async (dto: TWorkoutCreateValidatedInput): Promise<IWorkout> => {
  return prisma.workout.create({
    data: workoutSQL.getWorkoutCreate(dto, dto?.ownerId),
    select: workoutSQL.WORKOUT_SELECT,
  });
};
const update = async (
  id: string,
  dto: TWorkoutUpdateValidatedInput
): Promise<IWorkout> => {
  return await prisma.workout.update({
    where: { id },
    data: workoutSQL.getWorkoutUpdate(dto),
    select: workoutSQL.WORKOUT_SELECT,
  });
};
const remove = async (id: string): Promise<void | null | IWorkout> => {
  return prisma.workout.delete({
    where: { id },
  });
};
export const workoutsService: IApiService<
  IWorkout,
  TWorkoutCreateValidatedInput,
  TWorkoutUpdateValidatedInput,
  TWorkoutQuery
> = { get, getById, create, update, remove };
