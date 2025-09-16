import type {
  IUserCardioSetDTO,
  IUserCardioSetEditDTO,
} from "./cardioSet.model";
import type { IEntity, IEntityDates } from "./entity.model";
import type { IProgramDTO } from "./program.model";
import type {
  IUserStrengthSetDTO,
  IUserStrengthSetEditDTO,
} from "./strengthSet.model";
import type { IUserDTO } from "./user.model";
import type { IWorkoutDTO, IWorkoutExerciseDTO } from "./workout.model";

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
  ownerId?: string;
  workout?: IWorkoutDTO | null;
  userWorkoutExercises: IUserWorkoutExercisesEditDTO[];
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
