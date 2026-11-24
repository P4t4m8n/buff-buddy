"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programsSQL = void 0;
//Utils
const users_sql_1 = require("../users/users.sql");
const workouts_sql_1 = require("../workouts/workouts.sql");
const db_util_1 = require("../../shared/utils/db.util");
const PROGRAM_WORKOUTS_SELECT = {
    id: true,
    daysOfWeek: true,
    workoutLevel: true,
    workoutGoal: true,
    workout: {
        select: workouts_sql_1.workoutSQL.WORKOUT_SELECT,
    },
    programId: true,
};
const SMALL_PROGRAM_SELECT = {
    id: true,
    name: true,
    notes: true,
    isActive: true,
    startDate: true,
    endDate: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
};
const PROGRAM_SELECT = {
    ...SMALL_PROGRAM_SELECT,
    owner: {
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    },
    programWorkouts: {
        select: PROGRAM_WORKOUTS_SELECT,
    },
};
const getProgramWorkoutCreate = (dto, userId) => {
    return {
        daysOfWeek: dto.daysOfWeek,
        workoutLevel: dto.workoutLevel,
        workoutGoal: dto.workoutGoal,
        workout: _connectOrCreateWorkout({
            workout: dto?.workout,
            userId,
        }),
    };
};
const getProgramCreate = (dto) => {
    return {
        name: dto.name,
        notes: dto.notes,
        isActive: dto.isActive,
        startDate: dto.startDate,
        endDate: dto.endDate,
        owner: {
            connect: { id: dto.ownerId },
        },
        programWorkouts: {
            create: (dto.programWorkouts ?? []).map((w) => getProgramWorkoutCreate(w, dto.ownerId)),
        },
    };
};
const getProgramUpdate = ({ dto, userId, }) => {
    const programData = db_util_1.dbUtil.cleanData({
        name: dto.name,
        notes: dto.notes,
        isActive: dto.isActive,
        startDate: dto.startDate,
        endDate: dto.endDate,
    });
    const workoutsToCreate = dto.programWorkouts?.filter((wo) => wo?.crudOperation === "create") ?? [];
    const workoutsToUpdate = dto.programWorkouts?.filter((wo) => wo?.crudOperation === "update") ?? [];
    const workoutsToDelete = dto.programWorkouts?.filter((wo) => wo?.crudOperation === "delete") ?? [];
    return {
        ...programData,
        programWorkouts: {
            delete: workoutsToDelete.map((wo) => ({ id: wo?.id })),
            create: workoutsToCreate.map((wo) => ({
                daysOfWeek: wo?.daysOfWeek,
                workout: _connectOrCreateWorkout({
                    workout: wo?.workout,
                    userId,
                }),
            })),
            update: workoutsToUpdate.map((wo) => ({
                where: { id: wo?.id },
                data: {
                    daysOfWeek: wo?.daysOfWeek,
                    workout: _connectOrCreateWorkout({
                        workout: wo?.workout,
                        userId,
                    }),
                },
            })),
        },
    };
};
const _connectOrCreateWorkout = ({ workout, userId, }) => {
    const { id: workoutId } = workout;
    return workoutId && !workoutId.startsWith("temp/")
        ? { connect: { id: workoutId } }
        : {
            create: workouts_sql_1.workoutSQL.getWorkoutCreate(workout, userId),
        };
};
exports.programsSQL = {
    SMALL_PROGRAM_SELECT,
    PROGRAM_SELECT,
    PROGRAM_WORKOUTS_SELECT,
    getProgramCreate,
    getProgramUpdate,
};
