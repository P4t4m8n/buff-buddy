import type { IProgramDTO, IProgramEditDTO } from "../models/program.model";

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
  getEmpty(): IProgramEditDTO {
    return {
      id: "",
      name: "",
      notes: "",
      startDate: null,
      endDate: null,
      isActive: false,
      programExercises: [],
    };
  },
};
