import { IProgramDTO } from "../../../../shared/models/program.model";
import { IProgram } from "./programs.models";

export const programsUtils = {
  buildDTO: (program: IProgram): IProgramDTO => ({
    id: program.id,
    name: program.name,
    notes: program.notes,
    startDate: program.startDate,
    endDate: program.endDate,
    isActive: program.isActive ?? false,
    owner: {
      id: program?.owner?.id,
      firstName: program?.owner?.firstName,
      lastName: program?.owner?.lastName,
    },
    programWorkouts: (program.programWorkouts ?? []).map((pw) => ({
      ...pw,
      workout: {
        ...pw.workout,
        workoutExercises: pw.workout.workoutExercises.map((we) => ({
          ...we,
          coreSets: {
            ...we.coreSets,
            reps: we.coreSets.reps[0].reps,
            weight: we.coreSets.weight[0].weight,
            isBodyWeight: we.coreSets.weight[0].isBodyWeight ?? false,
          },
        })),
      },
    })),
  }),

  buildDTOArr(programs: IProgram[]): IProgramDTO[] {
    return programs.map((program) => this.buildDTO(program));
  },
};
