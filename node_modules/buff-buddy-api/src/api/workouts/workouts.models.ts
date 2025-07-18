import { DaysOfWeek, ExerciseEquipment, ExerciseMuscle, ExerciseType } from "../../../prisma/generated/prisma";
import { IBaseFilter } from "../../shared/models/base.model";
import { IUserBase } from "../users/users.model";

export interface IWorkoutFilter extends IBaseFilter {
  programName?: string;
  dayOfWeek?: DaysOfWeek;
  exerciseName?: string;
  ownerName?: string;
}

export interface IWorkoutWithRelations {
  id: string;
  name: string | null;
  notes: string | null;
  user: IUserBase;
  workoutExercises: Array<{
    id: string;
    order: number;
    notes: string | null;
    exercise: {
      id: string;
      name: string;
      youtubeUrl: string;
      types: ExerciseType[]; // ExerciseType[]
      equipment: ExerciseEquipment[]; // ExerciseEquipment[]
      muscles: ExerciseMuscle[]; // ExerciseMuscle[]
    };
    coreSets: Array<{
      id: string;
      reps: number;
      weight: number | null;
      isBodyWeight: boolean;
      restTime: number;
      order: number;
      isWarmup: boolean;
      repsInReserve: number | null;
      isHistory: boolean;
    }>;
  }>;
}
