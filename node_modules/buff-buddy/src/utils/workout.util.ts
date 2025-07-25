import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";
import { appUtil } from "./app.util";

export const workoutUtils = {
  dtoToEditDto(dto?: IWorkoutDTO, isCopy?: boolean): IWorkoutEditDTO {
    if (!dto) {
      return this.getEmpty();
    }
    return {
      id: isCopy ? appUtil.getTempId() : dto.id,
      notes: dto.notes,
      name: dto.name,
      programId: dto.program?.id ?? null,
      userId: dto.user?.id,
      crudOperation: isCopy ? "create" : "update",
      workoutExercises: (dto.workoutExercises || []).map((we) => ({
        id: isCopy ? appUtil.getTempId() : we.id,
        order: we.order,
        notes: we.notes || "",
        exercise: we.exercise,
        exerciseId: we?.exercise?.id,
        coreSets: (we.coreSets || []).map((set) => ({
          ...set,
          id: isCopy ? appUtil.getTempId() : set.id,
        })),
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
