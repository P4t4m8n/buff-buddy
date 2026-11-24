"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programsUtil = void 0;
const user_util_1 = require("../users/user.util");
const workouts_util_1 = require("../workouts/workouts.util");
const buildWhereClause = (filter, userId) => {
    const where = {};
    if (filter.name) {
        where.name = { contains: filter.name, mode: "insensitive" };
    }
    // where.isActive = !!filter.isActive;
    where.ownerId = userId;
    return where;
};
const buildDTO = (program) => ({
    id: program?.id,
    name: program?.name,
    notes: program?.notes,
    startDate: program?.startDate,
    endDate: program?.endDate,
    isActive: program?.isActive ?? false,
    owner: user_util_1.userUtil.toSmallDTO(program?.owner),
    programWorkouts: (program?.programWorkouts ?? []).map((pw) => ({
        ...pw,
        workout: workouts_util_1.workoutUtil.buildDTO(pw.workout),
    })),
});
const buildDTOArr = (programs) => {
    return programs.map((program) => buildDTO(program));
};
exports.programsUtil = {
    buildWhereClause,
    buildDTO,
    buildDTOArr,
};
