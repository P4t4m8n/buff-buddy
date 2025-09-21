import { workoutUtil } from "../workouts/workout.util";
import { getTempId } from "../../../../shared/utils/getTempId";

import type {
  IGoalSet,
  IUserStrengthSetEditDTO,
} from "../../../../shared/models/userStrengthSet.model";
import type {
  IUserWorkoutEditDTO,
  IUserWorkoutExercisesEditDTO,
} from "../../../../shared/models/userWorkout";
import type { IProgramWorkout } from "../programs/programs.models";
import type { IUserWorkout } from "../userWorkouts/userWorkouts.model";
import {
  TWorkoutGoal,
  TWorkoutLevel,
} from "../../../../shared/models/program.model";
import { AppError } from "../../shared/services/Error.service";
import { IUserStrengthSet } from "../userSets/userStrengthSets/userStrengthSets.model";

type TWorkoutGoalData = {
  minReps: number;
  maxReps: number;
  minSets: number;
  maxSets: number;
  minRestTime: number;
  maxRestTime: number;
};
type TWorkoutLevelData = {
  minWeight: number;
  weightJump: number;
};

type TWorkoutGoals = Record<TWorkoutGoal, TWorkoutGoalData>;
type TWorkoutLevels = Record<TWorkoutLevel, TWorkoutLevelData>;

const workoutGoals: TWorkoutGoals = {
  hypertrophy: {
    minReps: 8,
    maxReps: 15,
    minSets: 3,
    maxSets: 3,
    minRestTime: 30,
    maxRestTime: 120,
  },
};
const workoutLevels: TWorkoutLevels = {
  beginner: {
    minWeight: 0.5,
    weightJump: 0.5,
  },
};

const createUserWorkoutPlan = ({
  programWorkout,
  userWorkouts,
  ownerId,
}: {
  programWorkout: IProgramWorkout;
  userWorkouts?: IUserWorkout[];
  ownerId?: string;
}): IUserWorkoutEditDTO => {
  const {
    workout,
    workoutGoal = "hypertrophy",
    workoutLevel,
    programId,
  } = programWorkout;

  if (!workout) {
    throw AppError.create("Unexpected no workout");
  }
  const { workoutExercises } = workout;

  const workoutGoalData = workoutGoals[workoutGoal];
  const workoutLevelData = workoutLevels[workoutLevel];

  const userWorkoutExercises: IUserWorkoutExercisesEditDTO[] =
    workoutExercises?.map((workoutExercise) => {
      const {
        hasWarmUp,
        isBodyWeight,
        id: workoutExerciseId,
      } = workoutExercise;

      if (!userWorkouts || !userWorkouts.length) {
        return _getDefaultUserWorkoutExercise({
          hasWarmUp,
          isBodyWeight,
          workoutExerciseId,
          workoutLevelData,
          workoutGoalData,
        });
      }

      return _getPlanedUserWorkoutExercise({
        hasWarmUp,
        isBodyWeight,
        workoutExerciseId,
        userWorkouts,
        workoutLevelData,
        workoutGoalData,
      });
    }) ?? [];

  return {
    userWorkoutExercises,
    dateCompleted: new Date(),
    programId,
    ownerId,
    workoutId: workout.id,
    workout: workoutUtil.buildDTO(workout),
  };
};

const _getEmptyStrength = ({
  order,
  goalSet,
  lastUserSet,
  isBodyWeight,
}: {
  order: number;
  goalSet: IGoalSet;
  lastUserSet?: IUserStrengthSetEditDTO;
  isBodyWeight?: boolean;
}): IUserStrengthSetEditDTO => {
  return {
    id: getTempId("temp"),
    lastSet: {
      lastReps: lastUserSet?.reps ?? null,
      lastWeight: lastUserSet?.weight ?? null,
      lastSkippedReason: lastUserSet?.skippedReason ?? null,
      lastIsMuscleFailure: lastUserSet?.isMuscleFailure ?? false,
      lastIsJointPain: lastUserSet?.isJointPain ?? false,
    },
    goalSet,
    reps: null,
    weight: null,
    isCompleted: false,
    isMuscleFailure: false,
    isJointPain: false,
    crudOperation: "create",
    isBodyWeight,
    order,
  };
};

//TODO??Hardcoded at the moment improve later
const _getStrengthWarmupSet = ({
  isBodyWeight,
  weight,
}: {
  isBodyWeight?: boolean;
  weight?: number | null;
}): IUserStrengthSetEditDTO => {
  const warmupWeight = isBodyWeight
    ? null
    : weight
    ? Math.round((weight ?? 0) * 0.35)
    : null;
  return {
    id: getTempId("temp/warmup"),
    reps: 10,
    weight: warmupWeight,
    isCompleted: false,
    isMuscleFailure: false,
    isJointPain: false,
    isBodyWeight,
    order: 0, // Warmup set is always the first set
  };
};

