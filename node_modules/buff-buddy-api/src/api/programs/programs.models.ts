import { DaysOfWeek } from "../../../prisma/generated/prisma";
import { IBaseFilter } from "../../shared/models/base.model";
import { IExercise } from "../exercises/exercises.models";
import { IUserBase } from "../users/users.model";

export interface IProgramFilter extends IBaseFilter {
  name?: string;
  exerciseTypes?: string;
  exerciseEquipment?: string;
  exerciseMuscles?: string;
  exerciseName?: string;
}

export interface IProgramWithRelations {
  id: string;
  name: string;
  notes?: string | null;
  isActive?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  owner: IUserBase;

  programWorkouts: Array<{
    daysOfWeek: DaysOfWeek[];
    workout: {
      id: string;
      name?: string | null;
      notes?: string | null;
      workoutExercises: Array<{
        id: string;
        order: number;
        notes?: string | null;
        exercise: IExercise;
        coreSets: Array<{
          id: string;
          reps: number;
          weight?: number | null;
          restTime?: number | null;
          isBodyWeight?: boolean;
          order: number;
          isWarmup?: boolean;
          repsInReserve?: number | null;
          isHistory?: boolean;
        }>;
      }>;
    };
  }>;
}
