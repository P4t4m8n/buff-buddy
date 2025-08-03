import { TCreateUserWorkoutInput } from "./userWorkout.validations";
import { prisma } from "../../../prisma/prisma";
import { IUserWorkout } from "./userWorkouts.model";

import { userWorkoutSql } from "./userWorkout.sql";
import { userStrengthSetsSQL } from "../userSets/userStrengthSets/userStrengthSets.sql";
import { userCardioSetsSQL } from "../userSets/userCardioSets/userCardioSets.sql";
import { userSQL } from "../users/users.sql";
import { workoutSQL } from "../workouts/workout.sql";

export const userWorkoutService = {
  create: async (dto: TCreateUserWorkoutInput): Promise<IUserWorkout> => {
    return (await prisma.userWorkout.create({
      data: userWorkoutSql.getCreateUserWork(dto),
      select: userWorkoutSql.USER_WORKOUT_SELECT,
    })) as unknown as IUserWorkout;
  },
  getLastWorkout: async (
    workoutId: string,
    userId: string
  ): Promise<IUserWorkout | null> => {
    return (await prisma.userWorkout.findFirst({
      where: {
        workoutId,
        ownerId: userId,
        dateCompleted: {
          not: null,
        },
      },
      orderBy: {
        dateCompleted: "desc",
      },
      select: userWorkoutSql.USER_WORKOUT_SELECT,
    })) as unknown as IUserWorkout;
  },

  /* 
  TODO?? Not sure if this is needed will start with two  api
  calls for workout ot get the current and the least one.
  this a little bit of overhead but better for maintain
    */
  // getUserWorkoutToEdit: async (
  //   workoutId: string
  // ): Promise<IUserWorkoutEdit | null> => {
  //   return await prisma.userWorkout.findUnique({
  //     where: {
  //       id: workoutId,
  //     },
  //     select: {
  //       id: true,
  //       dateCompleted: true,
  //       ownerId: true,
  //       programId: true,
  //       workout: {
  //         select: {
  //           id: true,
  //           name: true,
  //           notes: true,
  //           userWorkouts: {
  //             where: {
  //               NOT: { workoutId },
  //               dateCompleted: { not: null },
  //             },
  //             orderBy: { dateCompleted: "desc" },
  //             take: 1,
  //             select: {
  //               id: true,
  //               dateCompleted: true,
  //               ownerId: true,
  //               userWorkoutExercises: {
  //                 select: {
  //                   id: true,
  //                   workoutExercise: {
  //                     select: {
  //                       id: true,
  //                       order: true,
  //                       notes: true,
  //                       exercise: {
  //                         select: {
  //                           id: true,
  //                           name: true,
  //                           youtubeUrl: true,
  //                           types: true,
  //                           equipment: true,
  //                           muscles: true,
  //                         },
  //                       },
  //                       coreSet: {
  //                         select: {
  //                           id: true,
  //                           hasWarmup: true,
  //                           restTime: true,
  //                           createdAt: true,
  //                           updatedAt: true,
  //                           numberOfSets: true,
  //                           reps: {
  //                             take: 1,
  //                             orderBy: { createdAt: "asc" },
  //                             select: {
  //                               id: true,
  //                               reps: true,
  //                             },
  //                           },
  //                           weight: {
  //                             take: 1,
  //                             orderBy: { createdAt: "asc" },
  //                             select: {
  //                               id: true,
  //                               weight: true,
  //                               isBodyWeight: true,
  //                             },
  //                           },
  //                         },
  //                       },
  //                     },
  //                   },
  //                   userSets: {
  //                     select: {
  //                       id: true,
  //                       reps: true,
  //                       weight: true,
  //                       isWarmup: true,
  //                       isCompleted: true,
  //                       isMuscleFailure: true,
  //                       isJointPain: true,
  //                       isBodyWeight: true,
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       workoutId: true,
  //       userWorkoutExercises: {
  //         select: {
  //           id: true,
  //           workoutExercise: {
  //             select: {
  //               id: true,
  //               order: true,
  //               notes: true,
  //               exercise: {
  //                 select: {
  //                   id: true,
  //                   name: true,
  //                   youtubeUrl: true,
  //                   types: true,
  //                   equipment: true,
  //                   muscles: true,
  //                 },
  //               },
  //               coreSet: {
  //                 select: {
  //                   id: true,
  //                   hasWarmup: true,
  //                   restTime: true,
  //                   createdAt: true,
  //                   updatedAt: true,
  //                   numberOfSets: true,
  //                   reps: {
  //                     take: 1,
  //                     orderBy: { createdAt: "asc" },
  //                     select: {
  //                       id: true,
  //                       reps: true,
  //                     },
  //                   },
  //                   weight: {
  //                     take: 1,
  //                     orderBy: { createdAt: "asc" },
  //                     select: {
  //                       id: true,
  //                       weight: true,
  //                       isBodyWeight: true,
  //                     },
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //           userSets: {
  //             select: {
  //               id: true,
  //               reps: true,
  //               weight: true,
  //               isWarmup: true,
  //               isCompleted: true,
  //               isMuscleFailure: true,
  //               isJointPain: true,
  //               isBodyWeight: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // },
};
