import { Prisma, Program } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import { programSelect } from "./program.sql";
import { IProgramFilter, IProgramWithRelations } from "./programs.models";
import { CreateProgramInput, UpdateProgramInput } from "./programs.validations";

//TODO?? move to raw SQL for performance due to junction tables and reorganize of structure data
export const programsService = {
  getAll: async (filter: IProgramFilter): Promise<IProgramWithRelations[]> => {
    const where: Prisma.ProgramWhereInput = buildWhereClause(filter);

    const take = filter.take ?? 20;
    const skip =
      filter.skip ??
      (filter.page && filter.page > 1 ? (filter.page - 1) * take : 0);

    return await prisma.program.findMany({
      where,
      skip,
      take,
      select: programSelect,
    });
  },

  getById: async (id: string): Promise<IProgramWithRelations | null> => {
    return await prisma.program.findUnique({
      where: { id },
      select: programSelect,
    });
  },

  create: async (
    dto: CreateProgramInput,
    userId: string
  ): Promise<IProgramWithRelations> => {
    return await prisma.program.create({
      data: {
        name: dto.name,
        notes: dto.notes,
        isActive: dto.isActive,
        startDate: dto.startDate,
        endDate: dto.endDate,
        owner: {
          connect: { id: userId },
        },
        programWorkouts: {
          create: (dto.workouts ?? []).map((w) => ({
            workout: {
              connectOrCreate: {
                where: { id: w?.id },
                create: {
                  name: w?.name ?? dto.name,
                  user: {
                    connect: {
                      id: userId,
                    },
                  },
                  workoutExercises: {
                    create: (w?.workoutExercises ?? []).map((we) => ({
                      order: we.order || 1,
                      notes: we.notes,
                      exercise: {
                        connect: {
                          id: we.exerciseId,
                        },
                      },
                      coreSets: {
                        create: (we.coreSets ?? []).map((cs) => ({
                          order: cs.order || 1,
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
              },
            },
            daysOfWeek: w.daysOfWeek,
          })),
        },
      },
      select: programSelect,
    });
  },

  update: async (
    id: string,
    dto: UpdateProgramInput,
    userId: string
  ): Promise<IProgramWithRelations> => {
    const programData = dbUtil.cleanData({
      name: dto.name,
      notes: dto.notes,
      isActive: dto.isActive,
      startDate: dto.startDate,
      endDate: dto.endDate,
    });
    return await prisma.program.update({
      where: { id },
      data: {
        ...programData,
        owner: {
          connect: { id: userId },
        },
        programWorkouts: {
       
        },
      },
      select: programSelect,
    });
  },

  delete: async (id: string): Promise<Program> => {
    return await prisma.program.delete({
      where: { id },
    });
  },
};

const buildWhereClause = (filter: IProgramFilter): Prisma.ProgramWhereInput => {
  const where: Prisma.ProgramWhereInput = {};

  if (filter.name) {
    where.name = { contains: filter.name, mode: "insensitive" };
  }
  if (filter.exerciseTypes) {
    // where.programExercises = {
    //   some: {
    //     exercise: {
    //       types: {
    //         hasSome: filter.exerciseTypes.split(",") as any[],
    //       },
    //     },
    //   },
    // };
  }
  if (filter.exerciseEquipment) {
    // where.programExercises = {
    //   some: {
    //     exercise: {
    //       equipment: {
    //         hasSome: filter.exerciseEquipment.split(",") as any[],
    //       },
    //     },
    //   },
    // };
  }
  if (filter.exerciseMuscles) {
    // where.programExercises = {
    //   some: {
    //     exercise: {
    //       muscles: {
    //         hasSome: filter.exerciseMuscles.split(",") as any[],
    //       },
    //     },
    //   },
    // };
  }
  if (filter.exerciseName) {
    // where.programExercises = {
    //   some: {
    //     exercise: {
    //       name: { contains: filter.exerciseName, mode: "insensitive" },
    //     },
    //   },
    // };
  }

  return where;
};
