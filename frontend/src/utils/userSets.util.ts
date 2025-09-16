import type {
  IUserCardioSetDTO,
  IUserCardioSetEditDTO,
} from "../../../shared/models/cardioSet.model";
import type {
  ICoreStrengthSetDTO,
  IUserStrengthSetDTO,
  IUserStrengthSetEditDTO,
} from "../../../shared/models/strengthSet.model";
import { appUtil } from "./app.util";

export const userSetsUtil = {
  getEmptyStrength: (
    order: number,
    lastUserSets?: IUserStrengthSetDTO,
    isBodyWeight?: boolean
  ): IUserStrengthSetEditDTO => {
    return {
      id: appUtil.getTempId("temp"),
      lastSet: {
        lastReps: lastUserSets?.reps ?? null,
        lastWeight: lastUserSets?.weight ?? null,
        lastSkippedReason: lastUserSets?.skippedReason ?? null,
        lastIsMuscleFailure: lastUserSets?.isMuscleFailure ?? false,
        lastIsJointPain: lastUserSets?.isJointPain ?? false,
      },
      reps: null,
      weight: null,
      isCompleted: false,
      isMuscleFailure: false,
      isJointPain: false,
      crudOperation: "create",
      isBodyWeight,
      order,
    };
  },
  //TODO??HArdcoded at the moment improve later maybe move to backend
  getStrengthWarmupSet: (
    isBodyWeight?: boolean,
    weight?: number | null
  ): IUserStrengthSetEditDTO => {
    const warmupWeight = isBodyWeight
      ? null
      : weight
      ? Math.round((weight ?? 0) * 0.35)
      : null;
    return {
      id: appUtil.getTempId("temp/warmup"),
      reps: 10,
      weight: warmupWeight,
      isCompleted: false,
      isMuscleFailure: false,
      isJointPain: false,
      isBodyWeight,
      order: 0, // Warmup set is always the first set
    };
  },
  createUserStrengthSets(
    coreSet: ICoreStrengthSetDTO,
    lastUserSets?: IUserStrengthSetDTO[] | null
  ): IUserStrengthSetEditDTO[] {
    const { numberOfSets = 1, hasWarmup, isBodyWeight, weight } = coreSet;
    const sortedLastSets =
      lastUserSets
        ?.filter((lus) => !lus.isWarmup)
        .sort((a, b) => (a?.order ?? 1) - (b?.order ?? 1)) ?? [];

    const sets = Array.from({ length: numberOfSets }).map((_, idx) =>
      userSetsUtil.getEmptyStrength(idx + 1, sortedLastSets[idx], isBodyWeight)
    );

    if (hasWarmup) {
      const warmupSet = this.getStrengthWarmupSet(isBodyWeight, weight);
      warmupSet.isWarmup = true;
      sets.unshift(warmupSet);
    }

    return sets;
  },

  getEmptyCardio: (lastUserSet?: IUserCardioSetDTO): IUserCardioSetEditDTO => {
    return {
      id: appUtil.getTempId("temp"),
      lastSet: {
        lastWorkTime: lastUserSet?.workTime ?? null,
        lastAvgHeartRate: lastUserSet?.avgHeartRate ?? null,
        lastAvgSpeed: lastUserSet?.avgSpeed ?? null,
        lastCaloriesBurned: lastUserSet?.caloriesBurned ?? null,
        lastSkippedReason: lastUserSet?.skippedReason ?? null,
        lastDistance: lastUserSet?.distance ?? null,
      },
      workTime: null,
      avgHeartRate: null,
      avgSpeed: null,
      distance: null,
      caloriesBurned: null,
      isCompleted: false,
      skippedReason: null,
      crudOperation: "create",
      order: lastUserSet?.order ?? 0,
    };
  },
  createUserCardioSets(
    numberOfSets: number = 1,
    lastUserSets?: IUserCardioSetDTO[] | null
  ): IUserCardioSetEditDTO[] {
    const sortedLastSets =
      lastUserSets?.sort((a, b) => (a?.order ?? 1) - (b?.order ?? 1)) ?? [];
    return Array.from({ length: numberOfSets }).map((_, idx) =>
      this.getEmptyCardio(sortedLastSets[idx])
    );
  },
};
