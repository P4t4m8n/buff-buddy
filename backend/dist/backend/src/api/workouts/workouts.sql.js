"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutSQL = void 0;
const db_util_1 = require("../../shared/utils/db.util");
const exercise_sql_1 = require("../exercises/exercise.sql");
const users_sql_1 = require("../users/users.sql");
const workoutExercise_sql_1 = require("../workoutExercise/workoutExercise.sql");
const WORKOUT_EXERCISE_SELECT = {
    id: true,
    order: true,
    notes: true,
    createdAt: true,
    updatedAt: true,
    exercise: {
        select: exercise_sql_1.exerciseSQL.EXERCISE_SELECT,
    },
};
const WORKOUT_SELECT = {
    id: true,
    name: true,
    notes: true,
    isTemplate: true,
    owner: {
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    },
    workoutExercises: {
        select: workoutExercise_sql_1.workoutExerciseSQL.WORKOUT_EXERCISE_SELECT,
    },
};
const WORKOUT_SELECT_SMALL = {
    id: true,
    name: true,
    notes: true,
};
const getWorkoutCreate = (data, userId) => {
    return {
        name: data?.name ?? data?.name,
        owner: { connect: { id: userId ?? undefined } },
        notes: data?.notes,
        isTemplate: data?.isTemplate ?? false,
        workoutExercises: {
            create: (data?.workoutExercises ?? []).map((we) => workoutExercise_sql_1.workoutExerciseSQL.getWorkoutExerciseCreate(we)),
        },
    };
};
const getWorkoutUpdate = (data) => {
    const { workoutExercises, ...workoutData } = data;
    const exercisesToCreate = workoutExercises?.filter((we) => we.crudOperation === "create") ?? [];
    const exercisesToUpdate = workoutExercises?.filter((we) => we.crudOperation === "update") ?? [];
    const exercisesToDelete = workoutExercises?.filter((we) => we.crudOperation === "delete") ?? [];
    return {
        id: workoutData.id,
        ...db_util_1.dbUtil.cleanData({
            notes: workoutData.notes,
            name: workoutData.name,
            isTemplate: workoutData.isTemplate,
        }),
        workoutExercises: {
            deleteMany: exercisesToDelete.map((we) => ({ id: we.id })),
            create: exercisesToCreate.map((we) => workoutExercise_sql_1.workoutExerciseSQL.getWorkoutExerciseCreate(we)),
            update: exercisesToUpdate.map((we) => ({
                where: { id: we.id },
                data: workoutExercise_sql_1.workoutExerciseSQL.getWorkoutExerciseUpdate(we),
            })),
        },
    };
};
exports.workoutSQL = {
    WORKOUT_SELECT,
    WORKOUT_SELECT_SMALL,
    WORKOUT_EXERCISE_SELECT,
    getWorkoutCreate,
    getWorkoutUpdate,
};
