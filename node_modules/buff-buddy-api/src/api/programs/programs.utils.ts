import { Program } from "../../../prisma/generated/prisma";
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
    workouts: (program.programWorkouts ?? []).map((pw: any) => ({
      ...pw.workout,
      daysOfWeek: pw.daysOfWeek ?? [],
    })),
  }),
};
