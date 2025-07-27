import { Prisma } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { ICoreSet } from "./coreSets.models";
import { coreSetsSQL } from "./coreSets.sql";
import { CoreSetQuery, CreateCoreSetInput } from "./coreSets.validations";

export const coreSetsService = {
  getAll: async (query: CoreSetQuery): Promise<ICoreSet[]> => {
    const where: Prisma.CoreSetWhereInput = {
      hasWarmup: query.hasWarmup,
    };

    const take = query.page ? 20 : undefined;
    const skip =
      query.page && query.page > 1 ? (query.page - 1) * (take ?? 0) : 0;

    return await prisma.coreSet.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "asc" },
      select: coreSetsSQL.CORE_SET_SELECT,
    });
  },
  getById: async (id: string): Promise<ICoreSet | null> => {
    return await prisma.coreSet.findUnique({
      where: { id },
      select: coreSetsSQL.CORE_SET_SELECT,
    });
  },
  create: async (dto: CreateCoreSetInput): Promise<ICoreSet> => {
    return await prisma.coreSet.create({
      data: {
        restTime: dto.restTime,
        numberOfSets: dto.numberOfSets,
        hasWarmup: dto.hasWarmup,
        reps: {
          create: {
            reps: dto.reps,
          },
        },
        weight: {
          create: { weight: dto.weight, isBodyWeight: dto.isBodyWeight },
        },
      },
      select: coreSetsSQL.CORE_SET_SELECT,
    });
  },
};
