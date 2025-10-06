import type { TExerciseQuery } from "../../../../shared/validations/exercise.validation";
import type { Prisma } from "../../../prisma/generated/prisma";

const buildWhereClause = (
  filter: TExerciseQuery
): Prisma.ExerciseWhereInput => {
  const where: Prisma.ExerciseWhereInput = {};

  if (filter.name) {
    where.name = { contains: filter.name, mode: "insensitive" };
    1;
  }
  if (filter.types && filter.types.length) {
    where.type = { in: filter.types };
  }
  if (filter.equipment && filter.equipment.length) {
    where.equipment = {
      some: {
        AND: [
          { name: { in: filter.equipment as string[] } },
          {
            categories: {
              some: { name: { in: filter.equipment as string[] } },
            },
          },
        ],
      },
    };
  }
  if (filter.muscles && filter.muscles.length) {
    where.muscles = {
      some: {
        AND: [
          { name: { in: filter.muscles as string[] } },
          { aliases: { some: { name: { in: filter.muscles as string[] } } } },
        ],
      },
    };
  }

  return where;
};
export const exerciseUtil = { buildWhereClause };
