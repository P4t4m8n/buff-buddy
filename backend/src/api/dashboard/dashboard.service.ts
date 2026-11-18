import { prisma } from "../../../prisma/prisma";

import { dashboardSQL } from "./dashboard.sql";
import {
  dashboardUtil,
  STREAK_MAX_DAYS,
  STRENGTH_DAYS,
} from "./dashboard.util";

import type { IDashboardDTO } from "../../../../shared/models/dashboard.model";
import type {
  IDashboardUserWorkout,
  IDashboardUserWorkoutDetails,
} from "./dashboard.model";

const getDashboard = async (
  userId: string,
  now: Date = new Date()
): Promise<IDashboardDTO> => {
  const today = dashboardUtil.startOfDay(now);
  //INFO: Light rows cover the streak and history, full set details only the charts window
  const streakFrom = dashboardUtil.addDays(today, -STREAK_MAX_DAYS);
  const detailsFrom = dashboardUtil.addDays(today, -STRENGTH_DAYS);

  const [programs, userWorkouts, userWorkoutDetails] = await Promise.all([
    prisma.program.findMany({
      where: { ownerId: userId, isActive: true },
      select: dashboardSQL.PROGRAM_SELECT,
    }),
    prisma.userWorkout.findMany({
      where: { ownerId: userId, dateCompleted: { gte: streakFrom } },
      select: dashboardSQL.USER_WORKOUT_SELECT,
    }),
    prisma.userWorkout.findMany({
      where: { ownerId: userId, dateCompleted: { gte: detailsFrom } },
      select: dashboardSQL.USER_WORKOUT_DETAILS_SELECT,
      orderBy: { dateCompleted: "asc" },
    }),
  ]);

  return dashboardUtil.buildDashboard({
    programs,
    userWorkouts: userWorkouts as IDashboardUserWorkout[],
    userWorkoutDetails: userWorkoutDetails as IDashboardUserWorkoutDetails[],
    now,
  });
};

export const dashboardService = {
  getDashboard,
};
