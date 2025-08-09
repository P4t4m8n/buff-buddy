import { Prisma } from "../../../prisma/generated/prisma";
import { dbUtil } from "../../shared/utils/db.util";
import { coreCardioSetsSQL } from "../coreSets/coreCardioSets/coreCardioSets.sql";
import { coreStrengthSetsSQL } from "../coreSets/coreStrengthSets/coreStrengthSets.sql";
import {
  TCreateWorkoutExerciseInput,
  TUpdateWorkoutExerciseInput,
} from "./workoutExercise.validations";

const getWorkoutExerciseCreate = (
  dto: TCreateWorkoutExerciseInput | null
): Prisma.WorkoutExerciseCreateInput => {
  const createInput: Partial<Prisma.WorkoutExerciseCreateInput> = {
    order: dto?.order || 1,
    notes: dto?.notes,
    exercise: { connect: { id: dto?.exerciseData?.id } },
  };

  if (dto?.coreStrengthSet) {
    createInput.coreStrengthSet = {
      create: dbUtil.cleanData(
        coreStrengthSetsSQL.getCreateCoreSets(dto?.coreStrengthSet)
      ),
    };
  }

  if (dto?.coreCardioSet) {
    createInput.coreCardioSet = {
      create: dbUtil.cleanData(
        coreCardioSetsSQL.getCreateCoreSets(dto?.coreCardioSet)
      ),
    };
  }
  return createInput as Prisma.WorkoutExerciseCreateInput;
};

const getWorkoutExerciseUpdate = (
  data: TUpdateWorkoutExerciseInput
): Prisma.WorkoutExerciseUpdateInput => {
  const updateInput: Partial<Prisma.WorkoutExerciseUpdateInput> = {
    ...dbUtil.cleanData({
      order: data.order ?? undefined,
      notes: data.notes,
      exercise: { connect: { id: data.exerciseData } },
    }),
  };
  
  if (data.coreStrengthSet) {
    updateInput.coreStrengthSet = {
      update: dbUtil.cleanData(
        coreStrengthSetsSQL.getUpdateCoreSets(data.coreStrengthSet)
      ),
    };
  }
  
  if (data.coreCardioSet) {
    updateInput.coreCardioSet = {
      update: dbUtil.cleanData(
        coreCardioSetsSQL.getUpdateCoreSets(data.coreCardioSet)
      ),
    };
  }

  return dbUtil.cleanData(updateInput) as Prisma.WorkoutExerciseUpdateInput;
};

export const workoutExerciseSQL = {
  getWorkoutExerciseCreate,
  getWorkoutExerciseUpdate,
};
