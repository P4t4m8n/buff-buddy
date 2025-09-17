import type { IExerciseFilter } from "../../../../shared/models/exercise.model";
import type { Prisma } from "../../../prisma/generated/prisma";

const buildWhereClause = (
  filter: IExerciseFilter
): Prisma.ExerciseWhereInput => {
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
};
export const exerciseUtil = { buildWhereClause };
