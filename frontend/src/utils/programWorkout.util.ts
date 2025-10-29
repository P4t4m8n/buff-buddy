import { appUtil } from "./app.util";
import { workoutUtil } from "./workout.util";
import  getTempId  from "../../../shared/utils/getTempId";

import type {
  IProgramWorkoutEditDTO,
  IProgramWorkoutDTO,
} from "../../../shared/models/program.model";

const dtoToEditDto = (
  dto?: IProgramWorkoutDTO | IProgramWorkoutEditDTO,
  isCopy?: boolean
): IProgramWorkoutEditDTO | null => {
  if (!dto) {
    return null;
  }

  if ("crudOperation" in dto) {
    return dto;
  }
  return {
    ...dto,
    crudOperation: appUtil.createOrUpdateCrud(dto.id, "read"),
    workout: workoutUtil.dtoToEditDto({
      dto: (dto as IProgramWorkoutDTO).workout,
      isEdit: false,
      isCopy,
    }),
  };
};

const getEmpty = (): IProgramWorkoutEditDTO => {
  return {
    daysOfWeek: [],
    crudOperation: "create",
    id: getTempId(),
  };
};
export const programWorkoutUtil = { dtoToEditDto, getEmpty };
