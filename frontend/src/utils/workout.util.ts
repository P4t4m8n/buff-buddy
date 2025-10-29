//Utils
import getTempId from "../../../shared/utils/getTempId";
import { workoutExerciseUtil } from "./workoutExercises.util";
//Types
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
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
    workoutExercises: (dto.workoutExercises || []).map((we) =>
      workoutExerciseUtil.dtoToEditDto({
        we,
        isCopy,
        isEdit,
      })
    ),
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
