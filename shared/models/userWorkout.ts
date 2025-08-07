import type {
  IUserCardioSetDTO,
  IUserCardioSetEditDTO,
} from "./cardioSet.model";
import type { IEntity } from "./entity.model";
import type { IProgramDTO } from "./program.model";
import type {
  IUserStrengthSetDTO,
  IUserStrengthSetEditDTO,
} from "./strengthSet.model";
import type { IUserDTO } from "./user.model";
import type { IWorkoutDTO, IWorkoutExerciseDTO } from "./workout.model";

interface IUserWorkoutBase extends IEntity {
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
  programId?: string | null;
  workout?: IWorkoutDTO | null;
  workoutId?: string | null;
  userWorkoutExercises: IUserWorkoutEditExercisesDTO[];
  lastUserWorkout?: IUserWorkoutDTO | null;
}

export interface IUserWorkoutExercisesDTO extends IWorkoutExerciseDTO {
  userStrengthSets?: IUserStrengthSetDTO[] | null;
  userCardioSets?: IUserCardioSetDTO[] | null;
}
export interface IUserWorkoutEditExercisesDTO extends IWorkoutExerciseDTO {
  workoutExerciseId: string;
  userStrengthSets?: IUserStrengthSetEditDTO[];
  userCardioSets?: IUserCardioSetEditDTO[];
}
