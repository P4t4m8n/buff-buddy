"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardSQL = void 0;
const PROGRAM_SELECT = {
    id: true,
    startDate: true,
    endDate: true,
    programWorkouts: {
        select: {
            daysOfWeek: true,
            workout: { select: { id: true, name: true } },
        },
    },
};
const USER_WORKOUT_SELECT = {
    dateCompleted: true,
    workoutId: true,
};
const USER_WORKOUT_DETAILS_SELECT = {
    dateCompleted: true,
    userWorkoutExercises: {
        select: {
            workoutExercise: {
                select: {
                    exercise: {
                        select: { id: true, name: true, muscles: { select: { name: true } } },
                    },
                },
            },
            userStrengthSets: {
                select: { reps: true, weight: true, isCompleted: true },
            },
        },
    },
};
exports.dashboardSQL = {
    PROGRAM_SELECT,
    USER_WORKOUT_SELECT,
    USER_WORKOUT_DETAILS_SELECT,
};
