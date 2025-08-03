import { ICoreStrengthSetDTO } from "../../../../../shared/models/strengthSet.model";
import { ICoreStrengthSet } from "./coreStrengthSets.models";

const toDTO = (data?: ICoreStrengthSet | null): ICoreStrengthSetDTO => {
  return {
    id: data?.id,
    hasWarmup: data?.hasWarmup,
    restTime: data?.restTime,
    numberOfSets: data?.numberOfSets,
    reps: data?.reps[0].reps || 0,
    weight: data?.weight[0].weight || 0,
    isBodyWeight: data?.weight[0].isBodyWeight || false,
  };
};
export const coreStrengthSetsUtil = { toDTO };
