export interface IUserCardioSet {
  id: string;
  workTime: number; // in seconds
  avgHeartRate: number;
  avgSpeed: number; // in km/h
  distance: number; // in meters
  caloriesBurned: number;
  isCompleted: boolean;
  order?: number;
  skippedReason?: string;
}
