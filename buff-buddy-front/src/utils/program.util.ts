import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../models/program.model";

export const programUtils = {
  isProgramActive: ({ startDate, endDate }: Partial<IProgramDTO>) => {
    const today = new Date();

    return (
      startDate &&
      new Date(startDate) <= today &&
      endDate &&
      new Date(endDate) >= today
    );
  },
  filterActivePrograms: (programs: IProgramDTO[]) => {
    return programs.filter(({ startDate, endDate }) =>
      programUtils.isProgramActive({ startDate, endDate })
    );
  },
  dtoToEditDto: (dto: IProgramDTO): IProgramEditDTO => {
    return {
      ...dto,
      workouts: dto.workouts?.map((w) => ({
        ...w,
        id: w.id ?? "",
        name: w.name ?? "",
        notes: w.notes ?? "",
      })),
    };
  },
  getEmpty(): IProgramEditDTO {
    return {
      id: "",
      name: "",
      notes: "",
      startDate: null,
      endDate: null,
      isActive: false,
      workouts: [],
    };
  },
};
