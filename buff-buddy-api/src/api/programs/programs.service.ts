import { IProgramDTO } from "../../../../shared/models/program.model";
import { DaysOfWeek, Prisma, Program } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import { getCreateCoreSets } from "../coreSets/coreSets.sql";
import { PROGRAM_SELECT } from "./program.sql";
import { IProgramFilter } from "./programs.models";
import { CreateProgramInput, UpdateProgramInput } from "./programs.validations";

//TODO?? move to raw SQL for performance due to junction tables and reorganize of structure data
export const programsService = {
  getAll: async (filter: IProgramFilter): Promise<IProgramDTO[]> => {
    const where: Prisma.ProgramWhereInput = buildWhereClause(filter);

    const take = filter.take ?? 20;
    const skip =
      filter.skip ??
      (filter.page && filter.page > 1 ? (filter.page - 1) * take : 0);

    return await prisma.program.findMany({
      where,
      skip,
      take,
      select: PROGRAM_SELECT,
    });
  },
  getById: async (id: string): Promise<IProgramDTO | null> => {
    return await prisma.program.findUnique({
      where: { id },
      select: PROGRAM_SELECT,
    });
  },

  create: async (
    dto: CreateProgramInput,
    userId: string
  ): Promise<IProgramDTO> => {
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
          create: (dto.programWorkouts ?? []).map((w) => ({
            workout: {
              connectOrCreate: {
                where: { id: w.workout.id },
                create: {
                  name: w.workout.name ?? dto.name,
                  owner: {
                    connect: {
                      id: userId,
                    },
                  },
                  workoutExercises: {
                    create: (w.workout.workoutExercises ?? []).map((we) => ({
                      order: we.order || 1,
                      notes: we.notes,
                      exercise: {
                        connect: {
                          id: we.exerciseId,
                        },
                      },
                      coreSets: {
                        create: (we.coreSets ?? []).map((cs) => ({
                          ...getCreateCoreSets(cs),
                        })),
                      },
                    })),
                  },
                },
              },
            },
            daysOfWeek: w.daysOfWeek as DaysOfWeek[],
          })),
        },
      },
      select: PROGRAM_SELECT,
    });
  },

  //TODO?? moving to raw sql in the end, so lazy solution for now
  update: async (
    id: string,
    dto: UpdateProgramInput,
    userId: string
  ): Promise<IProgramDTO> => {
    const programData = dbUtil.cleanData({
      name: dto.name,
      notes: dto.notes,
      isActive: dto.isActive,
      startDate: dto.startDate,
      endDate: dto.endDate,
    });

    const workoutsToCreate =
      dto.programWorkouts?.filter((wo) => wo.crudOperation === "create") ?? [];
    const workoutsToUpdate =
      dto.programWorkouts?.filter((wo) => wo.crudOperation === "update") ?? [];
    const workoutsToDelete =
      dto.programWorkouts?.filter((wo) => wo.crudOperation === "delete") ?? [];

    // Start transaction
    return await prisma.$transaction(async (tx) => {
      // Update the program itself
      await tx.program.update({
        where: { id },
        data: programData,
      });

      // Delete workouts
      if (workoutsToDelete.length > 0) {
        await Promise.all(
          workoutsToDelete.map((w) =>
            tx.programWorkout.delete({ where: { id: w.id } })
          )
        );
      }

      // Update workouts
      if (workoutsToUpdate.length > 0) {
        await Promise.all(
          workoutsToUpdate.map((w) =>
            tx.programWorkout.update({
              where: { id: w.id },
              data: {
                daysOfWeek: w.daysOfWeek as DaysOfWeek[],
                workout: {
                  connectOrCreate: {
                    where: { id: w.workout.id },
                    create: {
                      name: w.workout.name ?? dto.name,
                      owner: { connect: { id: userId } },
                      workoutExercises: {
                        create: (w.workout.workoutExercises ?? []).map(
                          (we) => ({
                            order: we.order || 1,
                            notes: we.notes,
                            exercise: { connect: { id: we.exerciseId } },
                            coreSets: {
                              create: (we.coreSets ?? []).map((cs) => ({
                                ...getCreateCoreSets(cs),
                              })),
                            },
                          })
                        ),
                      },
                    },
                  },
                },
              },
            })
          )
        );
      }

      // Create new workouts
      if (workoutsToCreate.length > 0) {
        await Promise.all(
          workoutsToCreate.map((w) =>
            tx.programWorkout.create({
              data: {
                program: { connect: { id } },
                daysOfWeek: w.daysOfWeek as DaysOfWeek[],
                workout: {
                  connectOrCreate: {
                    where: { id: w.workout.id },
                    create: {
                      name: w.workout.name ?? dto.name,
                      owner: { connect: { id: userId } },
                      workoutExercises: {
                        create: (w.workout.workoutExercises ?? []).map(
                          (we) => ({
                            order: we.order || 1,
                            notes: we.notes,
                            exercise: { connect: { id: we.exerciseId } },
                            coreSets: {
                              create: (we.coreSets ?? []).map((cs) => ({
                                ...getCreateCoreSets(cs),
                              })),
                            },
                          })
                        ),
                      },
                    },
                  },
                },
              },
            })
          )
        );
      }

      // Return the updated program
      return await tx.program.findUniqueOrThrow({
        where: { id },
        select: PROGRAM_SELECT,
      });
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
