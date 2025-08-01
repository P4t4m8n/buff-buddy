import { ICoreSetDTO } from "../../../../shared/models/set.model";
import { ICoreSet } from "./coreSets.models";

export const coreSetsUtil = {
  toDTO(data?: ICoreSet|null): ICoreSetDTO {
    return {
      id: data?.id,
      hasWarmup: data?.hasWarmup,
      restTime: data?.restTime,
      numberOfSets: data?.numberOfSets,
      reps: data?.reps[0].reps || 0,
      weight: data?.weight[0].weight || 0,
      isBodyWeight: data?.weight[0].isBodyWeight || false,
    };
  },
};
