export interface IUserSet {
  id: string;
  reps: number;
  weight: number|null;
  isWarmup: boolean;
  isCompleted: boolean;
  isMuscleFailure: boolean;
  isJointPain: boolean;
  isBodyWeight: boolean;
}
