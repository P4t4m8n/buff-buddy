import type {
  IUserSetDTO,
  IUserSetEditDTO,
} from "../../../shared/models/set.model";
import { appUtil } from "./app.util";

export const userSetsUtil = {
  getEmpty: (
    order: number,
    lastUserSets?: IUserSetDTO,
    isBodyWeight?: boolean
  ): IUserSetEditDTO => {
    return {
      id: appUtil.getTempId("temp"),
      reps: null,
      lastReps: lastUserSets?.reps ?? null,
      weight: null,
      lastWeight: lastUserSets?.weight ?? null,
      isCompleted: false,
      isMuscleFailure: false,
      lastIsMuscleFailure: lastUserSets?.isMuscleFailure ?? false,
      isJointPain: false,
      lastIsJointPain: lastUserSets?.isJointPain ?? false,
      isBodyWeight,
      order,
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
      order: 0, // Warmup set is always the first set
    };
  },

  createUserSets(
    numberOfSets: number = 1,
    isBodyWeight?: boolean,
    hasWarmup?: boolean,
    weight?: number | null,
    lastUserSets?: IUserSetDTO[]
  ): IUserSetEditDTO[] {
    const sortedLastSets =
      lastUserSets?.sort((a, b) => (a?.order ?? 1) - (b?.order ?? 1)) ?? [];
    const sets = Array.from({ length: numberOfSets }).map((_, idx) =>
      userSetsUtil.getEmpty(idx + 1, sortedLastSets[idx], isBodyWeight)
    );

    if (hasWarmup) {
      const warmupSet = this.getWarmupSet(isBodyWeight, weight);
      warmupSet.isWarmup = true;
      sets.unshift(warmupSet);
    }

    return sets;
  },
};
