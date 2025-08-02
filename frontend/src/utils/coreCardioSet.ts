import type { ICoreSetEditDTO } from "../../../shared/models/set.model";

export const coreCardioSet = {
  getEmpty: (): ICoreSetEditDTO => ({
    id: "temp_" + Math.random().toString(36).substring(2, 15),
    isBodyWeight: false,
    numberOfSets: 1,
    reps: 10,
    weight: 10,
    restTime: 10,
    hasWarmup: false,
    crudOperation: "create",
  }),
};
