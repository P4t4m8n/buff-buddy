import {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../shared/models/workout.model";
import { Prisma } from "../../../prisma/generated/prisma";
import { workoutExerciseUtils } from "../workoutExercise/workoutExercise.util";
import { IWorkout } from "./workouts.models";
import { TWorkoutQuery } from "./workouts.validations";

const buildWhereClause = (
  filter: TWorkoutQuery,
  userId: string
): Prisma.WorkoutWhereInput => {
  const where: Prisma.WorkoutWhereInput = {};

  if (filter.programName) {
    where.programWorkouts = {
      some: {
        program: {
          name: { contains: filter.programName, mode: "insensitive" },
        },
      },
    };
  }

  if (filter.exerciseName) {
    where.workoutExercises = {
      some: {
        exercise: {
          name: { contains: filter.exerciseName, mode: "insensitive" },
        },
      },
    };
  }

  if (filter.ownerName) {
    where.owner = {
      OR: [
        { firstName: { contains: filter.ownerName, mode: "insensitive" } },
        { lastName: { contains: filter.ownerName, mode: "insensitive" } },
      ],
    };
  }

  if (filter.isTemplate) {
    where.isTemplate = true;
  }

  where.ownerId = userId;
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

export const workoutUtils = {
  buildWhereClause,
  buildDTO,
  buildDTOArr,
};
