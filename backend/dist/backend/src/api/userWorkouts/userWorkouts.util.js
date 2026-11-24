"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userWorkoutsUtils = void 0;
const userCardioSets_util_1 = require("../userSets/userCardioSets/userCardioSets.util");
const userStrengthSets_util_1 = require("../userSets/userStrengthSets/userStrengthSets.util");
const workoutExercise_util_1 = require("../workoutExercise/workoutExercise.util");
const buildDTO = (data) => {
    return {
        id: data.id,
        dateCompleted: data.dateCompleted,
        program: data.program,
        owner: data.owner,
        workout: {
            id: data.workout?.id ?? "",
            name: data.workout?.name ?? null,
            notes: data.workout?.notes ?? null,
        },
        userWorkoutExercises: data.userWorkoutExercises.map((uw) => {
            const uwe = {
                id: uw.id,
                ...workoutExercise_util_1.workoutExerciseUtils.buildDTO(uw?.workoutExercise),
            };
            const userStrengthSets = uw?.userStrengthSets?.map((us) => userStrengthSets_util_1.userStrengthSetsUtil.buildDTO(us));
            const userCardioSets = uw?.userCardioSets?.map((uc) => userCardioSets_util_1.userCardioSetsUtil.buildDTO(uc));
            if (userStrengthSets)
                uwe.userStrengthSets = userStrengthSets;
            if (userCardioSets)
                uwe.userCardioSets = userCardioSets;
            return uwe;
        }),
    };
};
exports.userWorkoutsUtils = {
    buildDTO,
};
