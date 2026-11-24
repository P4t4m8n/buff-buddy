"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardUtil = exports.STREAK_MAX_DAYS = exports.STRENGTH_DAYS = exports.MUSCLE_DAYS = exports.HISTORY_WEEKS = void 0;
const DAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
exports.HISTORY_WEEKS = 8;
exports.MUSCLE_DAYS = 30;
exports.STRENGTH_DAYS = 90;
exports.STREAK_MAX_DAYS = 365;
const NEXT_WORKOUT_MAX_DAYS = 14;
const MAX_MUSCLES = 8;
const MAX_STRENGTH_EXERCISES = 3;
//INFO: Dates are bucketed by the server's local day, weeks start on Sunday
const dayKey = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
};
const startOfDay = (date) => {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    return day;
};
const addDays = (date, days) => {
    const day = new Date(date);
    day.setDate(day.getDate() + days);
    return day;
};
const startOfWeek = (date) => {
    const day = startOfDay(date);
    return addDays(day, -day.getDay());
};
const getScheduledOn = (programs, date) => {
    const key = dayKey(date);
    const weekDay = DAYS[date.getDay()];
    return programs
        .filter((program) => dayKey(program.startDate) <= key && key <= dayKey(program.endDate))
        .flatMap((program) => program.programWorkouts
        .filter((pw) => pw.daysOfWeek.includes(weekDay))
        .map((pw) => ({
        programId: program.id,
        workoutId: pw.workout.id,
        workoutName: pw.workout.name,
    })));
};
const countPlanned = (programs, from, days) => {
    let planned = 0;
    for (let i = 0; i < days; i++) {
        planned += getScheduledOn(programs, addDays(from, i)).length;
    }
    return planned;
};
const isBetween = (date, from, to) => date >= from && date < to;
const getWeeklyHistory = (programs, userWorkouts, weekStart) => {
    return Array.from({ length: exports.HISTORY_WEEKS }, (_, idx) => {
        const from = addDays(weekStart, (idx - exports.HISTORY_WEEKS + 1) * 7);
        const to = addDays(from, 7);
        return {
            weekStart: dayKey(from),
            planned: countPlanned(programs, from, 7),
            completed: userWorkouts.filter((uw) => isBetween(uw.dateCompleted, from, to)).length,
        };
    });
};
const completionKey = (date, workoutId) => `${dayKey(date)}|${workoutId}`;
//INFO: Consecutive scheduled workouts completed on their day, walking back from today.
//Today's workouts only count once done, they never break the streak.
const getStreak = (programs, userWorkouts, today) => {
    const completed = new Set(userWorkouts.map((uw) => completionKey(uw.dateCompleted, uw.workoutId)));
    let streak = 0;
    for (let i = 0; i < exports.STREAK_MAX_DAYS; i++) {
        const date = addDays(today, -i);
        for (const scheduled of getScheduledOn(programs, date)) {
            if (completed.has(completionKey(date, scheduled.workoutId))) {
                streak++;
            }
            else if (i > 0) {
                return streak;
            }
        }
    }
    return streak;
};
const getNextWorkout = (programs, userWorkouts, today) => {
    const completed = new Set(userWorkouts.map((uw) => completionKey(uw.dateCompleted, uw.workoutId)));
    for (let i = 0; i < NEXT_WORKOUT_MAX_DAYS; i++) {
        const date = addDays(today, i);
        const next = getScheduledOn(programs, date).find((scheduled) => !completed.has(completionKey(date, scheduled.workoutId)));
        if (next)
            return { ...next, date: dayKey(date) };
    }
    return null;
};
const getCompletedSets = (userWorkoutExercise) => userWorkoutExercise.userStrengthSets.filter((set) => set.isCompleted);
const getVolume = (userWorkouts, from, to) => {
    return userWorkouts
        .filter((uw) => isBetween(uw.dateCompleted, from, to))
        .flatMap((uw) => uw.userWorkoutExercises.flatMap(getCompletedSets))
        .reduce((sum, set) => sum + (set.reps ?? 0) * (set.weight ?? 0), 0);
};
const getMuscleSets = (userWorkouts, from) => {
    const muscleSets = new Map();
    userWorkouts
        .filter((uw) => uw.dateCompleted >= from)
        .flatMap((uw) => uw.userWorkoutExercises)
        .forEach((uwe) => {
        const sets = getCompletedSets(uwe).length;
        if (!sets)
            return;
        uwe.workoutExercise.exercise.muscles.forEach(({ name }) => {
            muscleSets.set(name, (muscleSets.get(name) ?? 0) + sets);
        });
    });
    return [...muscleSets.entries()]
        .map(([muscle, sets]) => ({ muscle, sets }))
        .sort((a, b) => b.sets - a.sets || a.muscle.localeCompare(b.muscle))
        .slice(0, MAX_MUSCLES);
};
//INFO: Epley formula
const estimateOneRepMax = (weight, reps) => Math.round(weight * (1 + reps / 30) * 10) / 10;
//INFO: Best estimated 1RM per day for the most trained exercises
const getStrengthProgress = (userWorkouts) => {
    const byExercise = new Map();
    for (const uw of userWorkouts) {
        for (const uwe of uw.userWorkoutExercises) {
            const best = Math.max(0, ...getCompletedSets(uwe)
                .filter((set) => set.weight && set.reps)
                .map((set) => estimateOneRepMax(set.weight, set.reps)));
            if (!best)
                continue;
            const { id, name } = uwe.workoutExercise.exercise;
            const exercise = byExercise.get(id) ?? {
                exerciseName: name,
                bestByDay: new Map(),
            };
            const day = dayKey(uw.dateCompleted);
            exercise.bestByDay.set(day, Math.max(best, exercise.bestByDay.get(day) ?? 0));
            byExercise.set(id, exercise);
        }
    }
    return [...byExercise.entries()]
        .map(([exerciseId, { exerciseName, bestByDay }]) => ({
        exerciseId,
        exerciseName,
        points: [...bestByDay.entries()]
            .map(([date, estimatedOneRepMax]) => ({ date, estimatedOneRepMax }))
            .sort((a, b) => a.date.localeCompare(b.date)),
    }))
        .sort((a, b) => b.points.length - a.points.length ||
        a.exerciseName.localeCompare(b.exerciseName))
        .slice(0, MAX_STRENGTH_EXERCISES);
};
const buildDashboard = ({ programs, userWorkouts, userWorkoutDetails, now, }) => {
    const today = startOfDay(now);
    const weekStart = startOfWeek(now);
    const nextWeekStart = addDays(weekStart, 7);
    const lastWeekStart = addDays(weekStart, -7);
    return {
        thisWeek: {
            planned: countPlanned(programs, weekStart, 7),
            completed: userWorkouts.filter((uw) => isBetween(uw.dateCompleted, weekStart, nextWeekStart)).length,
        },
        streak: getStreak(programs, userWorkouts, today),
        volume: {
            thisWeek: getVolume(userWorkoutDetails, weekStart, nextWeekStart),
            lastWeek: getVolume(userWorkoutDetails, lastWeekStart, weekStart),
        },
        nextWorkout: getNextWorkout(programs, userWorkouts, today),
        weeklyHistory: getWeeklyHistory(programs, userWorkouts, weekStart),
        muscleSets: getMuscleSets(userWorkoutDetails, addDays(today, -(exports.MUSCLE_DAYS - 1))),
        strengthProgress: getStrengthProgress(userWorkoutDetails),
    };
};
exports.dashboardUtil = {
    dayKey,
    startOfDay,
    startOfWeek,
    addDays,
    buildDashboard,
};