const _getDefaultUserWorkoutExercise = ({
  isBodyWeight = false,
  hasWarmUp = true,
  workoutExerciseId,
  workoutGoalData,
  workoutLevelData,
}: {
  workoutExerciseId: string;
  isBodyWeight?: boolean;
  hasWarmUp?: boolean;
  workoutGoalData: TWorkoutGoalData;
  workoutLevelData: TWorkoutLevelData;
}): IUserWorkoutExercisesEditDTO => {
  const { minReps, maxReps, minSets, maxSets, minRestTime, maxRestTime } =
    workoutGoalData;
  const { minWeight } = workoutLevelData;
  const userStrengthSets = Array.from({ length: minSets }).map((_, idx) => {
    let goalSet: IGoalSet = {
      reps: minReps,
      weight: isBodyWeight ? 0 : minWeight,
    };
    return _getEmptyStrength({
      order: idx + 1,
      goalSet,
      isBodyWeight,
    });
  });

  if (hasWarmUp) {
    userStrengthSets.push(
      _getStrengthWarmupSet({
        isBodyWeight,
        weight: minWeight,
      })
    );
  }
  return {
    userStrengthSets,
    workoutExerciseId,
  };
};

const _getPlanedUserWorkoutExercise = ({
  isBodyWeight = false,
  hasWarmUp = true,
  workoutExerciseId,
  userWorkouts,
  workoutGoalData,
  workoutLevelData,
}: {
  workoutExerciseId: string;
  isBodyWeight?: boolean;
  hasWarmUp?: boolean;
  userWorkouts: IUserWorkout[];
  workoutGoalData: TWorkoutGoalData;
  workoutLevelData: TWorkoutLevelData;
}): IUserWorkoutExercisesEditDTO => {
  const lastUserWorkouts = userWorkouts
    ?.map((userWorkout) => {
      return userWorkout.userWorkoutExercises
        .filter(
          (userWorkoutExercise) =>
            userWorkoutExercise.workoutExercise.id === workoutExerciseId
        )
        .map((x) => ({ ...x, dateCompleted: userWorkout.dateCompleted }));
    })
    .flat()
    .sort((a, b) => {
      const aTime = a.dateCompleted ? new Date(a.dateCompleted).getTime() : 0;
      const bTime = b.dateCompleted ? new Date(b.dateCompleted).getTime() : 0;
      return aTime - bTime;
    });

  const isComplete = lastUserWorkouts?.every((luw) =>
    luw.userStrengthSets?.every((uss) => uss.reps >= workoutGoalData.maxReps)
  );

  const lastSetArr = lastUserWorkouts![0].userStrengthSets!.sort(
    (a, b) => (a.order ?? 1) - (b.order ?? 0)
  );
  if (isComplete) {
    //Handle weight increase
    return {
      workoutExerciseId,
      userStrengthSets: _handleWeightIncrease({
        isBodyWeight,
        hasWarmUp,
        lastSet: lastSetArr[lastSetArr.length - 1],
        workoutGoalData,
        workoutLevelData,
      }),
    };
  }

  const userStrengthSets = Array.from({ length: workoutGoalData.minSets }).map(
    (_, idx) => {
      const lastSet = lastSetArr[idx];

      const lastWeight = lastSet.weight;
      const lastRep = lastSet.reps;
      let goalSet: IGoalSet = {
        reps:
          lastRep >= workoutGoalData.maxReps
            ? workoutGoalData.maxReps
            : lastRep + 1,
        weight: lastWeight ?? 0,
      };
      return _getEmptyStrength({
        order: idx + 1,
        goalSet,
        lastUserSet: lastSet,
        isBodyWeight,
      });
    }
  );

  if (hasWarmUp) {
    userStrengthSets.push(
      _getStrengthWarmupSet({
        isBodyWeight,
        weight: lastSetArr[lastSetArr.length - 1].weight,
      })
    );
  }
  return {
    userStrengthSets,
    workoutExerciseId,
  };
};

const _handleWeightIncrease = ({
  isBodyWeight = false,
  hasWarmUp = true,
  workoutGoalData,
  workoutLevelData,
  lastSet,
}: {
  isBodyWeight?: boolean;
  hasWarmUp?: boolean;
  workoutGoalData: TWorkoutGoalData;
  workoutLevelData: TWorkoutLevelData;
  lastSet: IUserStrengthSet;
}): IUserStrengthSetEditDTO[] => {
  const { minReps, minSets } = workoutGoalData;
  const { weightJump } = workoutLevelData;
  const userStrengthSets = Array.from({ length: minSets }).map((_, idx) => {
    const newWeight = (lastSet.weight ?? 0) + weightJump;

    let goalSet: IGoalSet = {
      reps: minReps,
      weight: newWeight,
    };
    return _getEmptyStrength({
      order: idx + 1,
      goalSet,
      lastUserSet: lastSet,
      isBodyWeight,
    });
  });

  if (hasWarmUp) {
    userStrengthSets.push(
      _getStrengthWarmupSet({
        isBodyWeight,
        weight: (lastSet.weight ?? 0) + weightJump,
      })
    );
  }
  return userStrengthSets;
};
export const workoutPlannerService = { createUserWorkoutPlan };
