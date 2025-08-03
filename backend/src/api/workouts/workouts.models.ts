import { IBaseFilter } from "../../../../shared/models/app.model";
import {
  DaysOfWeek,
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../prisma/generated/prisma";
import { ICoreCardioSet } from "../coreSets/coreCardioSets/coreCardioSets.models";
import { ICoreStrengthSet } from "../coreSets/coreStrengthSets/coreStrengthSets.models";
import { IUserBase } from "../users/users.model";

export interface IWorkoutFilter extends IBaseFilter {
  programName?: string;
  dayOfWeek?: DaysOfWeek;
  exerciseName?: string;
  ownerName?: string;
}

export interface IWorkout {
  id?: string;
  name?: string | null;
  notes?: string | null;
  owner?: IUserBase | null;
  workoutExercises?:
    | {
        id: string;
        order: number;
        notes: string | null;
        exercise: {
          id: string;
          youtubeUrl: string | null;
          name: string;
          types: ExerciseType[];
          muscles: ExerciseMuscle[];
          equipment: ExerciseEquipment[];
        };
        coreStrengthSet: ICoreStrengthSet;
        coreCardioSet?: ICoreCardioSet;
      }[]
    | null;
}
