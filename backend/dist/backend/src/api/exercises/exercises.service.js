"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const exercise_sql_1 = require("./exercise.sql");
const exercise_util_1 = require("./exercise.util");
const db_util_1 = require("../../shared/utils/db.util");
const get = (filter) => {
    const where = exercise_util_1.exerciseUtil.buildWhereClause(filter);
    const { skip, take } = db_util_1.dbUtil.buildSkipTakeClause(filter);
    return prisma_1.prisma.$transaction([
        prisma_1.prisma.exercise.findMany({
            where,
            skip,
            take,
            select: exercise_sql_1.exerciseSQL.EXERCISE_SELECT,
        }),
        prisma_1.prisma.exercise.count({ where }),
    ]);
};
const getById = async (id) => {
    return await prisma_1.prisma.exercise.findUnique({
        where: { id },
        select: exercise_sql_1.exerciseSQL.EXERCISE_SELECT,
    });
};
const create = async (dto) => {
    return await prisma_1.prisma.exercise.create({
        data: exercise_sql_1.exerciseSQL.getExerciseCreate(dto),
        select: exercise_sql_1.exerciseSQL.EXERCISE_SELECT,
    });
};
const update = async (id, dto, userId) => {
    return await prisma_1.prisma.exercise.update({
        where: { id, ownerId: userId },
        data: exercise_sql_1.exerciseSQL.getExerciseUpdate(dto),
        select: exercise_sql_1.exerciseSQL.EXERCISE_SELECT,
    });
};
const remove = async (id, userId) => {
    await prisma_1.prisma.exercise.delete({
        where: { id, ownerId: userId },
    });
};
const getMuscles = async () => {
    return prisma_1.prisma.$transaction([
        prisma_1.prisma.muscle.findMany({
            select: exercise_sql_1.exerciseSQL.MUSCLE_SELECT,
        }),
        prisma_1.prisma.muscle.count({}),
    ]);
};
const getEquipment = async () => {
    return prisma_1.prisma.$transaction([
        prisma_1.prisma.equipment.findMany({
            select: exercise_sql_1.exerciseSQL.EQUIPMENT_SELECT,
        }),
        prisma_1.prisma.equipment.count({}),
    ]);
};
exports.exerciseService = {
    get,
    getById,
    create,
    update,
    remove,
    getMuscles,
    getEquipment,
};
