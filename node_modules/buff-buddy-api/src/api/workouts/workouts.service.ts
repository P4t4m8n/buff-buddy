import { Prisma, Workout } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { IWorkoutFilter } from "./workouts.models";
import { CreateWorkoutInput } from "./workouts.validations";
import { dbUtil } from "../../shared/utils/db.util";

export const workoutsService = {
  get: async (filter: IWorkoutFilter): Promise<Workout[]> => {
    const where: Prisma.WorkoutWhereInput = {};

    const take = filter.take ?? 20;
    const skip =
      filter.skip ??
      (filter.page && filter.page > 1 ? (filter.page - 1) * take : 0);

    return prisma.workout.findMany({
      where,
      skip,
      take,
      include: {
        workoutExercises: {
          include: {
            exercise: true,
            coreSets: true,
          },
        },
      },
    });
  },
  getById: async (id: string): Promise<Workout | null> => {
    return prisma.workout.findUnique({
      where: { id },
      include: {
        workoutExercises: true,
      },
    });
  },
  create: async (dto: CreateWorkoutInput, userId: string): Promise<Workout> => {
    return prisma.workout.create({
      data: {
        name: dto.name,
        user: {
          connect: {
            id: userId,
          },
        },
        workoutExercises: {
          create: dto.workoutExercises.map((we) => ({
            order: we.order,
            notes: we.notes,
            exercise: {
              connect: {
                id: we.exerciseId,
              },
            },
            coreSets: {
              create: we.coreSets.map((cs) => ({
                order: cs.order,
                reps: cs.reps,
                weight: cs.weight,
                restTime: cs.restTime,
                isBodyWeight: cs.isBodyWeight,
                isWarmup: cs.isWarmup,
                repsInReserve: cs.repsInReserve,
              })),
            },
          })),
        },
      },
    });
  },
  update: async (
    id: string,
    dto: CreateWorkoutInput,
    userId: string
  ): Promise<Workout> => {
    const workoutData = dbUtil.cleanData({
      notes: dto.notes,
      userId: userId,
      name: dto.name,
      daysOfWeek: dto.daysOfWeek,
    });
    return prisma.workout.update({
      where: { id },
      data: {
        ...workoutData,
        workoutExercises: {
          upsert: dto.workoutExercises.map((we) => ({
            where: { id: we.id ?? "test-we" },
            update: {
              ...dbUtil.cleanData({
                order: we.order,
                notes: we.notes,
                isActive: we.isActive,
              }),
              exerciseId: we.exerciseId,
              coreSets: {
                upsert: we.coreSets.map((cs) => ({
                  where: { id: cs.id ?? "test-cs" },
                  update: {
                    // Clean coreSet data
                    ...dbUtil.cleanData({
                      reps: cs.reps,
                      weight: cs.weight,
                      restTime: cs.restTime,
                      order: cs.order,
                      isWarmup: cs.isWarmup,
                      isBodyWeight: cs.isBodyWeight,
                      repsInReserve: cs.repsInReserve,
                    }),
                  },
                  create: {
                    reps: cs.reps,
                    weight: cs.weight,
                    restTime: cs.restTime,
                    order: cs.order,
                    isBodyWeight: cs.isBodyWeight,
                    isWarmup: cs.isWarmup,
                    repsInReserve: cs.repsInReserve,
                  },
                })),
                deleteMany: we.coreSets
                  .filter((cs) => cs.crudOperation === "delete")
                  .map((cs) => ({ id: cs.id })),
              },
            },
            create: {
              order: we.order,
              notes: we.notes,
              isActive: we.isActive,
              exerciseId: we.exerciseId,
              coreSets: {
                create: we.coreSets.map((cs) => ({
                  reps: cs.reps,
                  weight: cs.weight,
                  restTime: cs.restTime,
                  isBodyWeight: cs.isBodyWeight,
                  order: cs.order,
                  isWarmup: cs.isWarmup,
                  repsInReserve: cs.repsInReserve,
                })),
              },
            },
          })),
          deleteMany: (dto.workoutExercises ?? [])
            .filter((we) => we.crudOperation === "delete")
            .map((we) => ({ id: we.id })),
        },
      },
      include: {},
    });
  },
  delete: async (id: string): Promise<Workout> => {
    return prisma.workout.delete({
      where: { id },
    });
  },
};
