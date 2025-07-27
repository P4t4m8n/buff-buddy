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
  //TODO??HArdcoded at the moment improve later maybe move to backend
  getWarmupSet: (
    isBodyWeight?: boolean,
    weight?: number | null
  ): IUserSetEditDTO => {
    const warmupWeight = isBodyWeight
      ? null
      : weight
      ? Math.round((weight ?? 0) * 0.35)
      : null;
    return {
      id: appUtil.getTempId("warmup"),
      reps: 10,
      weight: warmupWeight,
      isCompleted: false,
      isMuscleFailure: false,
      isJointPain: false,
      isBodyWeight,
      
    };
  },

  createUserSets(
    numberOfSets: number = 1,
    isBodyWeight?: boolean,
    hasWarmup?: boolean,
    weight?: number | null
  ): IUserSetEditDTO[] {
    const sets = Array.from({ length: numberOfSets }).map(() =>
      userSetsUtil.getEmpty(isBodyWeight)
    );

    if (hasWarmup) {
      const warmupSet = this.getWarmupSet(isBodyWeight, weight);
      sets.unshift(warmupSet);
    }

    return sets;
  },
};
