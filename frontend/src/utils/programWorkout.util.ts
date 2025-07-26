import type {
  IProgramWorkoutEditDTO,
  IProgramWorkoutDTO,
} from "../../../shared/models/program.model";

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
      crudOperation: dto.id ? "update" : "create",
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
    };
  },
};
