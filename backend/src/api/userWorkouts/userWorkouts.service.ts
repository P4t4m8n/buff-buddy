import { TCreateUserWorkoutInput } from "./userWorkout.validations";
import { prisma } from "../../../prisma/prisma";
import { PROGRAM_SELECT } from "../programs/program.sql";
import { SMALL_USER_SELECT } from "../users/users.sql";
import { WORKOUT_EXERCISE_SELECT } from "../workouts/workout.sql";

export const userWorkoutService = {
  create: async (dto: TCreateUserWorkoutInput) => {
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
      select: {
        id: true,
        dateCompleted: true,
        program: { select: PROGRAM_SELECT },
        owner: { select: SMALL_USER_SELECT },
        userWorkoutExercises: {
          select: {
            id: true,
            workoutExercise: {
              select: WORKOUT_EXERCISE_SELECT,
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
