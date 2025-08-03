import { Prisma, Workout } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { IWorkout, IWorkoutFilter } from "./workouts.models";
import {
  TCreateWorkoutInput,
  TUpdateWorkoutInput,
} from "./workouts.validations";
import { dbUtil } from "../../shared/utils/db.util";
import { workoutUtils } from "./workout.utils";
import { workoutSQL } from "./workout.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";

export const workoutsService = {
  get: async (filter: IWorkoutFilter, userId: string): Promise<IWorkout[]> => {
    const where: Prisma.WorkoutWhereInput = workoutUtils.buildWhereClause(
      filter,
      userId
    );

    const take = filter.take ? parseInt(filter.take.toString()) : 20;
    const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

    return (await prisma.workout.findMany({
      where,
      skip,
      take,
      select: workoutSQL.WORKOUT_SELECT,
    })) as unknown as Promise<IWorkout[]>;
  },
  getById: async (id: string, userId: string): Promise<IWorkout | null> => {
    return prisma.workout.findUnique({
      where: { id, ownerId: userId },
      select: workoutSQL.WORKOUT_SELECT,
    }) as unknown as Promise<IWorkout>;
  },
  create: async (dto: TCreateWorkoutInput): Promise<IWorkout> => {
    return prisma.workout.create({
      data: workoutSQL.getWorkoutCreate(dto, dto?.ownerId),
      select: workoutSQL.WORKOUT_SELECT,
    }) as unknown as Promise<IWorkout>;
  },
  //TODO ?? Really need to refactor this
  update: async (id: string, dto: TUpdateWorkoutInput): Promise<IWorkout> => {
    const { workoutExercises, ...workoutData } = dto;

    const exercisesToCreate =
      workoutExercises?.filter((we) => we.crudOperation === "create") ?? [];
    const exercisesToUpdate =
      workoutExercises?.filter((we) => we.crudOperation === "update") ?? [];
    const exercisesToDelete =
      workoutExercises?.filter((we) => we.crudOperation === "delete") ?? [];

    return prisma.$transaction(async (tx) => {
      // 1. Update the top-level workout fields
      await tx.workout.update({
        where: { id: id ?? "test-workout" },
        data: dbUtil.cleanData({
          notes: workoutData.notes,
          name: workoutData.name,
        }),
      });

      // 2. Delete exercises marked for deletion
      if (exercisesToDelete.length > 0) {
        await tx.workoutExercise.deleteMany({
          where: { id: { in: exercisesToDelete.map((we) => we.id!) } },
        });
      }

      // 3. Create new exercises
      if (exercisesToCreate.length > 0) {
        for (const we of exercisesToCreate) {
          await tx.workoutExercise.create({
            data: workoutSQL.getWorkoutExerciseCreate(we),
          });
        }
      }

      // 4. Update existing exercises
      if (exercisesToUpdate.length > 0) {
        for (const we of exercisesToUpdate) {
          const coreStrengthSet: {
            update?: {
              where: { id: string };
              data: Prisma.CoreStrengthSetUpdateInput;
            };
            create?: Prisma.CoreStrengthSetCreateInput;
          } = {};
          if (we?.coreStrengthSet?.id) {
            coreStrengthSet.update = {
              where: {
                id: we.coreStrengthSet?.id,
              },
              data: coreStrengthSetsSQL.getUpdateCoreSets(we.coreStrengthSet),
            };
          } else if (!we?.coreStrengthSet?.id) {
            coreStrengthSet.create = coreStrengthSetsSQL.getCreateCoreSets(
              we.coreStrengthSet
            );
          }
          const coreCardioSet: {
            update?: {
              where: { id: string };
              data: Prisma.CoreCardioSetUpdateInput;
            };
            create?: Prisma.CoreCardioSetCreateInput;
          } = {};
          if (we?.coreCardioSet?.id) {
            coreCardioSet.update = {
              where: {
                id: we.coreCardioSet?.id,
              },
              data: coreCardioSetsSQL.getUpdateCoreSets(we.coreStrengthSet),
            };
          } else if (!we?.coreCardioSet?.id) {
            coreCardioSet.create = coreCardioSetsSQL.getCreateCoreSets(
              we.coreCardioSet
            );
          }

          await tx.workoutExercise.update({
            where: { id: we?.id ?? "test-we" },
            data: {
              ...dbUtil.cleanData({
                order: we.order!,
                notes: we.notes,
                isActive: we.isActive,
              }),
              coreStrengthSet,
              coreCardioSet,
            },
          });
        }
      }

      return tx.workout.findUniqueOrThrow({
        where: { id },
        select: workoutSQL.WORKOUT_SELECT,
      });
    }) as unknown as Promise<IWorkout>;
  },
  delete: async (id: string): Promise<Workout> => {
    return prisma.workout.delete({
      where: { id },
    });
  },
};
