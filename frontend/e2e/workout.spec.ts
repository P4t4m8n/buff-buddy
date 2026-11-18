import { test, expect, type Page } from "@playwright/test";
import toTitle from "../src/utils/toTitle";

const API_URL = "http://localhost:3030/api/v1";

// Test user credentials – created once per test file run
// The random suffix keeps parallel workers that load this file in the same
// millisecond from colliding.
const TEST_EMAIL = `e2e-workout-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
const TEST_PASSWORD = "TestPass1";
const TEST_FIRST_NAME = "WoTest";
const TEST_LAST_NAME = "User";

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

/** Create an exercise via API (needed to add exercises to workouts) */
async function apiCreateExercise(
  page: Page,
  ownerId: string,
  overrides: Record<string, unknown> = {},
) {
  const res = await page.request.post(`${API_URL}/exercises/edit`, {
    data: {
      // Exercise names are unique in the DB, so the random suffix keeps parallel
      // workers that create one in the same millisecond from colliding
      name: `e2e-wo-exercise-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      youtubeUrl: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
      type: "strength",
      isCompounded: true,
      isSeparateHands: false,
      ownerId,
      equipment: [{ name: "barbell", crudOperation: "create" }],
      muscles: [{ name: "pectoralis_major", crudOperation: "create" }],
      ...overrides,
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
async function apiCreateWorkout(
  page: Page,
  ownerId: string,
  exerciseId: string,
  overrides: Record<string, unknown> = {},
) {
  const res = await page.request.post(`${API_URL}/workouts/edit`, {
    data: {
      name: `e2e-workout-${Date.now()}`,
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
          numberOfSets: 3,
          maxNumberOfReps: 10,
          isDropSet: false,
          isMyoReps: false,
          restTime: 60,
          exerciseData: { id: exerciseId, type: "strength" },
          crudOperation: "create",
        },
      ],
      ...overrides,
    },
  });
  const body = await res.json();
  return body?.data;
}

/** Delete a workout via API */
async function apiDeleteWorkout(page: Page, workoutId: string) {
  await page.request.delete(`${API_URL}/workouts/${workoutId}`);
}

/** Navigate to workout list page and wait for it to load */
async function goToWorkoutList(page: Page) {
  await page.goto("/workouts/workout-list");
  await expect(
    page.getByRole("heading", { name: "Workout", exact: true }),
  ).toBeVisible({
    timeout: 10000,
  });
}

/** Open filter, search by workout name, submit */
async function filterWorkouts(page: Page, workoutName: string) {
  // Open filter
  const filterToggle = page.locator("form button[type='button']").first();
  await filterToggle.click();
  await expect(page.getByText("Filter & Search")).toBeVisible();

  // Type into the workoutName filter input
  await page.locator("input#workoutName-workout-filter").fill(workoutName);

  // Submit filter
  await page.getByRole("button", { name: "Search" }).click();
}

// ---------------------------------------------------------------------------
// Test setup: create & clean up a dedicated test user + exercise
// ---------------------------------------------------------------------------

let testUserId: string;
let testExercise: any;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  testUserId = await apiSignUp(page);
  testExercise = await apiCreateExercise(page, testUserId);
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
  await apiDeleteUser(page, testUserId);
  await ctx.close();
});

// Each test gets a fresh browser context. We sign in via API once per test.
test.beforeEach(async ({ page }) => {
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
});

// ---------------------------------------------------------------------------
// Workout list page – rendering
// ---------------------------------------------------------------------------

test.describe("Workout list page", () => {
  test("shows the workout list page with header and add button", async ({
    page,
  }) => {
    await goToWorkoutList(page);

    await expect(
      page.getByRole("heading", { name: "Workout", exact: true }),
    ).toBeVisible();

    // The "add new" link to /workouts/edit
    const addLink = page.locator("a[href='/workouts/edit']");
    await expect(addLink).toBeVisible();
  });

  test("displays workout cards when workouts exist", async ({ page }) => {
    const workout = await apiCreateWorkout(page, testUserId, testExercise.id, {
      name: `e2e-list-display-${Date.now()}`,
    });

    try {
      await goToWorkoutList(page);
      const card = page.locator("ul li").first();
      await expect(card).toBeVisible({ timeout: 5000 });
    } finally {
      await apiDeleteWorkout(page, workout?.id);
    }
  });
});

