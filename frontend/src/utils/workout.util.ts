import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../shared/models/workout.model";
import { appUtil } from "./app.util";

export const workoutUtils = {
  dtoToEditDto({
    dto,
    isEdit = false,
    isCopy = false,
  }: {
    dto?: IWorkoutDTO;
    isEdit?: boolean;
    isCopy?: boolean;
  }): IWorkoutEditDTO {
    if (!dto) {
      return this.getEmpty();
    }

    return {
      id: isCopy ? appUtil.getTempId() : dto.id,
      notes: dto.notes,
      name: dto.name,
      isTemplate: isEdit ? dto.isTemplate : false,
      programId: dto.program?.id ?? null,
      ownerId: dto.owner?.id,
      crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
      workoutExercises: (dto.workoutExercises || []).map((we) => {
        const workoutExerciseId = isCopy ? appUtil.getTempId() : we.id;
        const workoutExerciseEdit: IWorkoutExerciseEditDTO = {
          id: workoutExerciseId,
          order: we.order,
          notes: we.notes || "",
          exercise: we.exercise,
          crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
          exerciseData: {
            id: we?.exercise?.id!,
            type: we?.exercise?.type!,
          },
        };
        const exerciseType = we?.exercise?.type;
        if (exerciseType === "cardio") {
          workoutExerciseEdit.coreCardioSet = {
            ...we.coreCardioSet,
            crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
            workoutExerciseId: workoutExerciseId,
          };
        } else if (exerciseType === "strength") {
          workoutExerciseEdit.coreStrengthSet = {
            ...we.coreStrengthSet,
            crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
            workoutExerciseId: workoutExerciseId,
          };
        }
        return workoutExerciseEdit;
      }),
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
