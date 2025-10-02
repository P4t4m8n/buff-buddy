import { userUtil } from "../users/user.util";
import { workoutUtil } from "../workouts/workouts.util";

import type { IProgramDTO } from "../../../../shared/models/program.model";
import type { Prisma } from "../../../prisma/generated/prisma";
import type { IProgram } from "./programs.models";
import type { TProgramQuery } from "../../../../shared/validations/program.validations";

const buildWhereClause = (
  filter: TProgramQuery,
  userId?: string
): Prisma.ProgramWhereInput => {
  console.log("🚀 ~ buildWhereClause ~ filter:", filter);
  const where: Prisma.ProgramWhereInput = {};

  if (filter.name) {
    where.name = { contains: filter.name, mode: "insensitive" };
  }

  // where.isActive = !!filter.isActive;

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
    workout: workoutUtil.buildDTO(pw.workout!),
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
