import { IProgramDTO } from "../../../../shared/models/program.model";
import { IProgramWithRelations } from "./programs.models";

export const programsUtils = {
  buildDTO: (program: IProgramWithRelations): IProgramDTO => ({
    id: program.id,
    name: program.name,
    notes: program.notes || "",
    startDate: program.startDate,
    endDate: program.endDate,
    isActive: program.isActive ?? false,
    owner: {
      id: program.owner.id,
      firstName: program.owner.firstName || "",
      lastName: program.owner.lastName || "",
    },
    workouts: (program.programWorkouts ?? []).map((pw) => ({
      ...pw.workout,
      daysOfWeek: pw.daysOfWeek ?? [],
    })),
  }),
};
