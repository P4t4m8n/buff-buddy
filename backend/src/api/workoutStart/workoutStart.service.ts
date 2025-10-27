import { workoutUtil } from "../workouts/workouts.util";
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
        maxNumberOfReps,
        numberOfSets,
        isDropSet,
        isMyoReps,
        isBodyWeight,
        hasWarmup,
        id: workoutExerciseId,
      } = workoutExercise;

      if (!userWorkouts || !userWorkouts.length) {
        return {
          ..._getDefaultUserWorkoutExercise({
            hasWarmup,
            isBodyWeight,
            workoutExerciseId,
            workoutLevelData,
            workoutGoalData,
          }),
          exercise: workoutExercise.exercise,
        };
      }

      return {
        ..._getPlanedUserWorkoutExercise({
          hasWarmup,
          isBodyWeight,
          workoutExerciseId,
          userWorkouts,
          workoutLevelData,
          workoutGoalData,
          maxNumberOfReps: maxNumberOfReps ?? workoutGoalData.maxReps,
          numberOfSets: numberOfSets ?? workoutGoalData.minSets,
        }),
        exercise: workoutExercise.exercise,
      };
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

const _getStrengthWarmupSet = ({
  isBodyWeight,
  weight,
}: {
  isBodyWeight?: boolean;
  weight?: number | null;
}): IUserStrengthSetEditDTO => {
  const warmupWeight = isBodyWeight
    ? 0
    : weight
    ? Math.round((weight ?? 0) * 0.35)
    : 0;
  return {
    id: getTempId("temp/warmup/"),

    isCompleted: false,
    isMuscleFailure: false,
    isJointPain: false,
    isBodyWeight,
    isWarmup: true,
    order: 0, // Warmup set is always the first set
    goalSet: { reps: 10, weight: warmupWeight },
  };
};

const _getDefaultUserWorkoutExercise = ({
  isBodyWeight = false,
  hasWarmup = true,
  workoutExerciseId,
  numberOfSets,
  workoutLevelData,
  workoutGoalData,
}: {
  workoutExerciseId: string;
  isBodyWeight?: boolean;
  hasWarmup?: boolean;
  numberOfSets?: number;
  workoutLevelData: TWorkoutLevelData;
  workoutGoalData: TWorkoutGoalData;
}): IUserWorkoutExercisesEditDTO => {
  const { minReps, maxReps, minSets, maxSets, minRestTime, maxRestTime } =
    workoutGoalData;
  const { minWeight } = workoutLevelData;
  const userStrengthSets = Array.from({ length: numberOfSets ?? minSets }).map(
    (_, idx) => {
      const goalSet: IGoalSet = {
        reps: minReps,
        weight: isBodyWeight ? 0 : minWeight,
      };
      return _getEmptyStrength({
        order: idx + 1,
        goalSet,
        isBodyWeight,
      });
    }
  );

  if (hasWarmup) {
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
    id: getTempId(),
  };
};

const _getPlanedUserWorkoutExercise = ({
  isBodyWeight = false,
  hasWarmup = true,
  workoutExerciseId,
  userWorkouts,
  numberOfSets,
  maxNumberOfReps,
  workoutGoalData,
  workoutLevelData,
}: {
  workoutExerciseId: string;
  isBodyWeight?: boolean;
  hasWarmup?: boolean;
  userWorkouts: IUserWorkout[];
  numberOfSets: number;
  maxNumberOfReps: number;
  workoutGoalData: TWorkoutGoalData;
  workoutLevelData: TWorkoutLevelData;
}): IUserWorkoutExercisesEditDTO => {
  const lastUserWorkouts =
    userWorkouts
      ?.map((userWorkout) => {
        return userWorkout.userWorkoutExercises
          .filter(
            (userWorkoutExercise) =>
              userWorkoutExercise?.workoutExercise?.id === workoutExerciseId
          )
          .map((x) => ({ ...x, dateCompleted: userWorkout.dateCompleted }));
      })
      .flat()
      .sort((a, b) => {
        const aTime = a.dateCompleted ? new Date(a.dateCompleted).getTime() : 0;
        const bTime = b.dateCompleted ? new Date(b.dateCompleted).getTime() : 0;
        return bTime - aTime;
      }) ?? [];

  const isComplete =
    lastUserWorkouts &&
    lastUserWorkouts.length > 2 &&
    lastUserWorkouts.every((luw) =>
      luw.userStrengthSets?.every((uss) => (uss?.reps ?? 0) >= maxNumberOfReps)
    );

  const lastSetsArr =
    lastUserWorkouts[0]?.userStrengthSets?.sort(
      (a, b) => (a.order ?? 1) - (b.order ?? 0)
    ) ?? [];

  let userStrengthSets: IUserStrengthSetEditDTO[] = [];

  if (isComplete) {
    userStrengthSets = _handleWeightIncrease({
      isBodyWeight,
      lastSet: lastSetsArr[lastSetsArr.length - 1],
      workoutGoalData,
      workoutLevelData,
      numberOfSets,
      maxNumberOfReps,
    });
  } else {
    userStrengthSets = Array.from({
      length: numberOfSets,
    }).map((_, idx) => {
      const lastSet = lastSetsArr[idx];
      return _handleRepsIncrease({
        lastSet,
        maxNumberOfReps,
        idx,
        isBodyWeight,
      });
    });
  }

  if (hasWarmup) {
    userStrengthSets.push(
      _getStrengthWarmupSet({
        isBodyWeight,
        weight:
          userStrengthSets[userStrengthSets.length - 1].goalSet?.weight ?? 0,
      })
    );
  }

  return {
    userStrengthSets,
    workoutExerciseId,
    id: getTempId(),
  };
};

const _handleWeightIncrease = ({
  isBodyWeight = false,
  hasWarmUp = true,
  workoutGoalData,
  workoutLevelData,
  lastSet,
  numberOfSets,
  maxNumberOfReps,
}: {
  isBodyWeight?: boolean;
  hasWarmUp?: boolean;
  workoutGoalData: TWorkoutGoalData;
  workoutLevelData: TWorkoutLevelData;
  lastSet: IUserStrengthSet;
  numberOfSets?: number;
  maxNumberOfReps?: number;
}): IUserStrengthSetEditDTO[] => {
  const { minReps, minSets } = workoutGoalData;
  const { weightJump } = workoutLevelData;
  const userStrengthSets = Array.from({ length: numberOfSets ?? minSets }).map(
    (_, idx) => {
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
    }
  );

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

const _handleRepsIncrease = ({
  lastSet,
  maxNumberOfReps,
  idx,
  isBodyWeight,
}: {
  lastSet: IUserStrengthSet;
  maxNumberOfReps: number;
  idx: number;
  isBodyWeight?: boolean;
}) => {
  const lastWeight = lastSet.weight;
  const lastRep = lastSet?.reps ?? 0;
  const goalSet: IGoalSet = {
    reps: lastRep >= maxNumberOfReps ? maxNumberOfReps : lastRep + 1,
    weight: lastWeight ?? 0,
  };
  return _getEmptyStrength({
    order: idx + 1,
    goalSet,
    lastUserSet: lastSet,
    isBodyWeight,
  });
};
export const workoutPlannerService = { createUserWorkoutPlan };
