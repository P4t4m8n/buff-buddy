export interface ICoreStrengthSet {
  id: string;
  hasWarmup: boolean;
  restTime: number;
  createdAt?: Date | null | string;
  updatedAt?: Date | null | string;
  numberOfSets: number;
  reps: {
    id: string;
    reps: number;
  }[];
  weight: {
    id: string;
    weight: number | null;
    isBodyWeight: boolean;
  }[];
}
