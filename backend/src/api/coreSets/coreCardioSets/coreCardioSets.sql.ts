import { Prisma } from "../../../../prisma/generated/prisma";
import { dbUtil } from "../../../shared/utils/db.util";
import {
  TCreateCoreCardioSetInput,
  TUpdateCoreCardioSetInput,
} from "./coreCardioSets.validations";

interface ICoreCardioSetsSQL {
  getCreateCoreSets: (
    coreSet?: TCreateCoreCardioSetInput | TUpdateCoreCardioSetInput
  ) => Prisma.CoreCardioSetCreateInput;
  getUpdateCoreSets: (
    coreSets?: TUpdateCoreCardioSetInput
  ) => Prisma.CoreCardioSetUpdateInput;
  CORE_CARDIO_SET_SELECT: Prisma.CoreCardioSetSelect;
}

export const coreCardioSetsSQL: ICoreCardioSetsSQL = {
  getCreateCoreSets(coreSet) {
    const data: Prisma.CoreCardioSetCreateInput = {
      warmupTime: coreSet?.warmupTime,
      avgHeartRate: coreSet?.avgHeartRate,
      workTime: {
        create: {
          workTime: coreSet?.workTime,
        },
      },
      avgSpeed: {
        create: {
          avgSpeed: coreSet?.avgSpeed,
        },
      },
      distance: {
        create: {
          distance: coreSet?.distance,
        },
      },
      calorieTarget: {
        create: {
          calorieTarget: coreSet?.calorieTarget,
        },
      },
    };
    return data;
  },
  getUpdateCoreSets(coreSet) {
    const _coreSet = this.getCreateCoreSets(coreSet);
    return dbUtil.cleanData({ ..._coreSet, id: coreSet?.id });
  },

  CORE_CARDIO_SET_SELECT: {
    id: true,
    warmupTime: true,
    avgHeartRate: true,
    createdAt: true,
    updatedAt: true,
    workTime: {
      take: 1,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        workTime: true,
      },
    },
    avgSpeed: {
      take: 1,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        avgSpeed: true,
      },
    },
    distance: {
      take: 1,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        distance: true,
      },
    },
    calorieTarget: {
      take: 1,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        calorieTarget: true,
      },
    },
  },
};
