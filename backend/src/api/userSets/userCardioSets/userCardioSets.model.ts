export interface IUserCardioSet {
  id: string;
  workTime: number|null; // in seconds
  avgHeartRate: number|null;
  avgSpeed: number|null; // in km/h
  distance: number|null; // in meters
  caloriesBurned: number|null;
  isCompleted: boolean;
  order?: number;
  skippedReason?: string|null;
}
