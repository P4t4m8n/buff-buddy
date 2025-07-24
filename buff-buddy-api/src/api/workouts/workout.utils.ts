import { IWorkoutDTO } from "../../../../shared/models/workout.model";
import { Prisma } from "../../../prisma/generated/prisma";
import { IWorkoutFilter, IWorkoutWithRelations } from "./workouts.models";

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
  buildDTO(rawData: IWorkoutWithRelations): IWorkoutDTO {
    return {
      id: rawData.id,
      name: rawData.name,
      notes: rawData.notes,
      user: rawData.user
        ? {
            id: rawData.user.id ?? "",
            firstName: rawData.user.firstName ?? "",
            lastName: rawData.user.lastName ?? "",
          }
        : undefined,
      workoutExercises: rawData.workoutExercises.map((exercise) => ({
        id: exercise.id || "",
        order: exercise.order,
        notes: exercise.notes || "",
        exercise: exercise.exercise
          ? {
              id: exercise.exercise.id,
              name: exercise.exercise.name,
              youtubeUrl: exercise.exercise.youtubeUrl,
              types: exercise.exercise.types,
              equipment: exercise.exercise.equipment,
              muscles: exercise.exercise.muscles,
            }
          : undefined,
        coreSets: exercise.coreSets.map((coreSet) => ({
          id: coreSet.id,
          reps: coreSet.reps,
          weight: coreSet.weight,
          isBodyWeight: coreSet.isBodyWeight,
          restTime: coreSet.restTime,
          order: coreSet.order,
          isWarmup: coreSet.isWarmup,
        })),
      })),
    };
  },
};
