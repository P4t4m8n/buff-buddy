import { IWorkoutDTO } from "../../../../shared/models/workout.model";
import { Prisma } from "../../../prisma/generated/prisma";
import { IWorkout, IWorkoutFilter } from "./workouts.models";

export const workoutUtils = {
  buildWhereClause(filter: IWorkoutFilter): Prisma.WorkoutWhereInput {
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

    if (filter.dayOfWeek) {
      where.programWorkouts = {
        ...(where.programWorkouts || {}),
        some: {
          ...(where.programWorkouts?.some || {}),
          daysOfWeek: { has: filter.dayOfWeek },
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

    return where;
  },
  buildDTO: (workout: IWorkout): IWorkoutDTO => ({
    ...workout,
    workoutExercises: workout.workoutExercises.map((we) => ({
      ...we,
      coreSet: {
        ...we.coreSet,
        reps: we.coreSet.reps[0].reps,
        weight: we.coreSet.weight[0].weight,
        isBodyWeight: we.coreSet.weight[0].isBodyWeight ?? false,
      },
    })),
  }),

  buildDTOArr(programs: IWorkout[]): IWorkoutDTO[] {
    return programs.map((program) => this.buildDTO(program));
  },
};
