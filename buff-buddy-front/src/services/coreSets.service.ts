import type { ICoreSetEditDTO } from "../models/set.model";
import { appUtil } from "../utils/app.util";

export const coreSetsService = {
  getEmpty: (order?: number): ICoreSetEditDTO => ({
    id: appUtil.getTempId("temp"),
    order: order ?? 1,
    isBodyWeight: false,
    reps: 10,
    weight: 10,
    restTime: 10,
    isWarmup: false,
    crudOperation: "create",
  }),
};
