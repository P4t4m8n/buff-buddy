import { Prisma, Workout } from "../../../prisma/generated/prisma";
import { prisma } from "../../../prisma/prisma";
import { IWorkout, IWorkoutFilter } from "./workouts.models";
import { CreateWorkoutInput, UpdateWorkoutInput } from "./workouts.validations";
import { dbUtil } from "../../shared/utils/db.util";
import { workoutUtils } from "./workout.utils";
import { WORKOUT_SELECT } from "./workout.sql";
import { coreSetsSQL } from "../coreSets/coreSets.sql";

export const workoutsService = {
  get: async (filter: IWorkoutFilter): Promise<IWorkout[]> => {
    const where: Prisma.WorkoutWhereInput =
      workoutUtils.buildWhereClause(filter);

    const take = filter.take ? parseInt(filter.take.toString()) : 20;
    const skip =
      filter.skip ??
      (filter.page && filter.page > 1 ? (filter.page - 1) * take : 0);

    return (await prisma.workout.findMany({
      where,
      skip,
      take,
      select: WORKOUT_SELECT,
    })) as unknown as Promise<IWorkout[]>;
  },
  getById: async (id: string): Promise<IWorkout | null> => {
    return prisma.workout.findUnique({
      where: { id },
      select: WORKOUT_SELECT,
    }) as unknown as Promise<IWorkout>;
  },
  create: async (
    dto: CreateWorkoutInput,
    userId: string
  ): Promise<IWorkout> => {
    return prisma.workout.create({
      data: {
        name: dto.name,
        owner: {
          connect: {
            id: userId,
          },
        },
        workoutExercises: {
          create: dto.workoutExercises.map((we) => ({
            order: we.order,
            notes: we.notes,
            exercise: {
              connect: {
                id: we.exerciseId,
              },
            },
            coreSets: {
              create: coreSetsSQL.getCreateCoreSets(we.coreSets),
            },
          })),
        },
      },
      select: WORKOUT_SELECT,
    }) as unknown as Promise<IWorkout>;
  },
  update: async (id: string, dto: UpdateWorkoutInput): Promise<IWorkout> => {
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
        where: { id },
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
            data: {
              order: we.order || 1,
              notes: we.notes,
              workout: { connect: { id } },
              exercise: { connect: { id: we.exerciseId! } },
              coreSets: {
                create: coreSetsSQL.getCreateCoreSets(we.coreSets),
              },
            },
          });
        }
      }

      // 4. Update existing exercises
      if (exercisesToUpdate.length > 0) {
        for (const we of exercisesToUpdate) {
          await tx.workoutExercise.update({
            where: { id: we.id! },
            data: {
              ...dbUtil.cleanData({
                order: we.order,
                notes: we.notes,
                isActive: we.isActive,
              }),
              coreSets: {
                upsert: {
                  where: { id: we.coreSets?.id ?? "new-cs" },
                  create: coreSetsSQL.getCreateCoreSets(we.coreSets),
                  update: coreSetsSQL.getUpdateCoreSets(we.coreSets),
                },
              },
            },
          });
        }
      }

      return tx.workout.findUniqueOrThrow({
        where: { id },
        select: WORKOUT_SELECT,
      });
    }) as unknown as Promise<IWorkout>;
  },
  delete: async (id: string): Promise<Workout> => {
    return prisma.workout.delete({
      where: { id },
    });
  },
};

//  data: {
//       ...workoutData,
//       workoutExercises: {
//         upsert: dto.workoutExercises?.map((we) => ({
//           where: { id: we.id ?? "test-we" },
//           update: {
//             ...dbUtil.cleanData({
//               order: we.order,
//               notes: we.notes,
//               isActive: we.isActive,
//               exerciseId: we.exerciseId,
//             }),
//             coreSets: {
//               upsert: (we.coreSets ?? []).map((cs) => ({
//                 where: { id: cs?.id },
//                 update: {
//                   // Clean coreSet data
//                   ...dbUtil.cleanData({
//                     reps: cs.reps,
//                     weight: cs.weight,
//                     restTime: cs.restTime,
//                     order: cs.order,
//                     isWarmup: cs.isWarmup,
//                     isBodyWeight: cs.isBodyWeight,
//                     repsInReserve: cs.repsInReserve,
//                   }),
//                 },
//                 create: {
//                   reps: cs.reps,
//                   weight: cs.weight,
//                   restTime: cs.restTime,
//                   order: cs.order,
//                   isBodyWeight: cs.isBodyWeight,
//                   isWarmup: cs.isWarmup,
//                   repsInReserve: cs.repsInReserve,
//                 },
//               })),
//               deleteMany: (we?.coreSets ?? [])
//                 .filter((cs) => cs.crudOperation === "delete")
//                 .map((cs) => ({ id: cs.id })),
//             },
//           },
//           create: {
//             order: we.order ?? 1,
//             notes: we.notes,
//             isActive: we.isActive,
//             exercise: {
//               connect: {
//                 id: we.exerciseId,
//               },
//             },
//             coreSets: {
//               create: we.coreSets?.map((cs) => ({
//                 reps: cs.reps,
//                 weight: cs.weight,
//                 restTime: cs.restTime,
//                 isBodyWeight: cs.isBodyWeight,
//                 order: cs.order,
//                 isWarmup: cs.isWarmup,
//                 repsInReserve: cs.repsInReserve,
//               })),
//             },
//           },
//         })),
//         deleteMany: (dto.workoutExercises ?? [])
//           .filter((we) => we.crudOperation === "delete")
//           .map((we) => ({ id: we.id })),
//       },
//     },
