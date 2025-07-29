import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
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
      ownerId: dto.owner?.id,
      crudOperation: isCopy ? "create" : "update",
      workoutExercises: (dto.workoutExercises || []).map((we) => {
        const workoutExerciseId = isCopy ? appUtil.getTempId() : we.id;
        const workoutExerciseEdit: IWorkoutExerciseEditDTO = {
          id: workoutExerciseId,
          order: we.order,
          notes: we.notes || "",
          exercise: we.exercise,
          crudOperation: isCopy ? "create" : "update",
          exerciseId: we?.exercise?.id,
          coreSet: {
            ...we.coreSet,
            crudOperation: isCopy ? "create" : "update",
            workoutExerciseId: workoutExerciseId,
          },
        };
        return workoutExerciseEdit;
      }),
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
      ownerId: null,
      notes: "",
      workoutExercises: [],
    };
  },
};
