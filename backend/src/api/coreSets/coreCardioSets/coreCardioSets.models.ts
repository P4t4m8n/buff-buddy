export interface ICoreCardioSet {
  id: string;
  warmupTime: number;
  avgHeartRate: number;
  createdAt?: Date | null | string;
  updatedAt?: Date | null | string;
  workTime: {
    id: string;
    workTime: number;
  }[];
  avgSpeed: {
    id: string;
    avgSpeed: number | null;
  }[];
  distance: {
    id: string;
    distance: number | null;
  }[];
  calorieTarget: {
    id: string;
    calorieTarget: number | null;
  }[];
}
