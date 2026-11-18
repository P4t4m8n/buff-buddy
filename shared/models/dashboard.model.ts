//INFO: All dates are local day keys in "YYYY-MM-DD" format
export interface IDashboardWeekCount {
  planned: number;
  completed: number;
}

export interface IDashboardWeek extends IDashboardWeekCount {
  weekStart: string;
}

export interface IDashboardNextWorkout {
  programId: string;
  workoutId: string;
  workoutName: string | null;
  date: string;
}

export interface IDashboardMuscleSets {
  muscle: string;
  sets: number;
}

export interface IDashboardStrengthPoint {
  date: string;
  estimatedOneRepMax: number;
}

export interface IDashboardStrengthProgress {
  exerciseId: string;
  exerciseName: string;
  points: IDashboardStrengthPoint[];
}

export interface IDashboardDTO {
  thisWeek: IDashboardWeekCount;
  streak: number;
  volume: { thisWeek: number; lastWeek: number };
  nextWorkout: IDashboardNextWorkout | null;
  weeklyHistory: IDashboardWeek[];
  muscleSets: IDashboardMuscleSets[];
  strengthProgress: IDashboardStrengthProgress[];
}
