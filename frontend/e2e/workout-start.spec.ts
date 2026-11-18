import { test, expect, type Page } from "@playwright/test";
import toTitle from "../src/utils/toTitle";

const API_URL = "http://localhost:3030/api/v1";

// Test user credentials – created once per test file run
// The random suffix keeps parallel workers that load this file in the same
// millisecond from colliding.
const TEST_EMAIL = `e2e-workout-start-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
const TEST_PASSWORD = "TestPass1";
const TEST_FIRST_NAME = "WsTest";
const TEST_LAST_NAME = "User";

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

/** Sign up via API and return the user id */
async function apiSignUp(page: Page) {
  const res = await page.request.post(`${API_URL}/auth/sign-up`, {
    data: {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD,
      firstName: TEST_FIRST_NAME,
      lastName: TEST_LAST_NAME,
    },
  });
  const body = await res.json();
  return body?.data?.id as string;
}

/** Delete the test user (requires auth cookie) */
async function apiDeleteUser(page: Page, userId: string) {
  await page.request.delete(`${API_URL}/auth/delete-user/${userId}`);
}

/** Delete an exercise via API */
async function apiDeleteExercise(page: Page, exerciseId: string) {
  await page.request.delete(`${API_URL}/exercises/${exerciseId}`);
}

/**
 * Create an exercise, a 2-set strength workout and a program that schedules it
 * on every day, so it always shows on today's weekly page.
 */
async function apiCreateScheduledWorkout(page: Page, ownerId: string) {
  const exerciseRes = await page.request.post(`${API_URL}/exercises/edit`, {
    data: {
      name: `e2e-ws-exercise-${uniqueSuffix()}`,
      youtubeUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
      type: "strength",
      isCompounded: true,
      isSeparateHands: false,
      ownerId,
      equipment: [{ name: "barbell", crudOperation: "create" }],
      muscles: [{ name: "pectoralis_major", crudOperation: "create" }],
    },
  });
  const exercise = (await exerciseRes.json())?.data;

  const workoutRes = await page.request.post(`${API_URL}/workouts/edit`, {
    data: {
      name: `e2e-ws-workout-${uniqueSuffix()}`,
      notes: "",
      isTemplate: false,
      ownerId,
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
  const workout = (await workoutRes.json())?.data;

  const programRes = await page.request.post(`${API_URL}/programs/edit`, {
    data: {
      ownerId,
      name: `e2e-ws-program-${uniqueSuffix()}`,
      notes: "",
      startDate: dayKeyFromToday(-180),
      endDate: dayKeyFromToday(180),
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
  const program = (await programRes.json())?.data;

  return { exercise, workout, program };
}

/** The logged sets saved for an exercise, from the user's workout history */
async function apiGetLoggedSets(page: Page, exerciseId: string) {
  const res = await page.request.get(
    `${API_URL}/user-workouts/user-exercises`,
  );
  const { data } = await res.json();
  return (data ?? [])
    .flatMap((userWorkout: any) => userWorkout.userWorkoutExercises)
    .filter((uwe: any) => uwe.workoutExercise?.exercise?.id === exerciseId)
    .flatMap((uwe: any) => uwe.userStrengthSets);
}

/** Open the workout start page and wait for the exercise to load */
async function goToWorkoutStart(
  page: Page,
  programId: string,
  workoutId: string,
  exerciseName: string,
) {
  await page.goto(`/workouts/workout-start/${programId}/${workoutId}`);
  await expect(
    page.getByRole("heading", { name: toTitle(exerciseName) }),
  ).toBeVisible({ timeout: 10000 });
}

/** The status icons of the exercise's sets (one per set) */
function setStatusIcons(page: Page) {
  return page.locator("form ul li li svg");
}

// ---------------------------------------------------------------------------
// Test setup: create & clean up a dedicated test user
// ---------------------------------------------------------------------------

let testUserId: string;
const createdExerciseIds: string[] = [];

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  testUserId = await apiSignUp(page);
  await ctx.close();
});

test.afterAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
  for (const exerciseId of createdExerciseIds) {
    await apiDeleteExercise(page, exerciseId);
  }
  //INFO: Deleting the user cascades to its workouts, programs and logged workouts
  await apiDeleteUser(page, testUserId);
  await ctx.close();
});

let scheduled: Awaited<ReturnType<typeof apiCreateScheduledWorkout>>;

test.beforeEach(async ({ page }) => {
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
  scheduled = await apiCreateScheduledWorkout(page, testUserId);
  createdExerciseIds.push(scheduled.exercise.id);
});

// ---------------------------------------------------------------------------
// Starting a workout
// ---------------------------------------------------------------------------

test.describe("Workout start – opening", () => {
  test("starts today's workout from the weekly workouts page", async ({
    page,
  }) => {
    const { program, workout, exercise } = scheduled;

    await page.goto("/workouts");
    await expect(
      page.getByRole("heading", { name: "Weekly Workouts" }),
    ).toBeVisible({ timeout: 10000 });

    await page
      .locator(`a[href='/workouts/workout-start/${program.id}/${workout.id}']`)
      .click();

    await expect(
      page.getByRole("heading", { name: "Workout Start" }),
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole("heading", { name: workout.name, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: toTitle(exercise.name) }),
    ).toBeVisible();
    await expect(page.getByText("Sets: 2")).toBeVisible();
  });

  test("lists every work set of the exercise", async ({ page }) => {
    const { program, workout, exercise } = scheduled;
    await goToWorkoutStart(page, program.id, workout.id, exercise.name);

    await page.getByRole("heading", { name: toTitle(exercise.name) }).click();

    await expect(page.getByRole("heading", { name: "Work Set:" })).toHaveCount(
      2,
    );
    await expect(page.getByRole("button", { name: "Log" })).toHaveCount(2);
    await expect(
      page.getByRole("button", { name: "Complete All Sets" }),
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Logging sets
// ---------------------------------------------------------------------------

test.describe("Workout start – logging", () => {
  test("completes all sets and saves the workout", async ({ page }) => {
    const { program, workout, exercise } = scheduled;

    // Enter from the weekly page so saving has a page to go back to
    await page.goto("/workouts");
    await page
      .locator(`a[href='/workouts/workout-start/${program.id}/${workout.id}']`)
      .click();
    await expect(
      page.getByRole("heading", { name: toTitle(exercise.name) }),
    ).toBeVisible({ timeout: 10000 });

    await page.getByRole("heading", { name: toTitle(exercise.name) }).click();
    await page.getByRole("button", { name: "Complete All Sets" }).click();

    const icons = setStatusIcons(page);
    await expect(icons).toHaveCount(2);
    await expect(icons.nth(0)).toHaveClass(/fill-success-green/);
    await expect(icons.nth(1)).toHaveClass(/fill-success-green/);

    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Saving leaves the workout start page
    await expect(page).not.toHaveURL(/workout-start/, { timeout: 10000 });

    const loggedSets = await apiGetLoggedSets(page, exercise.id);
    expect(loggedSets).toHaveLength(2);
    expect(loggedSets.every((set: any) => set.isCompleted)).toBe(true);
  });

  test("logs sets with custom reps and weight", async ({ page }) => {
    const { program, workout, exercise } = scheduled;
    await goToWorkoutStart(page, program.id, workout.id, exercise.name);

    await page.getByRole("heading", { name: toTitle(exercise.name) }).click();

    const logSet = async (setIdx: number, reps: string, weight: string) => {
      await page.getByRole("button", { name: "Log" }).nth(setIdx).click();

      const logModal = page
        .locator("div")
        .filter({ has: page.getByRole("heading", { name: "Log Set" }) })
        .last();
      await expect(logModal).toBeVisible();

      await logModal
        .locator("input[name^='userStrengthSets-reps']")
        .fill(reps);
      await logModal
        .locator("input[name^='userStrengthSets-weight']")
        .fill(weight);
      await logModal.getByRole("button", { name: "Complete" }).click();

      await expect(
        page.getByRole("heading", { name: "Log Set" }),
      ).not.toBeVisible();
    };

    await logSet(0, "12", "40");

    // The first set shows the logged values and is marked complete
    const firstSet = page.locator("form ul li li").first();
    await expect(firstSet).toContainText("12");
    await expect(firstSet).toContainText("40");
    await expect(setStatusIcons(page).first()).toHaveClass(
      /fill-success-green/,
    );

    await logSet(1, "10", "45");

    await page.getByRole("button", { name: "Save", exact: true }).click();

    await expect
      .poll(async () => (await apiGetLoggedSets(page, exercise.id)).length, {
        timeout: 10000,
      })
      .toBe(2);
    const loggedSets = await apiGetLoggedSets(page, exercise.id);
    expect(loggedSets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ reps: 12, weight: 40, isCompleted: true }),
        expect.objectContaining({ reps: 10, weight: 45, isCompleted: true }),
      ]),
    );
  });

  test("does not save while a set is neither logged nor skipped", async ({
    page,
  }) => {
    const { program, workout, exercise } = scheduled;
    await goToWorkoutStart(page, program.id, workout.id, exercise.name);

    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Stays on the page, flags the exercise and saves nothing
    await expect(page.getByText(/Reps must be at least 1/)).toBeVisible({
      timeout: 5000,
    });
    // The toast shows readable messages, not the raw validation JSON
    await expect(page.getByText(/too_small/)).not.toBeVisible();
    await expect(page).toHaveURL(/workout-start/);
    await expect(page.locator("form ul > li").first()).toHaveClass(
      /border-error-red/,
    );
    expect(await apiGetLoggedSets(page, exercise.id)).toHaveLength(0);
  });

  test("skips an exercise with a reason", async ({ page }) => {
    const { program, workout, exercise } = scheduled;
    await goToWorkoutStart(page, program.id, workout.id, exercise.name);

    await page.getByRole("heading", { name: toTitle(exercise.name) }).click();
    await page.getByRole("button", { name: "Skip", exact: true }).click();

    await page
      .getByRole("textbox", { name: "Reason for Skipping" })
      .fill("Shoulder pain");
    await page.getByRole("button", { name: "Save", exact: true }).first().click();

    await expect(
      page.getByRole("textbox", { name: "Reason for Skipping" }),
    ).not.toBeVisible();

    const icons = setStatusIcons(page);
    await expect(icons.nth(0)).toHaveClass(/fill-warning-yellow/);
    await expect(icons.nth(1)).toHaveClass(/fill-warning-yellow/);

    await page.getByRole("button", { name: "Save", exact: true }).click();

    await expect
      .poll(async () => (await apiGetLoggedSets(page, exercise.id)).length, {
        timeout: 10000,
      })
      .toBe(2);
    const loggedSets = await apiGetLoggedSets(page, exercise.id);
    //INFO: The backend stores text lower-cased
    expect(
      loggedSets.every(
        (set: any) => set.skippedReason?.toLowerCase() === "shoulder pain",
      ),
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Session persistence & cancel
// ---------------------------------------------------------------------------

test.describe("Workout start – session", () => {
  test("keeps logged progress after a page refresh", async ({ page }) => {
    const { program, workout, exercise } = scheduled;
    await goToWorkoutStart(page, program.id, workout.id, exercise.name);

    await page.getByRole("heading", { name: toTitle(exercise.name) }).click();
    await page.getByRole("button", { name: "Complete All Sets" }).click();
    await expect(setStatusIcons(page).first()).toHaveClass(
      /fill-success-green/,
    );

    await page.reload();
    await expect(
      page.getByRole("heading", { name: toTitle(exercise.name) }),
    ).toBeVisible({ timeout: 10000 });

    const icons = setStatusIcons(page);
    await expect(icons.nth(0)).toHaveClass(/fill-success-green/);
    await expect(icons.nth(1)).toHaveClass(/fill-success-green/);
  });

  test("cancel leaves without saving the workout", async ({ page }) => {
    const { program, workout, exercise } = scheduled;

    await page.goto("/workouts");
    await page
      .locator(`a[href='/workouts/workout-start/${program.id}/${workout.id}']`)
      .click();
    await expect(
      page.getByRole("heading", { name: toTitle(exercise.name) }),
    ).toBeVisible({ timeout: 10000 });

    await page.getByRole("heading", { name: toTitle(exercise.name) }).click();
    await page.getByRole("button", { name: "Complete All Sets" }).click();
    await page.getByRole("button", { name: "Cancel", exact: true }).click();

    await expect(page).not.toHaveURL(/workout-start/, { timeout: 10000 });
    expect(await apiGetLoggedSets(page, exercise.id)).toHaveLength(0);
  });
});