// ---------------------------------------------------------------------------
// Workout filter
// ---------------------------------------------------------------------------

test.describe("Workout filter", () => {
  test("can open and close filter panel", async ({ page }) => {
    await goToWorkoutList(page);

    // Open filter
    const filterToggle = page.locator("form button[type='button']").first();
    await filterToggle.click();
    await expect(page.getByText("Filter & Search")).toBeVisible();

    // Close via the X button
    const closeBtn = page
      .locator("form")
      .getByRole("button")
      .filter({ has: page.locator("svg") })
      .first();
    await closeBtn.click();
    await expect(page.getByText("Filter & Search")).not.toBeVisible();
  });

  test("can filter workouts by name", async ({ page }) => {
    const uniqueName = `E2e filter wo ${Date.now()}`;
    const workout = await apiCreateWorkout(page, testUserId, testExercise.id, {
      name: uniqueName,
    });

    try {
      await goToWorkoutList(page);
      await filterWorkouts(page, uniqueName);

      await expect(page.getByText(new RegExp(uniqueName, "i"))).toBeVisible({
        timeout: 5000,
      });
    } finally {
      await apiDeleteWorkout(page, workout.id);
    }
  });

  test("filter can be reset", async ({ page }) => {
    await goToWorkoutList(page);

    // Open filter
    const filterToggle = page.locator("form button[type='button']").first();
    await filterToggle.click();

    // Fill a name filter
    await page.locator("input#workoutName-workout-filter").fill("something");

    // Reset
    await page.getByRole("button", { name: "Reset" }).click();

    // Input should be cleared
    await expect(page.locator("input#workoutName-workout-filter")).toHaveValue(
      "",
    );
  });
});

// ---------------------------------------------------------------------------
// Workout create
// ---------------------------------------------------------------------------

