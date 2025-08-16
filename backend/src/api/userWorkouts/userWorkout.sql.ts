import { Prisma } from "../../../prisma/generated/prisma";
import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import { exerciseSQL } from "../exercises/exercise.sql";
import { programsSQL } from "../programs/program.sql";
import { userSQL } from "../users/users.sql";
import { userCardioSetsSQL } from "../userSets/userCardioSets/userCardioSets.sql";
import { userStrengthSetsSQL } from "../userSets/userStrengthSets/userStrengthSets.sql";
import { workoutSQL } from "../workouts/workout.sql";
import { TCreateUserWorkoutInput } from "./userWorkout.validations";

const USER_WORKOUT_EXERCISE_SELECT: Prisma.UserWorkoutExerciseSelect = {
  id: true,
  workoutExercise: {
    select: {
      id: true,
      order: true,
      notes: true,
      exercise: {
        select: exerciseSQL.EXERCISE_SELECT,
      },
      coreStrengthSet: {
        select: coreStrengthSetsSQL.CORE_STRENGTH_SET_SELECT,
      },
      coreCardioSet: {
        select: coreCardioSetsSQL.CORE_CARDIO_SET_SELECT,
      },
    },
  },
  userStrengthSet: {
    select: userStrengthSetsSQL.CORE_STRENGTH_SET_SELECT,
  },
  userCardioSet: {
    select: userCardioSetsSQL.CORE_CARDIO_SET_SELECT,
  },
};

const USER_WORKOUT_SELECT: Prisma.UserWorkoutSelect = {
  id: true,
  dateCompleted: true,
  program: {
    select: programsSQL.SMALL_PROGRAM_SELECT,
  },
  owner: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
  workout: {
    select: {
      id: true,
      name: true,
      notes: true,
    },
  },
  userWorkoutExercises: {
    select: {
      id: true,
      workoutExercise: {
        select: workoutSQL.WORKOUT_EXERCISE_SELECT,
      },
      userCardioSet: {
        select: userCardioSetsSQL.CORE_CARDIO_SET_SELECT,
      },
      userStrengthSet: {
        select: userStrengthSetsSQL.CORE_STRENGTH_SET_SELECT,
      },
    },
  },
};

const getCreateUserWork = (
  dto: TCreateUserWorkoutInput
): Prisma.UserWorkoutCreateInput => {
  return {
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
      create: dto.userWorkoutExercises.map((we) => ({
        workoutExercise: {
          connect: {
            id: we.workoutExerciseId,
          },
        },
        userStrengthSet: {
          create: we.userStrengthSets?.map((us) =>
            userStrengthSetsSQL.getCreateUserStrengthSet(us)
          ),
        },
        userCardioSet: {
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
  getCreateUserWork,
};
