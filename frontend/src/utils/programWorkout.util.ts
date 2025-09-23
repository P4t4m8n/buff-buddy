import { appUtil } from "./app.util";
import { workoutUtil } from "./workout.util";
import { getTempId } from "../../../shared/utils/getTempId";

import type {
  IProgramWorkoutEditDTO,
  IProgramWorkoutDTO,
} from "../../../shared/models/program.model";

const dtoToEditDto = (
  dto?: IProgramWorkoutDTO,
  isCopy?: boolean
): IProgramWorkoutEditDTO | null => {
  if (!dto) {
    return null;
  }
  return {
    ...dto,
    crudOperation: appUtil.createOrUpdateCrud(dto.id, "read"),
    workout: workoutUtil.dtoToEditDto({
      dto: dto.workout,
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
