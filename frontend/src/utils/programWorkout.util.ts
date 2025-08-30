import type {
  IProgramWorkoutEditDTO,
  IProgramWorkoutDTO,
} from "../../../shared/models/program.model";
import { appUtil } from "./app.util";
import { workoutUtils } from "./workout.util";

export const programWorkoutUtil = {
  dtoToEditDto(
    dto?: IProgramWorkoutDTO,
    isCopy?: boolean
  ): IProgramWorkoutEditDTO | null {
    if (!dto) {
      return null;
    }
    return {
      ...dto,
      crudOperation: appUtil.createOrUpdateCrud(dto.id, "read"),
      workout: workoutUtils.dtoToEditDto({
        dto: dto.workout,
        isEdit: false,
        isCopy,
      }),
    };
  },

  getEmpty(): IProgramWorkoutEditDTO {
    return {
      daysOfWeek: [],
      crudOperation: "create",
      id: appUtil.getTempId(),
    };
  },
};
