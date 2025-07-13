import type { IUserSetEditDTO } from "../models/set.model";
import { appUtil } from "./app.util";

export const userSetsUtil = {
  getEmpty: (isBodyWeight?: boolean, coreSetId?: string): IUserSetEditDTO => {
    return {
      id: appUtil.getTempId("temp"),
      reps: null,
      weight: null,
      restTime: null,
      isCompleted: false,
      isMuscleFailure: false,
      isJointPain: false,
      isBodyWeight,
      coreSetId,
    };
  },
};
