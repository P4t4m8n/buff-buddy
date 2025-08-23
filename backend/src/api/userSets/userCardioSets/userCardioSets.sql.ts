import { Prisma } from "../../../../prisma/generated/prisma";
import type { TCreateUserCardioSetInput } from "../../../../../shared/validations/userCardioSet.validation";

const getCreateUserCardioSet = (
  dto: TCreateUserCardioSetInput
): Prisma.UserCardioSetCreateInput => {
  return {
    workTime: dto.workTime,
    avgHeartRate: dto.avgHeartRate,
    avgSpeed: dto.avgSpeed,
    distance: dto.distance,
    caloriesBurned: dto.caloriesBurned,
    isCompleted: dto.isCompleted,
    skippedReason: dto.skippedReason,
    order: dto.order,
  } as Prisma.UserCardioSetCreateInput;
};

const CORE_CARDIO_SET_SELECT: Prisma.UserCardioSetSelect = {
  id: true,
  workTime: true,
  avgHeartRate: true,
  avgSpeed: true,
  distance: true,
  caloriesBurned: true,
  isCompleted: true,
  skippedReason: true,
  order: true,
};

export const userCardioSetsSQL = {
  getCreateUserCardioSet,
  CORE_CARDIO_SET_SELECT,
};
