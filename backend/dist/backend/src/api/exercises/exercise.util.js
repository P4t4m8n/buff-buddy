"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseUtil = void 0;
const buildWhereClause = (filter) => {
    const where = {};
    if (filter.name) {
        where.name = { contains: filter.name, mode: "insensitive" };
        1;
    }
    if (filter.types && filter.types.length) {
        where.type = { in: filter.types };
    }
    if (filter.equipment && filter.equipment.length) {
        where.equipment = {
            some: {
                AND: [
                    { name: { in: filter.equipment } },
                    {
                        categories: {
                            some: { name: { in: filter.equipment } },
                        },
                    },
                ],
            },
        };
    }
    if (filter.muscles && filter.muscles.length) {
        where.muscles = {
            some: {
                AND: [
                    { name: { in: filter.muscles } },
                    { aliases: { some: { name: { in: filter.muscles } } } },
                ],
            },
        };
    }
    return where;
};
exports.exerciseUtil = { buildWhereClause };
