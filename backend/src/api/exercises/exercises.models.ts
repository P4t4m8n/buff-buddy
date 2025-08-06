import {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../prisma/generated/prisma";


export interface IExercise {
  id: string;
  name: string;
  youtubeUrl: string;
  type: ExerciseType;
  equipment: ExerciseEquipment[];
  muscles: ExerciseMuscle[];
}
