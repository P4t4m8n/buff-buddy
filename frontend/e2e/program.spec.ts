import { test, expect, type Page } from "@playwright/test";
import toTitle from "../src/utils/toTitle";

const API_URL = "http://localhost:3030/api/v1";

// Test user credentials – created once per test file run
// The random suffix keeps parallel workers that load this file in the same
// millisecond from colliding.
const TEST_EMAIL = `e2e-program-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
const TEST_PASSWORD = "TestPass1";
const TEST_FIRST_NAME = "PrTest";
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

/** Create an exercise via API (needed to build workouts) */
async function apiCreateExercise(page: Page, ownerId: string) {
  const res = await page.request.post(`${API_URL}/exercises/edit`, {
    data: {
      name: `e2e-pr-exercise-${uniqueSuffix()}`,
      youtubeUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
      type: "strength",
      isCompounded: true,
      isSeparateHands: false,
      ownerId,
      equipment: [{ name: "barbell", crudOperation: "create" }],
      muscles: [{ name: "pectoralis_major", crudOperation: "create" }],
    },
  });
  const body = await res.json();
  return body?.data;
}

/** Delete an exercise via API */
async function apiDeleteExercise(page: Page, exerciseId: string) {
  await page.request.delete(`${API_URL}/exercises/${exerciseId}`);
}

/** Create a workout via API and return it */
async function apiCreateWorkout(page: Page, ownerId: string, exerciseId: string) {
  const res = await page.request.post(`${API_URL}/workouts/edit`, {
    data: {
      name: `e2e-pr-workout-${uniqueSuffix()}`,
      notes: "",
      isTemplate: false,
      ownerId,
      crudOperation: "create",
      workoutExercises: [
        {
          order: 1,
          notes: "",
          hasWarmup: false,
          numberOfSets: 3,
          maxNumberOfReps: 10,
          isDropSet: false,
          isMyoReps: false,
          restTime: 60,
          exerciseData: { id: exerciseId, type: "strength" },
          crudOperation: "create",
        },
      ],
    },
  });
  const body = await res.json();
  return body?.data;
}

/** Create a program via API and return it */
async function apiCreateProgram(
  page: Page,
  ownerId: string,
  workoutId: string,
  overrides: Record<string, unknown> = {},
) {
  const res = await page.request.post(`${API_URL}/programs/edit`, {
    data: {
      ownerId,
      name: `e2e-program-${uniqueSuffix()}`,
      notes: "E2e program notes",
      startDate: dayKeyFromToday(-180),
      endDate: dayKeyFromToday(180),
      isActive: true,
      programWorkouts: [
        {
          daysOfWeek: ["monday", "thursday"],
          workoutGoal: "hypertrophy",
          workoutLevel: "beginner",
          crudOperation: "create",
          workout: { id: workoutId },
        },
      ],
      ...overrides,
    },
  });
  const body = await res.json();
  return body?.data;
}

/** Delete a program via API */
async function apiDeleteProgram(page: Page, programId: string) {
  await page.request.delete(`${API_URL}/programs/${programId}`);
}

/** Navigate to the programs page and wait for it to load */
async function goToPrograms(page: Page) {
  await page.goto("/programs");
  await expect(
    page.getByRole("heading", { name: "Programs", exact: true }),
  ).toBeVisible({ timeout: 10000 });
}

/** Open filter, search by program name, submit */
async function filterPrograms(page: Page, programName: string) {
  await page.locator("form button[type='button']").first().click();
  await expect(page.getByText("Filter & Search")).toBeVisible();

  await page.locator("input#name-generic-filter").fill(programName);
  await page.getByRole("button", { name: "Search" }).click();
}

/** The program list card for a given program name */
function programCard(page: Page, programName: string) {
  return page
    .locator("ul li")
    .filter({ has: page.getByRole("heading", { name: toTitle(programName) }) });
}

// ---------------------------------------------------------------------------
// Test setup: create & clean up a dedicated test user, exercise and workout
// ---------------------------------------------------------------------------

let testUserId: string;
let testExercise: any;
let testWorkout: any;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  testUserId = await apiSignUp(page);
  testExercise = await apiCreateExercise(page, testUserId);
  testWorkout = await apiCreateWorkout(page, testUserId, testExercise.id);
  await ctx.close();
});

test.afterAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
  if (testExercise?.id) {
    await apiDeleteExercise(page, testExercise.id);
  }
  //INFO: Deleting the user cascades to its workouts and programs
  await apiDeleteUser(page, testUserId);
  await ctx.close();
});

test.beforeEach(async ({ page }) => {
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
});

// ---------------------------------------------------------------------------
// Programs list page
// ---------------------------------------------------------------------------

test.describe("Programs list page", () => {
  test("shows the programs page with header and create link", async ({
    page,
  }) => {
    await goToPrograms(page);

    const createLink = page.locator("a[href='/programs/edit']");
    await expect(createLink).toBeVisible();
    await expect(createLink).toHaveText("Create Programs");
  });

  test("displays a program card with name and active badge", async ({
    page,
  }) => {
    const program = await apiCreateProgram(page, testUserId, testWorkout.id);

    try {
      await goToPrograms(page);
      await filterPrograms(page, program.name);

      const card = programCard(page, program.name);
      await expect(card).toBeVisible({ timeout: 5000 });
      await expect(card.getByText("Active", { exact: true })).toBeVisible();
    } finally {
      await apiDeleteProgram(page, program.id);
    }
  });

  test('shows "No programs found" when the filter matches nothing', async ({
    page,
  }) => {
    await goToPrograms(page);
    await filterPrograms(page, `no-such-program-${uniqueSuffix()}`);

    await expect(page.getByText("No programs found")).toBeVisible({
      timeout: 5000,
    });
  });

  test("filter can be reset", async ({ page }) => {
    await goToPrograms(page);

    await page.locator("form button[type='button']").first().click();
    await page.locator("input#name-generic-filter").fill("something");
    await page.getByRole("button", { name: "Reset" }).click();

    await expect(page.locator("input#name-generic-filter")).toHaveValue("");
  });
});

// ---------------------------------------------------------------------------
// Program details
// ---------------------------------------------------------------------------

test.describe("Program details", () => {
  test("opens the details page from the program card", async ({ page }) => {
    const program = await apiCreateProgram(page, testUserId, testWorkout.id, {
      notes: "Details page notes",
    });

    try {
      await goToPrograms(page);
      await filterPrograms(page, program.name);

      await programCard(page, program.name)
        .locator(`a[href='/programs/${program.id}']`)
        .click();

      await expect(page).toHaveURL(new RegExp(`/programs/${program.id}$`));
      await expect(
        page.getByRole("heading", {
          name: toTitle(program.name + " Program Details"),
        }),
      ).toBeVisible({ timeout: 5000 });
      await expect(page.getByText("Details page notes")).toBeVisible();
    } finally {
      await apiDeleteProgram(page, program.id);
    }
  });

  test("shows a not-found message for an unknown program", async ({
    page,
  }) => {
    await page.goto("/programs/non-existent-program-id");

    await expect(page.getByText("No program found.")).toBeVisible({
      timeout: 10000,
    });
  });
});

// ---------------------------------------------------------------------------
// Program create
// ---------------------------------------------------------------------------

test.describe("Program create", () => {
  test("opens the create form from the list page", async ({ page }) => {
    await goToPrograms(page);
    await page.locator("a[href='/programs/edit']").click();

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });
    await expect(
      page.getByRole("button", { name: "Select date range" }),
    ).toBeVisible();

    // The week planner shows every day of the week
    for (const day of ALL_DAYS) {
      await expect(
        page.getByRole("heading", { name: toTitle(day), exact: true }),
      ).toBeVisible();
    }
  });

  test("does not save an empty program and shows field errors", async ({
    page,
  }) => {
    await page.goto("/programs/edit");
    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Stays on the create form and shows readable field errors
    await expect(page).toHaveURL(/\/programs\/edit$/);
    await expect(
      page.getByText(/Program name must be at least 1 characters/i),
    ).toBeVisible({ timeout: 5000 });
    await expect(page.locator("input[name='name']")).toHaveClass(
      /border-error-red/,
    );
    await expect(page.getByText("ZodError")).not.toBeVisible();
  });

  test("successfully creates a program with a scheduled workout", async ({
    page,
  }) => {
    const programName = `E2e ui program ${uniqueSuffix()}`;

    await goToPrograms(page);
    await page.locator("a[href='/programs/edit']").click();
    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    await page.locator("input[name='name']").fill(programName);
    await page.locator("textarea[name='notes']").fill("Created from the UI");

    // Pick a date range in the currently shown month
    await page.getByRole("button", { name: "Select date range" }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "28", exact: true }).click();
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(
      page.getByRole("button", { name: /\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4}/ }),
    ).toBeVisible();

    // The "add workout" icon button sits right before Cancel
    await page
      .getByRole("button", { name: "Cancel" })
      .locator("xpath=preceding-sibling::*[1]")
      .click();
    await expect(
      page.getByRole("heading", { name: "Select Workout" }),
    ).toBeVisible({ timeout: 5000 });

    await page
      .getByRole("listitem")
      .filter({
        has: page.getByRole("heading", { name: toTitle(testWorkout.name) }),
      })
      .getByRole("button", { name: "Select" })
      .click();

    const programWorkoutModal = page.locator("div").filter({
      has: page.getByRole("heading", { name: "Program Workout" }),
    }).last();
    await expect(programWorkoutModal).toBeVisible();

    // Pick the days by clicking their labels
    await programWorkoutModal.getByText("Mon", { exact: true }).click();
    await programWorkoutModal.getByText("Wed", { exact: true }).click();
    await expect(
      programWorkoutModal.locator("input[name='daysOfWeek'][value='Mon']"),
    ).toBeChecked();
    await expect(
      programWorkoutModal.locator("input[name='daysOfWeek'][value='Wed']"),
    ).toBeChecked();
    await programWorkoutModal
      .getByRole("button", { name: "Save", exact: true })
      .click();

    // The workout is now scheduled on Monday and Wednesday in the planner
    const dayCell = (day: string) =>
      page.getByRole("listitem").filter({
        has: page.getByRole("heading", { name: day, exact: true }),
      });
    await expect(dayCell("Monday")).toContainText(testWorkout.name);
    await expect(dayCell("Wednesday")).toContainText(testWorkout.name);
    await expect(dayCell("Sunday")).toContainText("No items found");

    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Saving navigates to the new program's details page
    await expect(
      page.getByRole("heading", {
        name: toTitle(programName + " Program Details"),
      }),
    ).toBeVisible({ timeout: 10000 });

    const programId = page.url().split("/").pop()!;
    try {
      const res = await page.request.get(`${API_URL}/programs/${programId}`);
      const { data } = await res.json();
      expect(data.programWorkouts).toHaveLength(1);
      expect(data.programWorkouts[0].workout.id).toBe(testWorkout.id);
      expect(data.programWorkouts[0].daysOfWeek).toEqual(
        expect.arrayContaining(["monday", "wednesday"]),
      );
    } finally {
      await apiDeleteProgram(page, programId);
    }
  });

  test("cancel button navigates back", async ({ page }) => {
    await goToPrograms(page);
    await page.locator("a[href='/programs/edit']").click();
    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page).toHaveURL(/\/programs$/);
  });
});

// ---------------------------------------------------------------------------
// Program update
// ---------------------------------------------------------------------------

test.describe("Program update", () => {
  test("opens the edit form with pre-filled data", async ({ page }) => {
    const program = await apiCreateProgram(page, testUserId, testWorkout.id);

    try {
      await goToPrograms(page);
      await filterPrograms(page, program.name);

      await programCard(page, program.name)
        .locator(`a[href='/programs/edit/${program.id}']`)
        .click();

      await expect(page.locator("input[name='name']")).toHaveValue(
        program.name,
        { timeout: 5000 },
      );
      await expect(
        page.getByRole("heading", { name: /Edit Program/i }),
      ).toBeVisible();

      // Scheduled workouts show up on their days
      const monday = page.getByRole("listitem").filter({
        has: page.getByRole("heading", { name: "Monday", exact: true }),
      });
      await expect(monday).toContainText(testWorkout.name);
    } finally {
      await apiDeleteProgram(page, program.id);
    }
  });

  test("can update the program name", async ({ page }) => {
    const program = await apiCreateProgram(page, testUserId, testWorkout.id);
    const updatedName = `e2e-updated-program-${uniqueSuffix()}`;

    try {
      await page.goto(`/programs/edit/${program.id}`);
      await expect(page.locator("input[name='name']")).toHaveValue(
        program.name,
        { timeout: 10000 },
      );

      await page.locator("input[name='name']").fill(updatedName);
      await page.getByRole("button", { name: "Save", exact: true }).click();

      await expect(
        page.getByRole("heading", {
          name: toTitle(updatedName + " Program Details"),
        }),
      ).toBeVisible({ timeout: 10000 });
    } finally {
      await apiDeleteProgram(page, program.id);
    }
  });
});

// ---------------------------------------------------------------------------
// Program delete
// ---------------------------------------------------------------------------

test.describe("Program delete", () => {
  test("can delete a program from the list", async ({ page }) => {
    const program = await apiCreateProgram(page, testUserId, testWorkout.id);

    await goToPrograms(page);
    await filterPrograms(page, program.name);

    const card = programCard(page, program.name);
    await expect(card).toBeVisible({ timeout: 5000 });

    await card.locator("button").last().click();

    await expect(card).not.toBeVisible({ timeout: 10000 });

    const res = await page.request.get(`${API_URL}/programs/${program.id}`);
    expect(res.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Weekly workouts page – driven by the user's programs
// ---------------------------------------------------------------------------

test.describe("Program on the weekly workouts page", () => {
  test("shows the program's workout for the day with a start link", async ({
    page,
  }) => {
    const workout = await apiCreateWorkout(page, testUserId, testExercise.id);
    const program = await apiCreateProgram(page, testUserId, workout.id, {
      programWorkouts: [
        {
          daysOfWeek: ALL_DAYS,
          workoutGoal: "hypertrophy",
          workoutLevel: "beginner",
          crudOperation: "create",
          workout: { id: workout.id },
        },
      ],
    });

    try {
      await page.goto("/workouts");
      await expect(
        page.getByRole("heading", { name: "Weekly Workouts" }),
      ).toBeVisible({ timeout: 10000 });

      const card = page.getByRole("listitem").filter({
        has: page.getByRole("heading", { name: workout.name, exact: true }),
      });
      await expect(card).toBeVisible({ timeout: 5000 });
      await expect(
        card.locator(
          `a[href='/workouts/workout-start/${program.id}/${workout.id}']`,
        ),
      ).toBeVisible();
    } finally {
      await apiDeleteProgram(page, program.id);
    }
  });
});
