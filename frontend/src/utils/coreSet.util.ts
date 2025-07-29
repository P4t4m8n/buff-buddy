import type { ICoreSetEditDTO } from "../../../shared/models/set.model";
import { appUtil } from "./app.util";

export const coreSetUtil = {
  getEmpty: (): ICoreSetEditDTO => ({
    id: appUtil.getTempId("temp"),
    isBodyWeight: false,
    numberOfSets: 1,
    reps: 10,
    weight: 10,
    restTime: 10,
    hasWarmup: false,
    crudOperation: "create",
  }),
};
