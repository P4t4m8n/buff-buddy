"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWorkoutService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const userWorkout_sql_1 = require("./userWorkout.sql");
const getLastUserWorkouts = async (workoutId, userId) => {
    return await prisma_1.prisma.userWorkout.findMany({
        where: {
            workoutId,
            ownerId: userId,
            dateCompleted: {
                not: null,
            },
        },
        orderBy: {
            dateCompleted: "desc",
        },
        take: 7,
        select: userWorkout_sql_1.userWorkoutSql.USER_WORKOUT_SELECT,
    });
};
const create = async (dto) => {
    return (await prisma_1.prisma.userWorkout.create({
        data: userWorkout_sql_1.userWorkoutSql.getCreateUserWork(dto),
        select: userWorkout_sql_1.userWorkoutSql.USER_WORKOUT_SELECT,
    }));
};
const remove = async (id, userId) => {
    return await prisma_1.prisma.userWorkout.delete({
        where: { id, ownerId: userId },
    });
};
const getById = async (userWorkoutId, userId) => {
    return await prisma_1.prisma.userWorkout.findUnique({
        where: { id: userWorkoutId, ownerId: userId },
        select: userWorkout_sql_1.userWorkoutSql.USER_WORKOUT_SELECT,
    });
};
const getUserExercises = async (userId) => {
    return await prisma_1.prisma.userWorkout.findMany({
        where: { ownerId: userId },
        select: {
            userWorkoutExercises: {
                select: {
                    id: true,
                    skippedReason: true,
                    userCardioSets: {
                        select: {
                            id: true,
                            warmupTime: true,
                            workTime: true,
                            avgHeartRate: true,
                            distance: true,
                            avgSpeed: true,
                            caloriesBurned: true,
                            skippedReason: true,
                            isCompleted: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    userStrengthSets: {
                        select: {
                            id: true,
                            reps: true,
                            weight: true,
                            isCompleted: true,
                            isWarmup: true,
                            isJointPain: true,
                            isMuscleFailure: true,
                            skippedReason: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    workoutExercise: {
                        select: {
                            id: true,
                            hasWarmup: true,
                            numberOfSets: true,
                            maxNumberOfReps: true,
                            isDropSet: true,
                            isMyoReps: true,
                            exercise: true,
                        },
                    },
                },
            },
        },
    });
};
exports.userWorkoutService = {
    getLastUserWorkouts,
    create,
    remove,
    getById,
    getUserExercises,
};
