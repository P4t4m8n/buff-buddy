import type { IWorkoutDTO } from "../../../shared/models/workout.model";

export type TWorkoutActionRoute = "programEdit" | "workoutList";

export interface IWorkoutListPreviewProps {
  actionType: TWorkoutActionRoute;
  onSelectProgramWorkout?: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
  onDeleteWorkout?: (id?: string) => Promise<void>;
}
