import type { IEntity } from "./entity.model";
import type { IUserSetDTO } from "./set.model";
import type { IUserDTO } from "./user.model";
import type { IWorkoutDTO, IWorkoutExerciseDTO } from "./workout.model";

export interface IWorkoutStartDTO extends IEntity {
  dateCompleted?: Date | null;
  workout: IWorkoutDTO;
  owner?: Partial<IUserDTO> | null;
  workoutExercises: IWorkoutStartExercisesDTO[];
}

export interface IWorkoutStartExercisesDTO extends IWorkoutExerciseDTO {
  userSets: IUserSetDTO[];
}
