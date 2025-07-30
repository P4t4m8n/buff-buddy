import { TCreateUserWorkoutInput } from "./userWorkout.validations";
import { prisma } from "../../../prisma/prisma";
import { IUserWorkout } from "./userWorkouts.model";
import { exerciseSQL } from "../exercises/exercise.sql";
import { coreSetsSQL } from "../coreSets/coreSets.sql";
import { userWorkoutSql } from "./userWorkout.sql";

export type GetUserWorkoutToEditReturn = Awaited<
  ReturnType<typeof userWorkoutService.getUserWOrkoutToEdit>
>;


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
  getUserWOrkoutToEdit: async (id: string) => {
    return await prisma.userWorkout.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        dateCompleted: true,
        ownerId: true,
        programId: true,
        workout: {
          select: {
            id: true,
            name: true,
            notes: true,
            userWorkouts: {
              where: {
                NOT: { id },
                dateCompleted: { not: null },
              },
              orderBy: { dateCompleted: "desc" },
              take: 1,
              select: {
                id: true,
                dateCompleted: true,
                ownerId: true,
                userWorkoutExercises: {
                  select: {
                    id: true,
                    workoutExercise: {
                      select: {
                        id: true,
                        order: true,
                        notes: true,
                        exercise: {
                          select: exerciseSQL.EXERCISE_SELECT,
                        },
                        coreSet: {
                          select: coreSetsSQL.CORE_SET_SELECT,
                        },
                      },
                    },
                    userSets: {
                      select: {
                        id: true,
                        reps: true,
                        weight: true,
                        isWarmup: true,
                        isCompleted: true,
                        isMuscleFailure: true,
                        isJointPain: true,
                        isBodyWeight: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        workoutId: true,
        userWorkoutExercises: {
          select: {
            id: true,
            workoutExercise: {
              select: {
                id: true,
                order: true,
                notes: true,
                exercise: {
                  select: exerciseSQL.EXERCISE_SELECT,
                },
                coreSet: {
                  select: coreSetsSQL.CORE_SET_SELECT,
                },
              },
            },
            userSets: {
              select: {
                id: true,
                reps: true,
                weight: true,
                isWarmup: true,
                isCompleted: true,
                isMuscleFailure: true,
                isJointPain: true,
                isBodyWeight: true,
              },
            },
          },
        },
      },
    });
  },
};
