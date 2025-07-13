import { get } from "http";
import { CoreSet, Prisma } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { CoreSetQuery, CreateCoreSetInput } from "./coreSets.validations";

export const coreSetsService = {
  //TODO: Improve this to use a more efficient query
  getAll: async (query: CoreSetQuery): Promise<CoreSet[]> => {
    const where: Prisma.CoreSetWhereInput = {
      programExerciseId: query.programExerciseId,
      isWarmup: query.isWarmup,
      weight: {
        gte: query.minWeight ?? 0,
        lte: query.maxWeight ?? Infinity,
      },
      reps: {
        gte: query.minReps ?? 1,
        lte: query.maxReps ?? Infinity,
      },
    };

    const take = query.page ? 20 : undefined;
    const skip =
      query.page && query.page > 1 ? (query.page - 1) * (take ?? 0) : 0;

    return await prisma.coreSet.findMany({
      where,
      skip,
      take,
      orderBy: { order: "asc" },
    });
  },
  getById: async (id: string): Promise<CoreSet | null> => {
    return await prisma.coreSet.findUnique({
      where: { id },
    });
  },
  create: async (dto: CreateCoreSetInput): Promise<CoreSet> => {
    return await prisma.coreSet.create({
      data: {
        order: dto.order,
        reps: dto.reps,
        weight: dto.weight,
        isWarmup: dto.isWarmup,
        restTime: dto.restTime,
        isBodyWeight: dto.isBodyWeight,
      },
    });
  },
};
