import type { IExerciseDTO } from "../../../shared/models/exercise.model";

export type TExerciseActionRoute = "workoutEdit" | "exerciseList";

export interface IExercisePreviewProps {
  item: IExerciseDTO;
  actionType?: TExerciseActionRoute;
  deleteItem: (id?: string) => Promise<void>;
  selectExercise?: (exercise?: IExerciseDTO) => void;
}
