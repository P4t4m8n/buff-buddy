import { getTempId } from "../../../shared/utils/getTempId";

import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../shared/models/workout.model";

const dtoToEditDto = ({
  dto,
  isEdit = false,
  isCopy = false,
}: {
  dto?: IWorkoutDTO;
  isEdit?: boolean;
  isCopy?: boolean;
}): IWorkoutEditDTO => {
  if (!dto) {
    return getEmpty();
  }

  return {
    id: isCopy ? getTempId() : dto.id,
    notes: dto.notes,
    name: dto.name,
    isTemplate: isEdit ? dto.isTemplate : false,
    sourceWorkoutId: isCopy ? dto.id : null,
    ownerId: dto.owner?.id,
    crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
    workoutExercises: (dto.workoutExercises || []).map((we) => {
      const workoutExerciseId = isCopy ? getTempId() : we.id;
      const workoutExerciseEdit: IWorkoutExerciseEditDTO = {
        id: workoutExerciseId,
        order: we.order,
        notes: we.notes || "",
        exercise: we.exercise,
        isBodyWeight: we.isBodyWeight,
        hasWarmup: we.hasWarmup,
        crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
        exerciseData: {
          id: we?.exercise?.id!,
          type: we?.exercise?.type!,
        },
      };

      return workoutExerciseEdit;
    }),
  };
};

const getEmpty = (): IWorkoutEditDTO => {
  return {
    id: getTempId(),
    ownerId: null,
    notes: "",
    workoutExercises: [],
  };
};

export const workoutUtil = { dtoToEditDto, getEmpty };
