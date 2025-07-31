import { TCreateUserWorkoutInput } from "./userWorkout.validations";
import { prisma } from "../../../prisma/prisma";
import { IUserWorkout, IUserWorkoutEdit } from "./userWorkouts.model";
import { exerciseSQL } from "../exercises/exercise.sql";
import { coreSetsSQL } from "../coreSets/coreSets.sql";
import { userWorkoutSql } from "./userWorkout.sql";

export const userWorkoutService = {
  create: async (dto: TCreateUserWorkoutInput): Promise<IUserWorkout> => {
    return await prisma.userWorkout.create({
      data: {
        dateCompleted: dto.dateCompleted,
        owner: {
          connect: {
            id: dto.ownerId,
          },
        },
        program: {
          connect: {
            id: dto.programId,
          },
        },
        workout: {
          connect: {
            id: dto.workoutId,
          },
        },
        userWorkoutExercises: {
          create: dto.workoutExercises.map((we) => ({
            workoutExercise: {
              connect: {
                id: we.workoutExerciseId,
              },
            },
            userSets: {
              create: we.userSets.map((us) => ({
                reps: us.reps,
                weight: us.weight,
                isBodyWeight: us.isBodyWeight,
                isCompleted: us.isCompleted,
                isWarmup: us.isWarmup,
                isMuscleFailure: us.isMuscleFailure,
                isJointPain: us.isJointPain,
                user: {
                  connect: {
                    id: dto.ownerId,
                  },
                },
              })),
            },
          })),
        },
      },
      select: userWorkoutSql.USER_EXERCISE_SELECT,
    });
  },
  getLastWorkout: async (workoutId: string): Promise<IUserWorkout | null> => {
    return await prisma.userWorkout.findFirst({
      where: {
        workoutId,
        dateCompleted: {
          not: null,
        },
      },
      orderBy: {
        dateCompleted: "desc",
      },
      select: userWorkoutSql.USER_EXERCISE_SELECT,
    });
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
