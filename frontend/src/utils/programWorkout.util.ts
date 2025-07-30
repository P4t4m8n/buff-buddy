import type {
  IProgramWorkoutEditDTO,
  IProgramWorkoutDTO,
} from "../../../shared/models/program.model";
import { appUtil } from "./app.util";

export const programWorkoutUtil = {
  dtoToEditDto(
    dto?: IProgramWorkoutDTO,
    isCopy?: boolean
  ): IProgramWorkoutEditDTO|null {
    if (!dto) {
      return null
    }
    return {
      ...dto,
      crudOperation: dto.id && !dto.id.startsWith("temp/") ? "update" : "create",
      workout: {
        ...dto.workout,
        crudOperation: isCopy ? "create" : "read",
      },
    };
  },

  getEmpty(): IProgramWorkoutEditDTO {
    return {
      daysOfWeek: [],
      crudOperation: "create",
      id:appUtil.getTempId(),
    };
  },
};
