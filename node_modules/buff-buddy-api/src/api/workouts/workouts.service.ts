import { connect } from "http2";
import { Prisma, Workout } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { IWorkoutFilter } from "./workouts.models";
import { CreateWorkoutInput } from "./workouts.validations";

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
        workoutSets: {
          include: {
            userSet: true,
            coreSet: true,
          },
        },
        program: true,
      },
    });
  },
  getById: async (id: string): Promise<Workout | null> => {
    return prisma.workout.findUnique({
      where: { id },
      include: {
        workoutSets: {
          include: {
            userSet: true,
            coreSet: true,
          },
        },
        program: true,
      },
    });
  },
  create: async (dto: CreateWorkoutInput, userId: string): Promise<Workout> => {
    return prisma.workout.create({
      data: {
        date: dto.date,
        program: {
          connect: {
            id: dto.programId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        workoutSets: {
          create: dto.workoutSets.map((set) => ({
            userSet: {
              create: {
                reps: set.reps,
                weight: set.weight,
                restTime: set.restTime,
                isBodyWeight: set.isBodyWeight,
                isCompleted: set.isCompleted,
                isMuscleFailure: set.isMuscleFailure,
                isJointPain: set.isJointPain,
                coreSet: {
                  connect: {
                    id: set.coreSetId,
                  },
                },
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            },
            coreSet: {
              connect: {
                id: set.coreSetId,
              },
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
    return prisma.workout.update({
      where: { id },
      data: {
        date: dto.date,
        program: {
          connect: {
            id: dto.programId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
        workoutSets: {
          deleteMany: {},
          create: dto.workoutSets.map((set) => ({
            userSet: {
              create: {
                reps: set.reps,
                weight: set.weight,
                restTime: set.restTime,
                isBodyWeight: set.isBodyWeight,
                isCompleted: set.isCompleted,
                isMuscleFailure: set.isMuscleFailure,
                isJointPain: set.isJointPain,
                coreSet: {
                  connect: {
                    id: set.coreSetId,
                  },
                },
                user: {
                  connect: {
                    id: userId,
                  },
                },
              },
            },
            coreSet: {
              connect: {
                id: set.coreSetId,
              },
            },
          })),
        },
      },
      include: {
        workoutSets: {
          include: {
            userSet: true,
            coreSet: true,
          },
        },
        program: true,
      },
    });
  },
  delete: async (id: string): Promise<Workout> => {
    return prisma.workout.delete({
      where: { id },
      include: {
        workoutSets: {
          include: {
            userSet: true,
            coreSet: true,
          },
        },
        program: true,
      },
    });
  },
};
