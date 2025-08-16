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
    console.log("🚀 ~ dtoToEditDto ~ dto:", dto)
    if (!dto) {
      return null;
    }
    return {
      ...dto,
      crudOperation:
        dto.id && !dto.id.startsWith("temp/") ? "update" : "create",
      workout: workoutUtils.dtoToEditDto(dto.workout, isCopy),
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
