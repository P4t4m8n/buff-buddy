import { IProgramDTO } from "../../../../shared/models/program.model";
import { userUtil } from "../users/user.util";
import { workoutUtils } from "../workouts/workout.utils";
import { IProgram } from "./programs.models";

export const programsUtils = {
  buildDTO: (program: IProgram | null): IProgramDTO => ({
    id: program?.id,
    name: program?.name,
    notes: program?.notes,
    startDate: program?.startDate,
    endDate: program?.endDate,
    isActive: program?.isActive ?? false,
    owner: userUtil.toSmallDTO(program?.owner),
    programWorkouts: (program?.programWorkouts ?? []).map((pw) => ({
      ...pw,
      workout: workoutUtils.buildDTO(pw.workout),
    })),
  }),

  buildDTOArr(programs: IProgram[]): IProgramDTO[] {
    return programs.map((program) => this.buildDTO(program));
  },
};
