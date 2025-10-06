import { exerciseSQL } from "../exercises/exercise.sql";
import { programsSQL } from "../programs/program.sql";
import { userCardioSetsSQL } from "../userSets/userCardioSets/userCardioSets.sql";
import { userStrengthSetsSQL } from "../userSets/userStrengthSets/userStrengthSets.sql";

import type { Prisma } from "../../../prisma/generated/prisma";
import type { TUserWorkoutCreateValidatedInput } from "../../../../shared/validations/userWorkout.validations";
import { userSQL } from "../users/users.sql";

const USER_WORKOUT_EXERCISE_SELECT = {
  id: true,
  workoutExercise: {
    select: {
      id: true,
      order: true,
      notes: true,
      exercise: {
        select: exerciseSQL.EXERCISE_SELECT,
      },
    },
  },
  userCardioSets: {
    select: userCardioSetsSQL.CORE_CARDIO_SET_SELECT,
  },
  userStrengthSets: {
    select: userStrengthSetsSQL.CORE_STRENGTH_SET_SELECT,
  },
};

const USER_WORKOUT_SELECT = {
  id: true,
  dateCompleted: true,
  program: {
    select: programsSQL.SMALL_PROGRAM_SELECT,
  },
  owner: {
    select: userSQL.SMALL_USER_SELECT,
  },
  workout: {
    select: {
      id: true,
      name: true,
      notes: true,
    },
  },
  userWorkoutExercises: {
    select: USER_WORKOUT_EXERCISE_SELECT,
  },
};

const getCreateUserWork = (
  dto: TUserWorkoutCreateValidatedInput
): Prisma.UserWorkoutCreateInput => {
  return {
    dateCompleted: dto.dateCompleted,
    owner: {
      connect: {
        id: dto.ownerId!,
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
      create: dto.userWorkoutExercises.map((we) => ({
        workoutExercise: {
          connect: {
            id: we.workoutExerciseId,
          },
        },
        userStrengthSets: {
          create: we.userStrengthSets
            ?.filter((us) => !us.isWarmup)
            .map((us) => userStrengthSetsSQL.getCreateUserStrengthSet(us)),
        },
        userCardioSets: {
          create: we.userCardioSets?.map((uc) =>
            userCardioSetsSQL.getCreateUserCardioSet(uc)
          ),
        },
      })),
    },
  };
};

export const userWorkoutSql = {
  USER_WORKOUT_SELECT,
  USER_WORKOUT_EXERCISE_SELECT,
  getCreateUserWork,
};
