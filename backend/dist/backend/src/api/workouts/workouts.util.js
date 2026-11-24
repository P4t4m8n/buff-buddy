"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutUtil = void 0;
const workoutExercise_util_1 = require("../workoutExercise/workoutExercise.util");
const buildWhereClause = (filter, userId) => {
    const where = {};
    if (!!filter.workoutName) {
        where.name = { contains: filter.workoutName, mode: "insensitive" };
    }
    if (!!filter.programName) {
        where.programWorkouts = {
            some: {
                program: {
                    name: { contains: filter.programName, mode: "insensitive" },
                },
            },
        };
    }
    if (!!filter.exerciseName) {
        where.workoutExercises = {
            some: {
                exercise: {
                    name: { contains: filter.exerciseName, mode: "insensitive" },
                },
            },
        };
    }
    if (!!filter.ownerName) {
        where.owner = {
            OR: [
                { firstName: { contains: filter.ownerName, mode: "insensitive" } },
                { lastName: { contains: filter.ownerName, mode: "insensitive" } },
            ],
        };
    }
    if (filter.isTemplate !== undefined) {
        where.isTemplate = filter.isTemplate;
    }
    //INFO: A workout is visible to its owner, or to everyone when it is public (isTemplate)
    if (userId) {
        where.OR = [{ ownerId: userId }, { isTemplate: true }];
    }
    return where;
};
const buildDTO = (workout) => ({
    ...workout,
    workoutExercises: workout?.workoutExercises?.map((we) => workoutExercise_util_1.workoutExerciseUtils.buildDTO(we)),
});
const buildDTOArr = (programs) => {
    return programs.map((program) => buildDTO(program));
};
exports.workoutUtil = {
    buildWhereClause,
    buildDTO,
    buildDTOArr,
};
