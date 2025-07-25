export interface ICoreSet {
  id: string;
  hasWarmup: boolean;
  restTime: number;
  createdAt?: Date | null;
  updatedAt?: Date | null;
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
