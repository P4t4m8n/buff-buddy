import { DaysOfWeek, Prisma, Program } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import { workoutSQL } from "../workouts/workout.sql";
import { programsSQL } from "./program.sql";
import { IProgram, IProgramFilter } from "./programs.models";
import {
  TCreateProgramInput,
  TUpdateProgramInput,
} from "./programs.validations";

//TODO?? move to raw SQL for performance due to junction tables and reorganize of structure data
export const programsService = {
  getAll: async (
    filter: IProgramFilter,
    userId: string
  ): Promise<IProgram[]> => {
    const where: Prisma.ProgramWhereInput = buildWhereClause(filter, userId);

    const take = filter.take ?? 20;
    const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

    //TODO?? I have no idea hwy the type dont work
    return (await prisma.program.findMany({
      where,
      skip,
      take,
      select: programsSQL.PROGRAM_SELECT,
    })) as unknown as IProgram[];
  },

  getById: async (id: string, userId: string): Promise<IProgram | null> => {
    return (await prisma.program.findUnique({
      where: { id, ownerId: userId },
      select: programsSQL.PROGRAM_SELECT,
    })) as unknown as IProgram;
  },

  create: async (
    dto: TCreateProgramInput,
    userId: string
  ): Promise<IProgram> => {
    return (await prisma.program.create({
      data: programsSQL.getProgramCreate(dto, userId),
      select: programsSQL.PROGRAM_SELECT,
    })) as unknown as IProgram;
  },

  //TODO?? moving to raw sql in the end, so lazy solution for now
  update: async (
    id: string,
    dto: TUpdateProgramInput,
    userId: string
  ): Promise<IProgram> => {
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
    return (await prisma.$transaction(async (tx) => {
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
                ...dbUtil.cleanData({
                  daysOfWeek: w.daysOfWeek as DaysOfWeek[],
                }),
                workout: {
                  connectOrCreate: {
                    where: { id: w.workout.id },
                    create: workoutSQL.getWorkoutCreate(w.workout, userId),
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
                    create: workoutSQL.getWorkoutCreate(w.workout, userId),
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
        select: programsSQL.PROGRAM_SELECT,
      });
    })) as unknown as IProgram;
  },

  delete: async (id: string): Promise<Program> => {
    return await prisma.program.delete({
      where: { id },
    });
  },
};

const buildWhereClause = (
  filter: IProgramFilter,
  userId: string
): Prisma.ProgramWhereInput => {
  const where: Prisma.ProgramWhereInput = {};

  if (filter.name) {
    where.name = { contains: filter.name, mode: "insensitive" };
  }

  where.ownerId = userId;

  return where;
};
