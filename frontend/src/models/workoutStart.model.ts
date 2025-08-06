import type { IUserWorkoutExercisesDTO } from "../../../shared/models/userWorkout";

export interface IWorkoutStartExerciseItemProps {
  item: IUserWorkoutExercisesDTO;
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  completeAllExerciseSets: (id: string) => void;
}
