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
      ownerId: dto.owner?.id,
      crudOperation: isCopy ? "create" : "update",
      workoutExercises: (dto.workoutExercises || []).map((we) => {
        const workoutExerciseId = isCopy ? appUtil.getTempId() : we.id;
        return {
          id: workoutExerciseId,
          order: we.order,
          notes: we.notes || "",
          exercise: we.exercise,
          crudOperation: isCopy ? "create" : "update",
          exerciseId: we?.exercise?.id,
          coreSets: {
            ...we.coreSets,
            crudOperation: isCopy ? "create" : "update",
            workoutExerciseId: workoutExerciseId,
          },
        };
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
