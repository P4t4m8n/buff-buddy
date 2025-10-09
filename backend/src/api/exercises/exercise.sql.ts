/**
 * Utilities for building Prisma queries for the Exercise-related entities.
 *
 * This module centralizes select shapes and helpers that map validated DTOs
 * to Prisma create/update input objects used by repository/data-access code.
 *
 * It keeps the Prisma selection shapes for Exercise, Muscle and Equipment in a
 * single place so controllers/services can reuse consistent shapes.
 */
//Util
import { dbUtil } from "../../shared/utils/db.util";
//Types
import type {
  TExerciseCreateValidatedInput,
  TExerciseUpdateValidatedInput,
} from "../../../../shared/validations/exercise.validation";
import type { Prisma } from "../../../prisma/generated/prisma";
/**
 * Prisma select shape for the Muscle model.
 *
 * Selects:
 * - name: the canonical name of the muscle
 * - aliases: related alias entries with their name and language
 */
const MUSCLE_SELECT: Prisma.MuscleSelect = {
  name: true,
  aliases: {
    select: {
      name: true,
      language: true,
    },
  },
};
/**
 * Prisma select shape for the Equipment model.
 *
 * Selects:
 * - name: the canonical name of the equipment
 * - categories: related category entries with their name
 */
const EQUIPMENT_SELECT: Prisma.EquipmentSelect = {
  name: true,
  categories: {
    select: {
      name: true,
    },
  },
};
/**
 * Prisma select shape for the Exercise model.
 *
 * Selects common fields used when returning exercises:
 * - id, name, youtubeUrl, type
 * - nested equipment and muscles using their respective select shapes
 * - owner (partial) and ownerId
 */
const EXERCISE_SELECT: Prisma.ExerciseSelect = {
  id: true,
  name: true,
  youtubeUrl: true,
  type: true,
  isCompounded: true,
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
/**
 * Build a Prisma.ExerciseCreateInput from a validated create DTO.
 *
 * Maps:
 * - scalar fields (name, youtubeUrl, type)
 * - equipment and muscles to connect by name
 * - owner by id
 *
 * @param dto - Validated exercise create input (TExerciseCreateValidatedInput)
 * @returns Prisma.ExerciseCreateInput suitable for prisma.exercise.create({...})
 */
const getExerciseCreate = (
  dto: TExerciseCreateValidatedInput
): Prisma.ExerciseCreateInput => {
  return {
    name: dto.name,
    youtubeUrl: dto.youtubeUrl,
    type: dto.type,
    isCompounded:dto.isCompounded,
    equipment: {
      connect: dto.equipment.map((e) => ({ name: e.name })),
    },
    muscles: {
      connect: dto.muscles.map((m) => ({ name: m.name })),
    },
    owner: dto.ownerId ? { connect: { id: dto.ownerId } } : undefined,
  };
};
/**
 * Build a Prisma.ExerciseUpdateInput from a validated update DTO.
 *
 * Handles:
 * - optional scalar updates (name, youtubeUrl, type) using dbUtil.cleanData
 *   to remove undefined values
 * - muscles and equipment arrays which may include a crudOperation flag:
 *   - "create" => connect by name
 *   - "delete" => disconnect by name
 *   - "read" (or omitted) => ignore
 *
 * The returned object includes connect/disconnect arrays for both relations.
 *
 * @param dto - Validated exercise update input (TExerciseUpdateValidatedInput)
 * @returns Prisma.ExerciseUpdateInput suitable for prisma.exercise.update({...})
 */
const getExerciseUpdate = (
  dto: TExerciseUpdateValidatedInput
): Prisma.ExerciseUpdateInput => {
  const { muscles, equipment, name, youtubeUrl, type, isCompounded } = dto;
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
    isCompounded,
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
