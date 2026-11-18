import { test, expect, type Page } from "@playwright/test";
import toTitle from "../src/utils/toTitle";

const API_URL = "http://localhost:3030/api/v1";

// Test user credentials – created once per test file run
// The random suffix keeps parallel workers that load this file in the same
// millisecond from colliding.
const TEST_EMAIL = `e2e-dashboard-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
const TEST_PASSWORD = "TestPass1";

const ALL_DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const uniqueSuffix = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/** Local "YYYY-MM-DD" date relative to today, keeps programs active whenever the tests run */
const dayKeyFromToday = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function apiSignIn(page: Page) {
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
}

/** A stat card on the home page, found by its title */
function statCard(page: Page, title: string) {
  return page.locator("div.border").filter({
    has: page.getByRole("heading", { name: title, exact: true }),
  });
}

async function goHome(page: Page) {
  await page.goto("/");
  await expect(statCard(page, "This Week")).toBeVisible({ timeout: 10000 });
}

// ---------------------------------------------------------------------------
// Test setup: a user with a 2-set workout scheduled every day
// ---------------------------------------------------------------------------

let testUserId: string;
let exercise: any;
let workout: any;
let program: any;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const userRes = await page.request.post(`${API_URL}/auth/sign-up`, {
    data: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD,
      firstName: "Dash",
      lastName: "Board",
    },
  });
  testUserId = (await userRes.json())?.data?.id;

  const exerciseRes = await page.request.post(`${API_URL}/exercises/edit`, {
    data: {
      name: `e2e-dash-exercise-${uniqueSuffix()}`,
      youtubeUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
      type: "strength",
      isCompounded: true,
      isSeparateHands: false,
      ownerId: testUserId,
      equipment: [{ name: "barbell", crudOperation: "create" }],
      muscles: [{ name: "pectoralis_major", crudOperation: "create" }],
    },
  });
  exercise = (await exerciseRes.json())?.data;

  const workoutRes = await page.request.post(`${API_URL}/workouts/edit`, {
    data: {
      name: `e2e-dash-workout-${uniqueSuffix()}`,
      notes: "",
      isTemplate: false,
      ownerId: testUserId,
      crudOperation: "create",
      workoutExercises: [
        {
          order: 1,
          notes: "",
          hasWarmup: false,
          isBodyWeight: false,
          numberOfSets: 2,
          maxNumberOfReps: 10,
          isDropSet: false,
          isMyoReps: false,
          restTime: 60,
          exerciseData: { id: exercise.id, type: "strength" },
          crudOperation: "create",
        },
      ],
    },
  });
  workout = (await workoutRes.json())?.data;

  const programRes = await page.request.post(`${API_URL}/programs/edit`, {
    data: {
      ownerId: testUserId,
      name: `e2e-dash-program-${uniqueSuffix()}`,
      notes: "",
      startDate: dayKeyFromToday(-30),
      endDate: dayKeyFromToday(30),
      isActive: true,
      programWorkouts: [
        {
          daysOfWeek: ALL_DAYS,
          workoutGoal: "hypertrophy",
          workoutLevel: "beginner",
          crudOperation: "create",
          workout: { id: workout.id },
        },
      ],
    },
  });
  program = (await programRes.json())?.data;

  await ctx.close();
});

test.afterAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await apiSignIn(page);
  await page.request.delete(`${API_URL}/exercises/${exercise.id}`);
  //INFO: Deleting the user cascades to its workouts, programs and logged workouts
  await page.request.delete(`${API_URL}/auth/delete-user/${testUserId}`);
  await ctx.close();
});

test.beforeEach(async ({ page }) => {
  await apiSignIn(page);
});

// ---------------------------------------------------------------------------
// Home dashboard driven by the user's program and logged workouts
// ---------------------------------------------------------------------------

test.describe("Home dashboard", () => {
  test("shows the program plan before anything is logged", async ({ page }) => {
    await goHome(page);

    await expect(statCard(page, "This Week")).toContainText("0 / 7");
    await expect(statCard(page, "Current Streak")).toContainText(
      "0 workouts",
    );

    const nextWorkout = statCard(page, "Next Workout");
    await expect(nextWorkout).toContainText(toTitle(workout.name));
    await expect(nextWorkout).toContainText("Today");
    await expect(nextWorkout.getByRole("link", { name: "Start" })).toHaveAttribute(
      "href",
      `/workouts/workout-start/${program.id}/${workout.id}`,
    );

    await expect(page.getByText("No active program yet")).not.toBeVisible();
    await expect(
      page.getByText("Log a workout to see which muscles you train most."),
    ).toBeVisible();
  });

  test("updates the stats after logging today's workout", async ({ page }) => {
    await goHome(page);

    // Start today's workout straight from the dashboard
    await statCard(page, "Next Workout")
      .getByRole("link", { name: "Start" })
      .click();

    const exerciseHeading = page.getByRole("heading", {
      name: toTitle(exercise.name),
    });
    await expect(exerciseHeading).toBeVisible({ timeout: 10000 });
    await exerciseHeading.click();
    await page.getByRole("button", { name: "Complete All Sets" }).click();
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Saving goes back to the dashboard, which reloads the stats
    await expect(page).toHaveURL(/\/$/, { timeout: 10000 });
    await expect(statCard(page, "This Week")).toContainText("1 / 7", {
      timeout: 10000,
    });
    await expect(statCard(page, "Current Streak")).toContainText("1 workout");
    await expect(statCard(page, "Next Workout")).toContainText("Tomorrow");
    await expect(statCard(page, "Volume This Week")).toContainText(
      /Volume This Week[1-9]/,
    );

    await expect(
      page.getByText("Log a workout to see which muscles you train most."),
    ).not.toBeVisible();
    await expect(page.getByText("Pectoralis Major")).toBeVisible();
  });

  test("shows the logged exercise in the strength progress chart", async ({
    page,
  }) => {
    await goHome(page);

    const strengthChart = page.locator("section").filter({
      has: page.getByRole("heading", {
        name: "Strength Progress (estimated 1RM)",
      }),
    });
    await expect(strengthChart).toContainText(toTitle(exercise.name), {
      timeout: 10000,
    });
    await expect(
      strengthChart.getByText(
        "Log weighted sets to track how your strength grows.",
      ),
    ).not.toBeVisible();
  });
});
