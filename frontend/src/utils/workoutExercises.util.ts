import type { IWorkoutExerciseEditDTO } from "../../../shared/models/workout.model";
import getTempId from "../../../shared/utils/getTempId";

const getEmpty = (order?: number): IWorkoutExerciseEditDTO => {
  return {
    id: getTempId(),
    order: order ?? 1,
    hasWarmup: false,
    isBodyWeight: false,
    restTime: null,
    numberOfSets: null,
    maxNumberOfReps: null,
    isDropSet: false,
    isMyoReps: false,
    notes: "",
    exerciseData: null,
    crudOperation: "create",
  };
};

const dtoToEditDto = ({
  we,
  isCopy,
  isEdit,
}: {
  we: IWorkoutExerciseEditDTO;
  isCopy: boolean;
  isEdit?: boolean;
}) => {
  const workoutExerciseId = isCopy ? getTempId() : we.id;
  const workoutExerciseEdit: IWorkoutExerciseEditDTO = {
    id: workoutExerciseId,
    order: we.order,
    notes: we.notes || "",
    exercise: we.exercise,
    isBodyWeight: we.isBodyWeight,
    hasWarmup: we.hasWarmup,
    restTime: we.restTime,
    numberOfSets: we.numberOfSets,
    maxNumberOfReps: we.maxNumberOfReps,
    isDropSet: we.isDropSet,
    isMyoReps: we.isMyoReps,
    crudOperation: isCopy ? "create" : isEdit ? "update" : "read",
    exerciseData: {
      id: we?.exercise?.id!,
      type: we?.exercise?.type!,
    },
  };

  return workoutExerciseEdit;
};

export const workoutExerciseUtil = { getEmpty, dtoToEditDto };
