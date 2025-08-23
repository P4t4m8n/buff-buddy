import { Prisma } from "../../../../prisma/generated/prisma";
import { dbUtil } from "../../../shared/utils/db.util";
import {
  TCreateCoreStrengthSetInput,
  TUpdateCoreStrengthSetInput,
} from "../../../../../shared/validations/coreStrengthSet.validation";

interface ICoreStrengthSetSQL {
  getCreateCoreSets: (
    coreSet?: TCreateCoreStrengthSetInput | TUpdateCoreStrengthSetInput
  ) => Prisma.CoreStrengthSetCreateInput;
  getUpdateCoreSets: (
    coreSets?: TUpdateCoreStrengthSetInput
  ) => Prisma.CoreStrengthSetUpdateInput;
  CORE_STRENGTH_SET_SELECT: Prisma.CoreStrengthSetSelect;
}

export const coreStrengthSetsSQL: ICoreStrengthSetSQL = {
  getCreateCoreSets(coreSet) {
    const data = {
      restTime: coreSet?.restTime,
      numberOfSets: coreSet?.numberOfSets,
      hasWarmup: coreSet?.hasWarmup,
      reps: {
        create: {
          reps: coreSet?.reps,
        },
      },
      weight: {
        create: {
          weight: coreSet?.weight,
          isBodyWeight: coreSet?.isBodyWeight,
        },
      },
    };
    return data;
  },
  getUpdateCoreSets(coreSet) {
    const _coreSet = this.getCreateCoreSets(coreSet);
    return dbUtil.cleanData({ ..._coreSet, id: coreSet?.id });
  },

  CORE_STRENGTH_SET_SELECT: {
    id: true,
    hasWarmup: true,
    restTime: true,
    createdAt: true,
    updatedAt: true,
    numberOfSets: true,
    reps: {
      take: 1,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        reps: true,
        createdAt: true,
      },
    },
    weight: {
      take: 1,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        weight: true,
        isBodyWeight: true,
      },
    },
  },
};
