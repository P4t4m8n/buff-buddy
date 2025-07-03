import type { ICoreSetEditDTO } from "../models/set.model";
import { appUtil } from "../utils/app.util";

export const coreSetsService = {
  getEmpty: (order?: number): ICoreSetEditDTO => ({
    id: appUtil.getTempId("temp"),
    order: order ?? 1,
    reps: null,
    weight: null,
    restTime: null,
    isWarmup: false,
    crudOperation: "create",
  }),
};
