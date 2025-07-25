import { IBaseFilter } from "../../../../shared/models/app.model";
import { DaysOfWeek } from "../../../prisma/generated/prisma";
import { IWorkout } from "../workouts/workouts.models";

export interface IProgramFilter extends IBaseFilter {
  name?: string;
  exerciseTypes?: string;
  exerciseEquipment?: string;
  exerciseMuscles?: string;
  exerciseName?: string;
}

export interface IProgram {
  id: string;
  name: string;
  notes: string | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: string;
    firstName: string | null;
    lastName: string | null;
  } | null;
  programWorkouts: {
    id: string;
    daysOfWeek: DaysOfWeek[];
    workout: IWorkout;
  }[];
}
