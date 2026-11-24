"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programsService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const program_sql_1 = require("./program.sql");
const programs_util_1 = require("./programs.util");
const get = (filter, userId) => {
    const where = programs_util_1.programsUtil.buildWhereClause(filter, userId);
    const take = filter.take ? parseInt(filter.take.toString()) : 10;
    const skip = (filter?.skip ?? 0) * take;
    return prisma_1.prisma.$transaction([
        prisma_1.prisma.program.findMany({
            where,
            skip,
            take,
            select: program_sql_1.programsSQL.PROGRAM_SELECT,
        }),
        prisma_1.prisma.program.count({ where }),
    ]);
};
const getById = async (id, userId) => {
    return await prisma_1.prisma.program.findUnique({
        where: { id, ownerId: userId },
        select: program_sql_1.programsSQL.PROGRAM_SELECT,
    });
};
const create = async (dto, userId) => {
    return (await prisma_1.prisma.program.create({
        data: program_sql_1.programsSQL.getProgramCreate(dto),
        select: program_sql_1.programsSQL.PROGRAM_SELECT,
    }));
};
const update = async (id, dto, userId) => {
    return await prisma_1.prisma.program.update({
        where: { id, ownerId: userId },
        data: program_sql_1.programsSQL.getProgramUpdate({ dto, userId }),
        select: program_sql_1.programsSQL.PROGRAM_SELECT,
    });
};
const remove = async (id, userId) => {
    await prisma_1.prisma.program.delete({
        where: { id, ownerId: userId },
    });
};
const getProgramWorkout = async (workoutId) => {
    return prisma_1.prisma.programWorkout.findFirst({
        where: { workoutId },
        select: program_sql_1.programsSQL.PROGRAM_WORKOUTS_SELECT,
    });
};
exports.programsService = {
    get,
    getById,
    create,
    update,
    remove,
    getProgramWorkout,
};
