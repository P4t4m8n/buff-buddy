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

export interface IProgramBase {
  id: string;
  name: string;
  notes: string | null;
  isActive: boolean;
  startDate: Date;
  endDate: Date | null;
}

export interface IProgram extends IProgramBase {
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: string;
    firstName: string | null;
    lastName: string | null;
  } | null;
  programWorkouts: IProgramWorkout[];
}

export interface IProgramWorkout {
  id: string;
  daysOfWeek: DaysOfWeek[];
  workout: IWorkout;
  level: string;
  workoutGoal: string;
}
