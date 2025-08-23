import {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../../shared/models/exercise.model";
import { Exercise, Prisma } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import { exerciseSQL } from "./exercise.sql";
import { exerciseUtil } from "./exercise.util";
import type {
  TCreateExerciseInput,
  TUpdateExerciseInput,
} from "../../../../shared/validations/exercise.validation";

export const exerciseService = {
  getAll: async (filter: IExerciseFilter): Promise<IExerciseDTO[]> => {
    const where: Prisma.ExerciseWhereInput =
      exerciseUtil.buildWhereClause(filter);

    const take = filter.take ?? 100;
    const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

    return prisma.exercise.findMany({
      where,
      skip,
      take,
      select: exerciseSQL.EXERCISE_SELECT,
    });
  },
  getById: async (id: string): Promise<IExerciseDTO | null> => {
    return await prisma.exercise.findUnique({
      where: { id },
      select: exerciseSQL.EXERCISE_SELECT,
    });
  },
  create: async (dto: TCreateExerciseInput): Promise<IExerciseDTO> => {
    return await prisma.exercise.create({
      data: {
        name: dto.name,
        youtubeUrl: dto.youtubeUrl,
        muscles: dto.muscles,
        equipment: dto.equipment,
        type: dto.type,
      },
      select: exerciseSQL.EXERCISE_SELECT,
    });
  },
  update: async (id: string, dto: TUpdateExerciseInput): Promise<Exercise> => {
    return await prisma.exercise.update({
      where: { id },
      data: dbUtil.cleanData({ ...dto }),
    });
  },
  delete: async (id: string): Promise<Exercise> => {
    return await prisma.exercise.delete({
      where: { id },
    });
  },
};
