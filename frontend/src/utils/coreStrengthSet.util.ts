import type { ICoreStrengthSetEditDTO } from "../../../shared/models/strengthSet.model";
import { appUtil } from "./app.util";

export const coreStrengthSetUtil = {
  getEmpty: (): ICoreStrengthSetEditDTO => ({
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
