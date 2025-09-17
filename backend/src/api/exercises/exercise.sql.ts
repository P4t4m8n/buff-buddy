import type { Prisma } from "../../../prisma/generated/prisma";

interface ExerciseSQL {
  EXERCISE_SELECT: Prisma.ExerciseSelect;
}

export const exerciseSQL: ExerciseSQL = {
  EXERCISE_SELECT: {
    id: true,
    name: true,
    youtubeUrl: true,
    type: true,
    equipment: true,
    muscles: true,
  },
};
