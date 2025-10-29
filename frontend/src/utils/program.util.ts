import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../shared/models/program.model";
import  getTempId  from "../../../shared/utils/getTempId";
import { workoutUtil } from "./workout.util";

const dtoToEditDto = ({ dto }: { dto: IProgramDTO }): IProgramEditDTO => {
  return {
    id: dto.id,
    name: dto.name || "",
    notes: dto.notes || "",
    startDate: dto.startDate ? new Date(dto.startDate) : null,
    endDate: dto.endDate ? new Date(dto.endDate) : null,
    isActive: dto.isActive,
    ownerId: dto.owner?.id || null,
    programWorkouts:
      dto.programWorkouts?.map((pw) => ({
        id: pw.id,
        workout: workoutUtil.dtoToEditDto({
          dto: pw.workout,
          isEdit: false,
        }),
        crudOperation: "read",
        daysOfWeek: pw.daysOfWeek || [],
      })) || [],
  };
};
const getEmpty = (): IProgramEditDTO => {
  return {
    id: getTempId(),
    name: "",
    notes: "",
    startDate: null,
    endDate: null,
    isActive: false,
    programWorkouts: [],
    ownerId: null,
  };
};
export const programUtil = {
  dtoToEditDto,
  getEmpty,
};
