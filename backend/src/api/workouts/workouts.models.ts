import {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../prisma/generated/prisma";
import { ICoreCardioSet } from "../coreSets/coreCardioSets/coreCardioSets.models";
import { ICoreStrengthSet } from "../coreSets/coreStrengthSets/coreStrengthSets.models";
import { IUser } from "../users/users.model";



export interface IWorkoutExercise {
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
}

export interface IWorkoutBase {
  id: string;
  name?: string | null;
  notes?: string | null;
  isTemplate?: boolean;
}

export interface IWorkout extends IWorkoutBase {
  owner?: IUser | null;
  workoutExercises?: IWorkoutExercise[] | null;
}
