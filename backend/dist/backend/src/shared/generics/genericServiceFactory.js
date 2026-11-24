"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericServiceFactory = void 0;
const prisma_1 = require("../../../prisma/prisma");
const TABLE_KEYS = [
    "workout",
    "exercise",
    "program",
];
const _getDelegate = (tableKey) => {
    switch (tableKey) {
        case "workout":
            return prisma_1.prisma.workout;
        case "exercise":
            return prisma_1.prisma.exercise;
        case "program":
            return prisma_1.prisma.program;
        default:
            const _exhaustiveCheck = tableKey;
            throw new Error(`Invalid table key: ${_exhaustiveCheck}`);
    }
};
const createServiceLogic = (delegate, util, sqlUtil) => {
    return {
        get: async (filter) => {
            const where = util.buildWhereClause(filter);
            const take = filter.take ? parseInt(filter.take.toString()) : 10;
            const skip = filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;
            return await prisma_1.prisma.$transaction([
                delegate.findMany({ where, skip, take, select: sqlUtil.SELECT }),
                delegate.count({ where }),
            ]);
        },
        getById: async (id) => {
            return delegate.findUnique({
                where: { id },
                select: sqlUtil.SELECT,
            });
        },
        create: async (dto) => {
            return delegate.create({
                data: sqlUtil.getCreateData(dto),
                select: sqlUtil.SELECT,
            });
        },
        update: async (id, dto) => {
            return delegate.update({
                where: { id },
                data: sqlUtil.getUpdateData(dto),
                select: sqlUtil.SELECT,
            });
        },
        remove: async (id) => {
            await delegate.delete({ where: { id } });
        },
    };
};
const genericServiceFactory = ({ util, sqlUtil, tableKey, }) => {
    switch (tableKey) {
        case "workout":
            return createServiceLogic(prisma_1.prisma.workout, util, sqlUtil);
        case "exercise":
            return createServiceLogic(prisma_1.prisma.exercise, util, sqlUtil);
        case "program":
            return createServiceLogic(prisma_1.prisma.program, util, sqlUtil);
        default:
            const _exhaustiveCheck = tableKey;
            throw new Error(`Invalid table key: ${_exhaustiveCheck}`);
    }
};
exports.genericServiceFactory = genericServiceFactory;
