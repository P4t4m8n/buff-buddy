"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutExerciseSQL = void 0;
const db_util_1 = require("../../shared/utils/db.util");
const exercise_sql_1 = require("../exercises/exercise.sql");
const WORKOUT_EXERCISE_SELECT = {
    id: true,
    order: true,
    notes: true,
    hasWarmup: true,
    isDropSet: true,
    isMyoReps: true,
    restTime: true,
    numberOfSets: true,
    maxNumberOfReps: true,
    exercise: {
        select: exercise_sql_1.exerciseSQL.EXERCISE_SELECT,
    },
};
/*
 * INFO: Return Omitted workout from workoutExercise as workoutExercise
 * create only happens when creating/editing a workout
 */
const getWorkoutExerciseCreate = (dto) => {
    return {
        order: dto?.order || 1,
        notes: dto?.notes,
        exercise: { connect: { id: dto?.exerciseData?.id } },
        hasWarmup: dto?.hasWarmup,
        numberOfSets: dto?.numberOfSets,
        maxNumberOfReps: dto?.maxNumberOfReps,
        isDropSet: dto?.isDropSet,
        isMyoReps: dto?.isMyoReps,
    };
};
const getWorkoutExerciseUpdate = (dto) => {
    return {
        ...db_util_1.dbUtil.cleanData({
            hasWarmup: dto.hasWarmup,
            numberOfSets: dto?.numberOfSets,
            maxNumberOfReps: dto?.maxNumberOfReps,
            isDropSet: dto?.isDropSet,
            isMyoReps: dto?.isMyoReps,
            order: dto.order ?? undefined,
            notes: dto.notes,
            exercise: { connect: { id: dto.exerciseData?.id } },
        }),
    };
};
exports.workoutExerciseSQL = {
    getWorkoutExerciseCreate,
    getWorkoutExerciseUpdate,
    WORKOUT_EXERCISE_SELECT,
};
