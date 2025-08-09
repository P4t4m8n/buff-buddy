import { Prisma } from "../../../../prisma/generated/prisma";
import { TCreateUserStrengthSetInput } from "../../../../../shared/validations/userStrengthSets.validations";

const getCreateUserStrengthSet = (
  dto: TCreateUserStrengthSetInput
): Prisma.UserStrengthSetCreateInput => {
  return {
    reps: dto.reps ?? 1,
    weight: dto.weight,
    isBodyWeight: dto.isBodyWeight,
    isCompleted: dto.isCompleted,
    isWarmup: dto.isWarmup,
    isMuscleFailure: dto.isMuscleFailure,
    isJointPain: dto.isJointPain,
    order: dto?.order,
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
  order: true,
};

export const userStrengthSetsSQL = {
  getCreateUserStrengthSet,
  CORE_STRENGTH_SET_SELECT
};
