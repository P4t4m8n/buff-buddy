"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const prisma_1 = require("../../../prisma/prisma");
const dashboard_sql_1 = require("./dashboard.sql");
const dashboard_util_1 = require("./dashboard.util");
const getDashboard = async (userId, now = new Date()) => {
    const today = dashboard_util_1.dashboardUtil.startOfDay(now);
    //INFO: Light rows cover the streak and history, full set details only the charts window
    const streakFrom = dashboard_util_1.dashboardUtil.addDays(today, -dashboard_util_1.STREAK_MAX_DAYS);
    const detailsFrom = dashboard_util_1.dashboardUtil.addDays(today, -dashboard_util_1.STRENGTH_DAYS);
    const [programs, userWorkouts, userWorkoutDetails] = await Promise.all([
        prisma_1.prisma.program.findMany({
            where: { ownerId: userId, isActive: true },
            select: dashboard_sql_1.dashboardSQL.PROGRAM_SELECT,
        }),
        prisma_1.prisma.userWorkout.findMany({
            where: { ownerId: userId, dateCompleted: { gte: streakFrom } },
            select: dashboard_sql_1.dashboardSQL.USER_WORKOUT_SELECT,
        }),
        prisma_1.prisma.userWorkout.findMany({
            where: { ownerId: userId, dateCompleted: { gte: detailsFrom } },
            select: dashboard_sql_1.dashboardSQL.USER_WORKOUT_DETAILS_SELECT,
            orderBy: { dateCompleted: "asc" },
        }),
    ]);
    return dashboard_util_1.dashboardUtil.buildDashboard({
        programs,
        userWorkouts: userWorkouts,
        userWorkoutDetails: userWorkoutDetails,
        now,
    });
};
exports.dashboardService = {
    getDashboard,
};
