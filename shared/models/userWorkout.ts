import type { IEntity, IEntityDates } from "./entity.model";
import type { IProgramDTO } from "./program.model";
import type { IUserDTO } from "./user.model";
import type {
  IUserStrengthSetDTO,
  IUserStrengthSetEditDTO,
} from "./userStrengthSet.model";
import type {
  IUserCardioSetDTO,
  IUserCardioSetEditDTO,
} from "./userCardioSet.model";
import type { IWorkoutDTO, IWorkoutExerciseDTO } from "./workout.model";
import type { IBaseFilter } from "./app.model";

interface IUserWorkoutBase extends IEntity, IEntityDates {
  dateCompleted?: Date | null | string;
}

export interface IUserWorkoutDTO extends IUserWorkoutBase {
  program?: IProgramDTO | null;
  workout?: IWorkoutDTO;
  owner?: Partial<IUserDTO> | null;
  userWorkoutExercises: IUserWorkoutExercisesDTO[];
}

export interface IUserWorkoutEditDTO extends IUserWorkoutBase {
  ownerId?: string | null;
  workout?: IWorkoutDTO | null;
  workoutId?: string;
  programId?: string;
  userWorkoutExercises?: IUserWorkoutExercisesEditDTO[];
}

export interface IUserWorkoutExercisesDTO extends IWorkoutExerciseDTO {
  userStrengthSets?: IUserStrengthSetDTO[] | null;
  userCardioSets?: IUserCardioSetDTO[] | null;
}
export interface IUserWorkoutExercisesEditDTO extends IWorkoutExerciseDTO {
  workoutExerciseId: string;
  userStrengthSets?: IUserStrengthSetEditDTO[];
  userCardioSets?: IUserCardioSetEditDTO[];
  skippedReason?: string | null;
}

export interface IUserWorkoutFilter extends IBaseFilter {}
