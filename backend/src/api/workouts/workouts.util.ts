import { workoutExerciseUtils } from "../workoutExercise/workoutExercise.util";

import type { IWorkoutDTO } from "../../../../shared/models/workout.model";
import type { Prisma } from "../../../prisma/generated/prisma";
import type { IWorkout } from "./workouts.models";
import type { TWorkoutQuery } from "../../../../shared/validations/workout.validations";

const buildWhereClause = (
  filter: TWorkoutQuery,
  userId?: string
): Prisma.WorkoutWhereInput => {
  const where: Prisma.WorkoutWhereInput = {};

  if (!!filter.workoutName) {
    where.name = { contains: filter.workoutName, mode: "insensitive" };
  }

  if (!!filter.programName) {
    where.programWorkouts = {
      some: {
        program: {
          name: { contains: filter.programName, mode: "insensitive" },
        },
      },
    };
  }

  if (!!filter.exerciseName) {
    where.workoutExercises = {
      some: {
        exercise: {
          name: { contains: filter.exerciseName, mode: "insensitive" },
        },
      },
    };
  }

  if (!!filter.ownerName) {
    where.owner = {
      OR: [
        { firstName: { contains: filter.ownerName, mode: "insensitive" } },
        { lastName: { contains: filter.ownerName, mode: "insensitive" } },
      ],
    };
  }

  // where.isTemplate = filter.isTemplate;

  if (userId) where.ownerId = userId;
  return where;
};
const buildDTO = (workout: IWorkout): IWorkoutDTO => ({
  ...workout,
  workoutExercises: workout?.workoutExercises?.map((we) =>
    workoutExerciseUtils.buildDTO(we)
  ),
});

const buildDTOArr = (programs: IWorkout[]): IWorkoutDTO[] => {
  return programs.map((program) => buildDTO(program));
};

export const workoutUtil = {
  buildWhereClause,
  buildDTO,
  buildDTOArr,
};
