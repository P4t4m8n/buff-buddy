import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IExerciseInfoDTO } from "./exerciseInfo.model";

interface IExerciseBase extends IEntity {
  name?: string;
  youtubeUrl?: string;
}
export interface IExerciseDTO extends IExerciseBase {
  types?: IExerciseInfoDTO[];
  equipment?: IExerciseInfoDTO[];
  muscles?: IExerciseInfoDTO[];
}

export interface IExerciseEditDTO extends IExerciseBase {
  exerciseTypesId?: string[];
  exerciseEquipmentId?: string[];
  exerciseMusclesId?: string[];
}

export interface IExerciseFilter extends IBaseFilter {
  name?: string;
  typeId?: string;
  equipmentId?: string;
  muscleId?: string;
  typeName?: string;
  equipmentName?: string;
  muscleName?: string;
}
