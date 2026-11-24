import request from "supertest";
import { app } from "../../server";

import { dashboardUtil } from "./dashboard.util";

import type { IDashboardDTO } from "../../../../shared/models/dashboard.model";

const signUp = async (name: string) => {
  const res = await request(app)
    .post("/api/v1/auth/sign-up")
    .send({
      email: `test-dashboard-${name}-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Dashboard",
      lastName: name,
    });
  return {
    userId: res.body.data.id as string,
    token: res.headers["set-cookie"][0].split(";")[0].split("=")[1] as string,
  };
};

const getDashboard = async (token: string) => {
  const res = await request(app)
    .get("/api/v1/dashboard")
    .set("Cookie", `token=${token}`);
  return { status: res.status, data: res.body.data as IDashboardDTO };
};

//INFO: Local noon keeps the day stable whatever time the tests run
const localNoon = (daysFromToday: number) => {
  const date = dashboardUtil.addDays(new Date(), daysFromToday);
  date.setHours(12, 0, 0, 0);
  return date;
};

describe("Dashboard API", () => {
  let user: { userId: string; token: string };
  let exerciseId: string;
  let muscleName: string;
  let workoutId: string;
  let workoutExerciseId: string;
  let programId: string;

  const logWorkout = (daysFromToday: number, sets: [number, number][]) =>
    request(app)
      .post("/api/v1/user-workouts/edit")
      .set("Cookie", `token=${user.token}`)
      .send({
        ownerId: user.userId,
        workoutId,
        programId,
        dateCompleted: localNoon(daysFromToday).toISOString(),
        userWorkoutExercises: [
          {
            workoutExerciseId,
            userStrengthSets: sets.map(([reps, weight], idx) => ({
              reps,
              weight,
              crudOperation: "create",
              order: idx + 1,
              isCompleted: true,
              isJointPain: false,
              isMuscleFailure: false,
              isWarmup: false,
            })),
          },
        ],
      });

  beforeAll(async () => {
    user = await signUp("main");

    const musclesRes = await request(app)
      .get("/api/v1/exercises/muscles/list")
      .set("Cookie", `token=${user.token}`);
    const muscle = musclesRes.body.data[0];
    muscleName = muscle.name;

    const equipmentRes = await request(app)
      .get("/api/v1/exercises/equipment/list")
      .set("Cookie", `token=${user.token}`);

    const exerciseRes = await request(app)
      .post("/api/v1/exercises/edit")
      .set("Cookie", `token=${user.token}`)
      .send({
        name: `dashboard exercise ${Date.now()}`,
        youtubeUrl: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
        type: "strength",
        muscles: [muscle],
        equipment: [equipmentRes.body.data[0]],
        ownerId: user.userId,
      });
    exerciseId = exerciseRes.body.data.id;

    const workoutRes = await request(app)
      .post("/api/v1/workouts/edit")
      .set("Cookie", `token=${user.token}`)
      .send({
        name: `dashboard workout ${Date.now()}`,
        crudOperation: "create",
        ownerId: user.userId,
        workoutExercises: [
          {
            order: 1,
            exerciseData: { type: "strength", id: exerciseId },
            crudOperation: "create",
            numberOfSets: 2,
            maxNumberOfReps: 10,
            isDropSet: false,
            isMyoReps: false,
          },
        ],
      });
    workoutId = workoutRes.body.data.id;
    workoutExerciseId = workoutRes.body.data.workoutExercises[0].id;

    //INFO: Scheduled every day, well around today, so every week is fully planned
    const programRes = await request(app)
      .post("/api/v1/programs/edit")
      .set("Cookie", `token=${user.token}`)
      .send({
        ownerId: user.userId,
        name: `dashboard program ${Date.now()}`,
        startDate: dashboardUtil.dayKey(localNoon(-120)),
        endDate: dashboardUtil.dayKey(localNoon(120)),
        isActive: true,
        programWorkouts: [
          {
            daysOfWeek: [
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
            workout: { id: workoutId },
          },
        ],
      });
    programId = programRes.body.data.id;
  });

  it("should return 401 if not authenticated", async () => {
    const res = await request(app).get("/api/v1/dashboard");
    expect(res.status).toBe(401);
  });

  it("should return an empty dashboard for a user without programs", async () => {
    const other = await signUp("empty");

    const { status, data } = await getDashboard(other.token);

    expect(status).toBe(200);
    expect(data.thisWeek).toEqual({ planned: 0, completed: 0 });
    expect(data.streak).toBe(0);
    expect(data.nextWorkout).toBeNull();
    expect(data.weeklyHistory).toHaveLength(8);
    expect(data.muscleSets).toEqual([]);
    expect(data.strengthProgress).toEqual([]);

    await request(app)
      .delete(`/api/v1/auth/delete-user/${other.userId}`)
      .set("Cookie", `token=${other.token}`);
  });

  it("should plan the program's workouts before anything is logged", async () => {
    const { data } = await getDashboard(user.token);

    expect(data.thisWeek).toEqual({ planned: 7, completed: 0 });
    expect(data.streak).toBe(0);
    expect(data.nextWorkout).toEqual({
      programId,
      workoutId,
      workoutName: expect.any(String),
      date: dashboardUtil.dayKey(new Date()),
    });
    expect(data.weeklyHistory.every((week) => week.planned === 7)).toBe(true);
  });

  it("should compute stats from logged workouts", async () => {
    expect((await logWorkout(-1, [[10, 40], [10, 40]])).status).toBe(201);
    expect((await logWorkout(0, [[10, 50], [8, 60]])).status).toBe(201);

    const { data } = await getDashboard(user.token);

    expect(data.streak).toBe(2);
    expect(
      data.weeklyHistory.reduce((sum, week) => sum + week.completed, 0)
    ).toBe(2);
    expect(data.volume.thisWeek + data.volume.lastWeek).toBe(
      10 * 40 * 2 + 10 * 50 + 8 * 60
    );

    // Today's workout is done, so the next one is tomorrow
    expect(data.nextWorkout?.date).toBe(dashboardUtil.dayKey(localNoon(1)));

    expect(data.muscleSets).toEqual([{ muscle: muscleName, sets: 4 }]);

    expect(data.strengthProgress).toHaveLength(1);
    expect(data.strengthProgress[0].exerciseId).toBe(exerciseId);
    expect(data.strengthProgress[0].points).toEqual([
      { date: dashboardUtil.dayKey(localNoon(-1)), estimatedOneRepMax: 53.3 },
      { date: dashboardUtil.dayKey(localNoon(0)), estimatedOneRepMax: 76 },
    ]);
  });

  it("should not include another user's data", async () => {
    const other = await signUp("other");

    const { data } = await getDashboard(other.token);

    expect(data.thisWeek.planned).toBe(0);
    expect(data.muscleSets).toEqual([]);

    await request(app)
      .delete(`/api/v1/auth/delete-user/${other.userId}`)
      .set("Cookie", `token=${other.token}`);
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/exercises/${exerciseId}`)
      .set("Cookie", `token=${user.token}`);
    //INFO: Deleting the user cascades to its workouts, programs and logged workouts
    await request(app)
      .delete(`/api/v1/auth/delete-user/${user.userId}`)
      .set("Cookie", `token=${user.token}`);
  });
});
