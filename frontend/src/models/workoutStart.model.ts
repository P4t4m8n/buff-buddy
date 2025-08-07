import type { IUserWorkoutExercisesDTO } from "../../../shared/models/userWorkout";

export interface IWorkoutStartExerciseItemProps {
  item: IUserWorkoutExercisesDTO;
  handleUserStrengthSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  completeAllExerciseSets: (id: string) => void;
}
