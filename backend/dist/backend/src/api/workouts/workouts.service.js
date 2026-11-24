"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const workouts_util_1 = require("./workouts.util");
const workouts_sql_1 = require("./workouts.sql");
const get = (filter, userId) => {
    const where = workouts_util_1.workoutUtil.buildWhereClause(filter, userId);
    const take = filter.take ? parseInt(filter.take.toString()) : 10;
    const skip = (filter?.skip ?? 0) * take;
    return prisma_1.prisma.$transaction([
        prisma_1.prisma.workout.findMany({
            where,
            skip,
            take,
            orderBy: { name: "asc" },
            select: workouts_sql_1.workoutSQL.WORKOUT_SELECT,
        }),
        prisma_1.prisma.workout.count({ where }),
    ]);
};
const getById = async (id, userId) => {
    //INFO: A workout is visible to its owner, or to everyone when it is public (isTemplate)
    return prisma_1.prisma.workout.findFirst({
        where: {
            id,
            ...(userId && { OR: [{ ownerId: userId }, { isTemplate: true }] }),
        },
        select: workouts_sql_1.workoutSQL.WORKOUT_SELECT,
    });
};
const create = async (dto) => {
    return prisma_1.prisma.workout.create({
        data: workouts_sql_1.workoutSQL.getWorkoutCreate(dto, dto?.ownerId),
        select: workouts_sql_1.workoutSQL.WORKOUT_SELECT,
    });
};
const update = async (id, dto, userId) => {
    return await prisma_1.prisma.workout.update({
        where: { id, ownerId: userId },
        data: workouts_sql_1.workoutSQL.getWorkoutUpdate(dto),
        select: workouts_sql_1.workoutSQL.WORKOUT_SELECT,
    });
};
const remove = async (id, userId) => {
    return prisma_1.prisma.workout.delete({
        where: { id, ownerId: userId },
    });
};
exports.workoutsService = { get, getById, create, update, remove };
