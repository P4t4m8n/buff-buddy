import type { ICoreCardioSetEditDTO } from "../../../shared/models/cardioSet.model";

export const coreCardioSetUtil = {
  getEmpty: (): ICoreCardioSetEditDTO => ({
    id: "temp_" + Math.random().toString(36).substring(2, 15),
    warmupTime: null,
    workTime: null,
    avgHeartRate: null,
    avgSpeed: null,
    distance: null,
    calorieTarget: null,
    crudOperation: "create",
  }),
};
