import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";
import { appUtil } from "./app.util";

export const workoutUtils = {
  dtoToEditDto: (dto: IWorkoutDTO): IWorkoutEditDTO => {
    return {
      id: dto.id,
      programId: dto.program?.id,

      userId: dto.user?.id,
      notes: dto.notes,
      workoutExercises: (dto.workoutExercises || []).map((exercise) => ({
        id: exercise.id,
        exerciseId: exercise?.exercise?.id,
      })),
    };
  },
  editDtoToDto: (dto: IWorkoutEditDTO): IWorkoutDTO => {
    return {
      id: dto.id,
    };
  },
  getEmpty: (): IWorkoutEditDTO => {
    return {
      id: appUtil.getTempId(),
      programId: null,
      userId: null,
      notes: "",
      workoutExercises: [],
    };
  },
};
