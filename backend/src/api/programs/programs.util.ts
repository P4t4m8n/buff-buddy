import { IProgramDTO } from "../../../../shared/models/program.model";
import { Prisma } from "../../../prisma/generated/prisma";
import { userUtil } from "../users/user.util";
import { workoutUtil } from "../workouts/workout.util";
import { IProgram, IProgramFilter } from "./programs.models";

const buildWhereClause = (
  filter: IProgramFilter,
  userId: string
): Prisma.ProgramWhereInput => {
  const where: Prisma.ProgramWhereInput = {};

  if (filter.name) {
    where.name = { contains: filter.name, mode: "insensitive" };
  }

  where.ownerId = userId;

  return where;
};

const buildDTO = (program: IProgram | null): IProgramDTO => ({
  id: program?.id,
  name: program?.name,
  notes: program?.notes,
  startDate: program?.startDate,
  endDate: program?.endDate,
  isActive: program?.isActive ?? false,
  owner: userUtil.toSmallDTO(program?.owner),
  programWorkouts: (program?.programWorkouts ?? []).map((pw) => ({
    ...pw,
    workout: workoutUtil.buildDTO(pw.workout),
  })),
});

const buildDTOArr = (programs: IProgram[]): IProgramDTO[] => {
  return programs.map((program) => buildDTO(program));
};

export const programsUtil = {
  buildWhereClause,
  buildDTO,
  buildDTOArr,
};
