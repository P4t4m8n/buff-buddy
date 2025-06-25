import type { ICoreSetDTO } from "../models/set.model";
import { appUtil } from "../utils/app.util";

export const coreSetsService = {
  getEmpty: (order?: number): ICoreSetDTO => ({
    id: appUtil.getTempId("temp"),
    order: order ?? 0,
    reps: 0,
    weight: 0,
    restTime: 0,
    isWarmup: false,
  }),
};
