import {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
} from "../../../../shared/validations/exercise.validation";
import type { Prisma } from "../../../prisma/generated/prisma";
import { dbUtil } from "../../shared/utils/db.util";

const MUSCLE_SELECT: Prisma.MuscleSelect = {
  name: true,
  aliases: {
    select: {
      name: true,
      language: true,
    },
  },
};

const EQUIPMENT_SELECT: Prisma.EquipmentSelect = {
  name: true,
  categories: {
    select: {
      name: true,
    },
  },
};

const EXERCISE_SELECT: Prisma.ExerciseSelect = {
  id: true,
  name: true,
  youtubeUrl: true,
  type: true,
  equipment: {
    select: EQUIPMENT_SELECT,
  },
  muscles: {
    select: MUSCLE_SELECT,
  },
  owner: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
  ownerId: true,
};

const getExerciseCreate = (
  dto: TExerciseCreateValidatedInput
): Prisma.ExerciseCreateInput => {
  return {
    name: dto.name,
    youtubeUrl: dto.youtubeUrl,
    type: dto.type,
    equipment: {
      connect: dto.equipment.map((e) => ({ name: e.name })),
    },
    muscles: {
      connect: dto.muscles.map((m) => ({ name: m.name })),
    },
    owner: {
      connect: { id: dto.ownerId! },
    },
  };
};
const getExerciseUpdate = (
  dto: TExerciseUpdateValidatedInput
): Prisma.ExerciseUpdateInput => {
  const { muscles, equipment, name, youtubeUrl, type } = dto;
  const muscleToDelete: Prisma.MuscleWhereUniqueInput[] = [];
  const musclesToConnect: Prisma.MuscleWhereUniqueInput[] = [];

  muscles?.forEach((muscle) => {
    const crudOperation = muscle.crudOperation || "read";
    switch (crudOperation) {
      case "delete":
        muscleToDelete.push({ name: muscle.name });
        break;
      case "create":
        musclesToConnect.push({ name: muscle.name });
        break;
      case "read":
      default:
        break;
    }
  });

  const equipmentToDelete: Prisma.EquipmentWhereUniqueInput[] = [];
  const equipmentToConnect: Prisma.EquipmentWhereUniqueInput[] = [];
  equipment?.forEach((equip) => {
    const crudOperation = equip.crudOperation || "read";
    switch (crudOperation) {
      case "delete":
        equipmentToDelete.push({ name: equip.name });
        break;
      case "create":
        equipmentToConnect.push({ name: equip.name });
        break;
      case "read":
      default:
        break;
    }
  });

  const cleanData = dbUtil.cleanData({
    name,
    youtubeUrl,
    type,
  });
  return {
    ...cleanData,
    muscles: {
      disconnect: muscleToDelete,
      connect: musclesToConnect,
    },
    equipment: {
      disconnect: equipmentToDelete,
      connect: equipmentToConnect,
    },
  };
};
export const exerciseSQL = {
  EXERCISE_SELECT,
  MUSCLE_SELECT,
  EQUIPMENT_SELECT,
  getExerciseCreate,
  getExerciseUpdate,
};
