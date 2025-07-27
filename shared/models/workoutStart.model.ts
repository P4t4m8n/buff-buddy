import type { IEntity } from "./entity.model";
import type { IProgramDTO } from "./program.model";
import type { IUserSetDTO } from "./set.model";
import type { IUserDTO } from "./user.model";
import type { IWorkoutDTO, IWorkoutExerciseDTO } from "./workout.model";

interface IUserWorkoutBase extends IEntity {
  dateCompleted?: Date | null;
}

export interface IUserWorkoutDTO extends IUserWorkoutBase {
  program?: IProgramDTO;
  workout?: IWorkoutDTO;
  owner?: Partial<IUserDTO> | null;
  workoutExercises: IUserWorkoutExercisesDTO[];
}

export interface IUserWorkoutEditDTO extends IUserWorkoutBase {
  ownerId?: string;
  programId?: string;
  workoutExercises: IUserWorkoutEditExercisesDTO[];
}

export interface IUserWorkoutExercisesDTO extends IWorkoutExerciseDTO {
  userSets: IUserSetDTO[];
}
export interface IUserWorkoutEditExercisesDTO {
  workoutExerciseId: string;
  userSets: IUserSetDTO[];
}
