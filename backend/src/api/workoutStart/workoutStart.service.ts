import { workoutUtil } from "../workouts/workout.util";
import { getTempId } from "../../../../shared/utils/getTempId";

import type { IUserStrengthSetEditDTO } from "../../../../shared/models/userStrengthSet.model";
import type {
  IUserWorkoutEditDTO,
  IUserWorkoutExercisesEditDTO,
} from "../../../../shared/models/userWorkout";
import type { IProgramWorkout } from "../programs/programs.models";
import type { IUserCardioSet } from "../userSets/userCardioSets/userCardioSets.model";
import type { IUserStrengthSet } from "../userSets/userStrengthSets/userStrengthSets.model";
import type { IUserWorkout } from "../userWorkouts/userWorkouts.model";
import type { IWorkoutExercise } from "../workouts/workouts.models";

const BASE_MINIMUM_WEIGHT = 0.5; //kg
const BASE_REPS_AMOUNT = 10;
const BASE_MAX_REPS = 15;
const BASE_SETS_AMOUNT = 3;

const createUserWorkoutPlan = ({
  programWorkout,
  userWorkouts,
  ownerId,
}: {
  programWorkout: IProgramWorkout;
  userWorkouts?: IUserWorkout[];
  ownerId?: string;
}): IUserWorkoutEditDTO => {
  const { workout, workoutGoal, level, programId } = programWorkout;

  const userWorkoutExercises =
    workout?.workoutExercises?.map((workoutExercise) =>
      _createUserWorkoutExercise({
        workoutExercise,
        userWorkouts,
        workoutGoal,
        level,
      })
    ) ?? [];

  return {
    userWorkoutExercises,
    dateCompleted: new Date(),
    programId,
    ownerId,
    workoutId: workout.id,
    workout: workoutUtil.buildDTO(workout),
  };
};

const _createUserWorkoutExercise = ({
  workoutExercise,
  userWorkouts,
  workoutGoal,
  level,
}: {
  workoutExercise: IWorkoutExercise;
  userWorkouts?: IUserWorkout[];
  workoutGoal: string | null | undefined;
  level: string | null | undefined;
}): IUserWorkoutExercisesEditDTO => {
  const {
    exercise,
    hasWarmUp,
    isBodyWeight,
    order,
    notes,
    id: workoutExerciseId,
  } = workoutExercise;

  const { id: exerciseId, type } = exercise ?? {};

  const item: IUserWorkoutExercisesEditDTO = {
    id: getTempId(),
    order,
    notes,
    exercise,
    workoutExerciseId: workoutExerciseId!,
  };

  const lastWorkouts = _getLastWorkoutExercises(userWorkouts, exerciseId);
  let sets: IUserStrengthSetEditDTO[] = [];
  switch (type) {
    case "strength": {
      sets = _getCreateUserStrengthSetWorkoutGoal({
        lastWorkouts,
        hasWarmUp,
        isBodyWeight,
      });
      item.userStrengthSets = sets;
    }
    default:
      sets = [];
  }

  return item;
};

const _getLastWorkoutExercises = (
  userWorkouts?: IUserWorkout[],
  exerciseId?: string
) => {
  return userWorkouts
    ?.map((uw) =>
      uw.userWorkoutExercises
        ?.filter((uwe) => uwe.workoutExercise.exercise?.id === exerciseId)
        .map((uwe) => ({
          ...uwe,
          dateCompleted: uw.dateCompleted ?? null,
        }))
    )
    .flat()
    .sort(
      (a, b) =>
        new Date(a.dateCompleted!).getTime() -
        new Date(b.dateCompleted!).getTime()
    );
};

const _getUserLastSet = (lastSet: IUserStrengthSet | null | undefined) => {
  return !lastSet
    ? null
    : {
        lastIsJointPain: lastSet?.isJointPain,
        lastReps: lastSet?.reps,
        lastSkippedReason: lastSet?.skippedReason,
        lastWeight: lastSet?.weight,
        lastIsMuscleFailure: lastSet?.isMuscleFailure,
      };
};

