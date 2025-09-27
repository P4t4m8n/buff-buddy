import { Prisma } from "../../../../prisma/generated/prisma";
import type { TUserStrengthSetCreateValidatedInput } from "../../../../../shared/validations/userStrengthSet.validation";

const getCreateUserStrengthSet = (
  dto: TUserStrengthSetCreateValidatedInput
): Prisma.UserStrengthSetCreateInput => {
  return {
    reps: dto.reps,
    weight: dto.weight,
    isBodyWeight: dto.isBodyWeight,
    isCompleted: dto.isCompleted,
    isWarmup: dto.isWarmup,
    isMuscleFailure: dto.isMuscleFailure,
    isJointPain: dto.isJointPain,
    order: dto?.order,
    skippedReason: dto?.skippedReason,
  } as Prisma.UserStrengthSetCreateInput;
};

const CORE_STRENGTH_SET_SELECT: Prisma.UserStrengthSetSelect = {
  id: true,
  reps: true,
  weight: true,
  isWarmup: true,
  isCompleted: true,
  isMuscleFailure: true,
  isJointPain: true,
  isBodyWeight: true,
  skippedReason: true,
  order: true,
};

export const userStrengthSetsSQL = {
  getCreateUserStrengthSet,
  CORE_STRENGTH_SET_SELECT,
};
