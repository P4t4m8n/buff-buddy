export interface IDashboardStats {
  totalWorkouts: number;
  totalExercises: number;
  activeProgram: {
    id: string;
    name: string;
  } | null;
  currentStreak: number;
}

export interface IWorkoutHistoryItem {
  id: string;
  dateCompleted: string;
  workoutName: string;
  programName: string | null;
  exerciseCount: number;
}

export interface IExerciseProgressPoint {
  date: string;
  maxWeight: number;
  totalVolume: number;
  bestReps: number;
}

export interface IExerciseProgressData {
  exerciseId: string;
  exerciseName: string;
  type: "strength" | "cardio";
  data: IExerciseProgressPoint[];
}

export interface ICardioProgressPoint {
  date: string;
  distance: number | null;
  workTime: number | null;
  avgHeartRate: number | null;
  caloriesBurned: number | null;
}

export interface ICardioProgressData {
  exerciseId: string;
  exerciseName: string;
  data: ICardioProgressPoint[];
}

export interface IMuscleGroupCount {
  muscleName: string;
  count: number;
}

export interface IWorkoutFrequency {
  week: string;
  count: number;
}

export interface IDashboardData {
  stats: IDashboardStats;
  recentWorkouts: IWorkoutHistoryItem[];
  workoutFrequency: IWorkoutFrequency[];
  muscleDistribution: IMuscleGroupCount[];
  exerciseProgress: IExerciseProgressData[];
  cardioProgress: ICardioProgressData[];
}
