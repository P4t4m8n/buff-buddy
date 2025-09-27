import {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
} from "../../../../shared/validations/exercise.validation";
import type { Prisma } from "../../../prisma/generated/prisma";
import { dbUtil } from "../../shared/utils/db.util";

const EXERCISE_SELECT: Prisma.ExerciseSelect = {
  id: true,
  name: true,
  youtubeUrl: true,
  type: true,
  equipment: true,
  muscles: true,
};

const getExerciseCreate = (
  dto: TExerciseCreateValidatedInput
): Prisma.ExerciseCreateInput => {
  return {
    name: dto.name,
    youtubeUrl: dto.youtubeUrl,
    type: dto.type,
    equipment: dto.equipment,
    muscles: dto.muscles,
    owner: {
      connect: { id: dto.ownerId! },
    },
  };
};
const getExerciseUpdate = (
  dto: TExerciseUpdateValidatedInput
): Prisma.ExerciseUpdateInput => {
  return dbUtil.cleanData(
    getExerciseCreate(dto as TExerciseCreateValidatedInput)
  );
};
export const exerciseSQL = {
  EXERCISE_SELECT,
  getExerciseCreate,
  getExerciseUpdate,
};
