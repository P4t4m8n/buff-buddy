import { Prisma } from "../../../prisma/generated/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import type {
  CreateCoreSetInput,
  UpdateCoreSetInput,
} from "./coreSets.validations";

interface CoreSetSQL {
  getCreateCoreSets: (
    coreSet?: CreateCoreSetInput | UpdateCoreSetInput
  ) => Prisma.CoreSetCreateInput;
  getUpdateCoreSets: (
    coreSets?: UpdateCoreSetInput
  ) => Prisma.CoreSetUpdateInput;
  CORE_SET_SELECT: Prisma.CoreSetSelect;
}

export const coreSetsSQL: CoreSetSQL = {
  getCreateCoreSets(
    coreSet?: CreateCoreSetInput | UpdateCoreSetInput
  ): Prisma.CoreSetCreateInput {
    const data: Prisma.CoreSetCreateInput = {
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
  getUpdateCoreSets(coreSet?: UpdateCoreSetInput) {
    const _coreSet = this.getCreateCoreSets(coreSet);
    return dbUtil.cleanData({ ..._coreSet });
  },

  CORE_SET_SELECT: {
    id: true,
    hasWarmup: true,
    restTime: true,
    createdAt: true,
    updatedAt: true,
    numberOfSets: true,
    reps: {
      take: 1,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        reps: true,
      },
    },
    weight: {
      take: 1,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        weight: true,
        isBodyWeight: true,
      },
    },
  },
};
