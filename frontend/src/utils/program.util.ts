import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../shared/models/program.model";
import { appUtil } from "./app.util";
import { workoutUtil } from "./workout.util";

const isProgramActive = ({ startDate, endDate }: Partial<IProgramDTO>) => {
  const today = new Date();

  return (
    startDate &&
    new Date(startDate) <= today &&
    endDate &&
    new Date(endDate) >= today
  );
};
const filterActivePrograms = (programs: IProgramDTO[]) => {
  return programs.filter(({ startDate, endDate }) =>
    isProgramActive({ startDate, endDate })
  );
};
const dtoToEditDto = (dto: IProgramDTO): IProgramEditDTO => {
  return {
    id: dto.id,
    name: dto.name || "",
    notes: dto.notes || "",
    startDate: dto.startDate ? new Date(dto.startDate) : null,
    endDate: dto.endDate ? new Date(dto.endDate) : null,
    isActive: dto.isActive,
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
    id: appUtil.getTempId(),
    name: "",
    notes: "",
    startDate: null,
    endDate: null,
    isActive: false,
    programWorkouts: [],
  };
};
export const programUtil = {
  isProgramActive,
  filterActivePrograms,
  dtoToEditDto,
  getEmpty,
};
