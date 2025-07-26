import type { IUserSetEditDTO } from "../../../shared/models/set.model";
import { appUtil } from "./app.util";

export const userSetsUtil = {
  getEmpty: (isBodyWeight?: boolean): IUserSetEditDTO => {
    return {
      id: appUtil.getTempId("temp"),
      reps: null,
      weight: null,
      isCompleted: false,
      isMuscleFailure: false,
      isJointPain: false,
      isBodyWeight,
    };
  },
};
