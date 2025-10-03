import type { IWorkoutDTO } from "../../../shared/models/workout.model";

export interface IModelProps<T extends HTMLElement> {
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  modelRef?: React.RefObject<T | null>;
}
export interface IWorkoutEditModelProps extends IModelProps<HTMLFormElement> {
  workoutId?: string;
  isCopy?: boolean;
  afterSubmit?: (workout: IWorkoutDTO) => void;
}