test.describe("Workout create", () => {
  test("opens create page when clicking add button", async ({ page }) => {
    await goToWorkoutList(page);
    await page.locator("a[href='/workouts/edit']").click();

    // The edit form should appear with the name input
    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Header should say "Create Workout"
    await expect(
      page.getByRole("heading", { name: /Create Workout/i }),
    ).toBeVisible();
  });

  test("shows validation errors when submitting without exercise", async ({
    page,
  }) => {
    await page.goto("/workouts/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Fill name (required) but don't add exercises
    await page.locator("input[name='name']").fill("Test Workout");

    // Click Save
    await page.getByRole("button", { name: "Save" }).click();

    // Should see validation error about needing exercises
    await expect(
      page.getByText(/at least one|workout need at least one exercise/i),
    ).toBeVisible({ timeout: 3000 });
  });

  test("successfully creates a workout", async ({ page }) => {
    const workoutName = `E2e create wo ${Date.now()}`;

    // Enter through the list so the post-save "navigate back" has somewhere to go
    await goToWorkoutList(page);
    await page.locator("a[href='/workouts/edit']").click();

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Fill name
    await page.locator("input[name='name']").fill(workoutName);

    // Fill notes
    await page.locator("textarea[name='notes']").fill("E2e test notes");

    // "Add Exercise" opens the workout-exercise modal, which immediately opens
    // the exercise picker on top of it
    await page.getByRole("button", { name: "Add Exercise" }).click();

    const picker = page.locator("section").filter({
      has: page.getByRole("heading", { name: "Exercise Edit" }),
    });
    await expect(picker).toBeVisible({ timeout: 5000 });

    // Find the test exercise through the picker's own filter
    await picker.locator("form button[type='button']").first().click();
    await picker.locator("input#name-generic-filter").fill(testExercise.name);
    await picker.getByRole("button", { name: "Search" }).click();

    const exerciseTitle = toTitle(testExercise.name);
    await picker
      .locator("ul li")
      .filter({ hasText: exerciseTitle })
      .getByRole("button", { name: "Select" })
      .click();

    // Back in the workout-exercise modal: fill the required numbers
    await expect(picker).not.toBeVisible();
    await page.locator("input[name='numberOfSets']").fill("3");
    await page.locator("input[name='maxNumberOfReps']").fill("10");
    await page.locator("input[name='restTime']").fill("60");

    // Save the exercise into the workout (the modal's Save is type="button",
    // the workout form's Save is type="submit")
    await page
      .locator("button[type='button']")
      .filter({ hasText: /^Save$/ })
      .click();

    // Modal closes and the exercise shows up in the workout's exercise list
    await expect(page.locator("input[name='numberOfSets']")).not.toBeVisible();
    await expect(
      page.getByRole("heading", { name: exerciseTitle }),
    ).toBeVisible({ timeout: 5000 });
    await expect(page.locator("input[name='name']")).toHaveValue(workoutName);

    // Save the workout
    await page.getByRole("button", { name: "Save", exact: true }).click();

    // Should navigate away from edit page
    await expect(page.locator("form input[name='name']")).not.toBeVisible({
      timeout: 10000,
    });

    try {
      // Verify by searching in workout list
      await goToWorkoutList(page);
      await filterWorkouts(page, workoutName);

      await expect(
        page.getByText(new RegExp(toTitle(workoutName), "i")),
      ).toBeVisible({
        timeout: 5000,
      });
    } finally {
      // Cleanup
      const listRes = await page.request.get(
        `${API_URL}/workouts?workoutName=${encodeURIComponent(workoutName)}`,
      );
      const listBody = await listRes.json();
      const created = listBody?.data?.[0];
      if (created?.id) {
        await apiDeleteWorkout(page, created.id);
      }
    }
  });

  test("cancel button navigates back", async ({ page }) => {
    await goToWorkoutList(page);
    await page.locator("a[href='/workouts/edit']").click();

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Click Cancel
    await page.getByRole("button", { name: "Cancel" }).click();

    // Should go back to list
    await expect(page.locator("form input[name='name']")).not.toBeVisible({
      timeout: 5000,
    });
  });
});

// ---------------------------------------------------------------------------
// Workout update
// ---------------------------------------------------------------------------

test.describe("Workout update", () => {
  test("opens edit page with pre-filled data", async ({ page }) => {
    const workoutName = `e2e-edit-prefill-${Date.now()}`;
    const workout = await apiCreateWorkout(page, testUserId, testExercise.id, {
      name: workoutName,
    });

    try {
      await goToWorkoutList(page);
      await filterWorkouts(page, workoutName);

      // Click the edit link on the workout card
      const editLink = page.locator(`a[href='/workouts/edit/${workout.id}']`);
      await editLink.click();

      // Form should open with name pre-filled
      await expect(page.locator("input[name='name']")).toHaveValue(
        workoutName,
        { timeout: 5000 },
      );

      // Header should say "Edit Workout"
      await expect(
        page.getByRole("heading", { name: /Edit Workout/i }),
      ).toBeVisible();
    } finally {
      await apiDeleteWorkout(page, workout.id);
    }
  });

  test("can update workout name", async ({ page }) => {
    const workoutName = `e2e-update-wo-${Date.now()}`;
    const updatedName = `e2e-updated-wo-${Date.now()}`;
    const workout = await apiCreateWorkout(page, testUserId, testExercise.id, {
      name: workoutName,
    });

    try {
      await goToWorkoutList(page);
      await filterWorkouts(page, workoutName);

      // Open edit
      const editLink = page.locator(`a[href='/workouts/edit/${workout.id}']`);
      await editLink.click();

      await expect(page.locator("input[name='name']")).toBeVisible({
        timeout: 5000,
      });

      // Clear and type new name
      await page.locator("input[name='name']").fill(updatedName);

      // Save
      await page.getByRole("button", { name: "Save" }).click();

      // Should navigate away
      await expect(page.locator("form input[name='name']")).not.toBeVisible({
        timeout: 10000,
      });

      // Verify updated name in list (cards render names through toTitle)
      await goToWorkoutList(page);
      await filterWorkouts(page, updatedName);

      await expect(
        page.getByText(new RegExp(toTitle(updatedName), "i")),
      ).toBeVisible({
        timeout: 5000,
      });
    } finally {
      await apiDeleteWorkout(page, workout.id);
    }
  });
});

// ---------------------------------------------------------------------------
// Workout delete
// ---------------------------------------------------------------------------

test.describe("Workout delete", () => {
  test("can delete a workout from the list", async ({ page }) => {
    const workoutName = `e2e-delete-wo-${Date.now()}`;
    const workout = await apiCreateWorkout(page, testUserId, testExercise.id, {
      name: workoutName,
    });

    await goToWorkoutList(page);
    await filterWorkouts(page, workoutName);

    // Cards render names through toTitle
    const displayedName = new RegExp(toTitle(workoutName), "i");

    await expect(page.getByText(displayedName)).toBeVisible({
      timeout: 5000,
    });

    // Click the delete button on the workout card
    const workoutCard = page.locator("ul li").filter({
      hasText: displayedName,
    });
    const deleteBtn = workoutCard.locator("button").last();
    await deleteBtn.click();

    // Workout should disappear
    await expect(page.getByText(displayedName)).not.toBeVisible({
      timeout: 10000,
    });
  });
});

// ---------------------------------------------------------------------------
// Workout form – real-time validation
// ---------------------------------------------------------------------------

test.describe("Workout form – real-time validation", () => {
  test("validates workout name in real-time", async ({ page }) => {
    await page.goto("/workouts/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Type something then clear it
    await page.locator("input[name='name']").fill("test");
    await page.locator("input[name='name']").fill("");
    await page.locator("textarea[name='notes']").click();

    await expect(
      page.getByText(/Workout name must be at least 1 characters/i),
    ).toBeVisible({ timeout: 3000 });

    // Fix it
    await page.locator("input[name='name']").fill("Valid Name");
    await page.locator("textarea[name='notes']").click();

    await expect(
      page.getByText(/Workout name must be at least 1 characters/i),
    ).not.toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Workout template toggle
// ---------------------------------------------------------------------------

test.describe("Workout template toggle", () => {
  test("can toggle template switch", async ({ page }) => {
    await page.goto("/workouts/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // The "Private" / "Template" text is CSS ::after content on the label, so
    // it is not in the DOM. Assert on the label and the checkbox state instead.
    const templateSwitch = page.locator("input[name='isTemplate']");
    const templateLabel = page.locator(
      "label[data-after-inactive='Private'][data-after-active='Template']",
    );

    // Private by default
    await expect(templateLabel).toBeVisible();
    await expect(templateSwitch).not.toBeChecked();

    // The checkbox itself is hidden, so toggle it through its label
    await templateLabel.click();

    // Now a template
    await expect(templateSwitch).toBeChecked();
  });
});

// ---------------------------------------------------------------------------
// Weekly workouts page
// ---------------------------------------------------------------------------

test.describe("Weekly workouts page", () => {
  test("shows the weekly workouts page with day navigation", async ({
    page,
  }) => {
    await page.goto("/workouts");

    await expect(
      page.getByRole("heading", { name: "Weekly Workouts" }),
    ).toBeVisible({ timeout: 10000 });

    // Should show a day of the week
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayVisible = await Promise.any(
      days.map((day) =>
        expect(page.getByText(day, { exact: true }))
          .toBeVisible({ timeout: 2000 })
          .then(() => true),
      ),
    ).catch(() => false);
    expect(dayVisible).toBe(true);
  });

  test("can navigate between days", async ({ page }) => {
    await page.goto("/workouts");

    await expect(
      page.getByRole("heading", { name: "Weekly Workouts" }),
    ).toBeVisible({ timeout: 10000 });

    // Get the current day text
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    // Click the right arrow to go to next day
    const rightArrow = page.locator("button").filter({
      has: page.locator("svg.rotate-90"),
    });
    await rightArrow.click();

    // A day name should still be visible
    const dayVisible = await Promise.any(
      days.map((day) =>
        expect(page.getByText(new RegExp(`^${day}$`, "i")))
          .toBeVisible({ timeout: 2000 })
          .then(() => true),
      ),
    ).catch(() => false);
    expect(dayVisible).toBe(true);
  });

  test("has link to workout list", async ({ page }) => {
    await page.goto("/workouts");

    await expect(
      page.getByRole("heading", { name: "Weekly Workouts" }),
    ).toBeVisible({ timeout: 10000 });

    const listLink = page.locator("a[href='/workouts/workout-list']");
    await expect(listLink).toBeVisible();
    await expect(listLink).toHaveText("Workouts List");
  });
});