const _createUserStrengthSet = ({
  isBodyWeight,
  lastSet,
  order,
  goalReps,
  goalWeight,
}: {
  isBodyWeight?: boolean | undefined;
  lastSet?: IUserStrengthSet | null | undefined;
  order?: number;
  goalReps?: number;
  goalWeight?: number | null;
}): IUserStrengthSetEditDTO => {
  return {
    lastSet: _getUserLastSet(lastSet),
    goalSet: {
      reps: goalReps ? goalReps : BASE_REPS_AMOUNT,
      weight: isBodyWeight
        ? null
        : goalWeight
        ? goalWeight
        : BASE_MINIMUM_WEIGHT,
    },
    id: getTempId(),
    reps: null,
    weight: null,
    isCompleted: false,
    isMuscleFailure: false,
    isJointPain: false,
    crudOperation: "create",
    isBodyWeight,
    order: order,
  };
};

const _getCreateUserStrengthSetWorkoutGoal = ({
  lastWorkouts,
  hasWarmUp,
  isBodyWeight,
}: {
  lastWorkouts:
    | {
        dateCompleted: Date | null;
        id: string;
        workoutExercise: IWorkoutExercise;
        userStrengthSet?: IUserStrengthSet[] | null;
        userCardioSet?: IUserCardioSet[] | null;
      }[]
    | undefined;
  hasWarmUp: boolean | undefined;
  isBodyWeight?: boolean | undefined;
}) => {
  let sets: IUserStrengthSetEditDTO[] = [];
  if (!lastWorkouts || !lastWorkouts.length) {
    sets = Array.from({
      length: BASE_SETS_AMOUNT,
    }).map((_, idx) =>
      _createUserStrengthSet({ isBodyWeight, order: idx + 1 })
    );
  } else {
    const lastWorkout = lastWorkouts[0];
    sets = _planStrengthSet({ lastWorkouts, isBodyWeight }) ?? [];
  }

  if (hasWarmUp) {
    const warmupSet = _getStrengthWarmupSet(
      !!isBodyWeight,
      BASE_MINIMUM_WEIGHT,
      BASE_REPS_AMOUNT
    );

    warmupSet.isWarmup = true;
    sets.unshift(warmupSet);
  }

  return sets;
};

const _planStrengthSet = ({
  lastWorkouts,
  isBodyWeight,
}: {
  lastWorkouts: {
    dateCompleted: Date | null;
    id: string;
    workoutExercise: IWorkoutExercise;
    userStrengthSets?: IUserStrengthSet[] | null;
    userCardioSets?: IUserCardioSet[] | null;
  }[];
  isBodyWeight?: boolean | undefined;
}) => {
  const lastWorkout = lastWorkouts[0];

  let isCompleteSets =
    lastWorkout.userStrengthSets?.every(
      (set) => (set?.reps ?? 0) >= BASE_MAX_REPS
    ) ?? false;

  if (!isCompleteSets) {
    return Array.from({
      length: BASE_SETS_AMOUNT,
    }).map((_, idx) => {
      const filteredSets = lastWorkouts
        .filter((w) =>
          w.userStrengthSets?.filter((uss) => uss.order === idx + 1)
        )
        .map((w) => w.userStrengthSets)
        .flat();

      const lastReps = filteredSets.map((s) => s?.reps);
      const lastWeight = filteredSets[0]?.weight;
      const lastRep = lastReps[0] ?? 1;
      let goalReps;
      const lastRepsLength = lastReps.length;

      switch (true) {
        case lastRepsLength > 2:
          const sum =
            lastReps.reduce((acc, val) => (acc ?? 0) + (val ?? 0), 0) ?? 0;
          const isToIncrease =
            sum / lastRep === lastRepsLength && lastRep < BASE_MAX_REPS;

          goalReps = isToIncrease ? lastRep + 1 : lastRep ?? 0;

          break;

        case lastRepsLength > 0:
          goalReps = lastReps[0] ?? BASE_REPS_AMOUNT;
          break;

        default:
          goalReps = BASE_REPS_AMOUNT;
          break;
      }

      const lastSet = filteredSets[0];

      return _createUserStrengthSet({
        isBodyWeight,
        order: idx + 1,
        lastSet,
        goalReps,
        goalWeight: lastWeight,
      });
    });
  }
};

const _getStrengthWarmupSet = (
  isBodyWeight: boolean,
  weight: number | null,
  reps: number | null
): IUserStrengthSetEditDTO => {
  const warmupWeight = isBodyWeight
    ? null
    : weight
    ? Math.round((weight ?? 0) * 0.35)
    : null;
  return {
    id: getTempId(),
    reps: reps,
    weight: warmupWeight,
    isCompleted: false,
    isMuscleFailure: false,
    isJointPain: false,
    isBodyWeight,
    order: 0, // Warmup set is always the first set
  };
};
export const workoutPlannerService = { createUserWorkoutPlan };
