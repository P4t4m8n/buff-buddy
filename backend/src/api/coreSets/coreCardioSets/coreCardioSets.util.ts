import { ICoreCardioSetDTO } from "../../../../../shared/models/cardioSet.model";
import { ICoreCardioSet } from "./coreCardioSets.models";

const toDTO = (data?: ICoreCardioSet | null): ICoreCardioSetDTO => {
  return {
    id: data?.id,
    warmupTime: data?.warmupTime,
    workTime: data?.workTime[0].workTime,
    avgHeartRate: data?.avgHeartRate,
    avgSpeed: data?.avgSpeed[0].avgSpeed ?? 0,
    distance: data?.distance[0].distance ?? 0,
    calorieTarget: data?.calorieTarget[0].calorieTarget ?? 0,
  };
};
export const coreCardioSetsUtil = { toDTO };
