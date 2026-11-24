"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWorkoutSql = void 0;
const program_sql_1 = require("../programs/program.sql");
const userCardioSets_sql_1 = require("../userSets/userCardioSets/userCardioSets.sql");
const userStrengthSets_sql_1 = require("../userSets/userStrengthSets/userStrengthSets.sql");
const users_sql_1 = require("../users/users.sql");
const workoutExercise_sql_1 = require("../workoutExercise/workoutExercise.sql");
const USER_WORKOUT_EXERCISE_SELECT = {
    id: true,
    workoutExercise: {
        select: workoutExercise_sql_1.workoutExerciseSQL.WORKOUT_EXERCISE_SELECT,
    },
    userCardioSets: {
        select: userCardioSets_sql_1.userCardioSetsSQL.CORE_CARDIO_SET_SELECT,
    },
    userStrengthSets: {
        select: userStrengthSets_sql_1.userStrengthSetsSQL.CORE_STRENGTH_SET_SELECT,
    },
};
const USER_WORKOUT_SELECT = {
    id: true,
    dateCompleted: true,
    program: {
        select: program_sql_1.programsSQL.SMALL_PROGRAM_SELECT,
    },
    owner: {
        select: users_sql_1.userSQL.SMALL_USER_SELECT,
    },
    workout: {
        select: {
            id: true,
            name: true,
            notes: true,
        },
    },
    userWorkoutExercises: {
        select: USER_WORKOUT_EXERCISE_SELECT,
    },
};
const getCreateUserWork = (dto) => {
    return {
        dateCompleted: dto.dateCompleted,
        owner: {
            connect: {
                id: dto.ownerId,
            },
        },
        program: {
            connect: {
                id: dto.programId,
            },
        },
        workout: {
            connect: {
                id: dto.workoutId,
            },
        },
        userWorkoutExercises: {
            create: dto.userWorkoutExercises.map((we) => ({
                workoutExercise: {
                    connect: {
                        id: we.workoutExerciseId,
                    },
                },
                userStrengthSets: {
                    create: we.userStrengthSets
                        ?.filter((us) => !us.isWarmup)
                        .map((us) => userStrengthSets_sql_1.userStrengthSetsSQL.getCreateUserStrengthSet(us)),
                },
                userCardioSets: {
                    create: we.userCardioSets?.map((uc) => userCardioSets_sql_1.userCardioSetsSQL.getCreateUserCardioSet(uc)),
                },
            })),
        },
    };
};
exports.userWorkoutSql = {
    USER_WORKOUT_SELECT,
    USER_WORKOUT_EXERCISE_SELECT,
    getCreateUserWork,
};
