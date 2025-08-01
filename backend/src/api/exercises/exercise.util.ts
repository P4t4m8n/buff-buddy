import { Prisma } from "../../../prisma/generated/prisma";
import { IExerciseFilter } from "./exercises.models";

export const exerciseUtil = {
  buildWhereClause(filter: IExerciseFilter): Prisma.ExerciseWhereInput {
    const where: Prisma.ExerciseWhereInput = {};

    if (filter.name) {
      where.name = { contains: filter.name, mode: "insensitive" };
    }
    if (filter.types && filter.types.length > 0) {
      where.type = { in: filter.types };
    }
    if (filter.equipment) {
      where.equipment = { hasSome: filter.equipment };
    }
    if (filter.muscles) {
      where.muscles = { hasSome: filter.muscles };
    }

    return where;
  },
};
