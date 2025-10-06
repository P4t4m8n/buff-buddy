export interface IUserStrengthSet {
  id: string;
  reps: number | null;
  weight: number | null;
  isWarmup: boolean;
  isCompleted: boolean;
  isMuscleFailure: boolean;
  isJointPain: boolean;
  isBodyWeight: boolean;
  skippedReason?: string | null;
  order?: number | null;
}
