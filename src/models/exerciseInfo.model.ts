import type { IBaseFilter } from "./app.model";
import type { IEntity } from "./entity.model";
import type { IImageDTO } from "./image.model";

export interface IExerciseInfoDTO extends IEntity {
  name: string;
  image?: IImageDTO | null;
  category: TExerciseInfoCategory;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IExerciseInfoEditDTO extends IEntity {
  name?: string;
  image?: IImageDTO | null;
  file?: File | null;
  category: TExerciseInfoCategory;
}

export interface IExerciseInfoFilter extends IBaseFilter {
  skip?: number;
  take?: number;
  name?: string;
}

export const ExerciseInfoCategory = ["muscles", "equipment", "types"] as const;
export type TExerciseInfoCategory = (typeof ExerciseInfoCategory)[number];
