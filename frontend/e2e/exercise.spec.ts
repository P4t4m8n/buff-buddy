import { test, expect, type Page } from "@playwright/test";
import  toTitle  from "../src/utils/toTitle";
const API_URL = "http://localhost:3030/api/v1";

// Test user credentials – created once per test file run
const TEST_EMAIL = `e2e-exercise-${Date.now()}@test.com`;
const TEST_PASSWORD = "TestPass1";
const TEST_FIRST_NAME = "ExTest";
const TEST_LAST_NAME = "User";

// Exercise data
const YOUTUBE_URL = "https://www.youtube.com/watch?v=rT7DgCr-3pg";
const YOUTUBE_URL_2 = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

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

/** Create an exercise via API and return it */
async function apiCreateExercise(
  page: Page,
  ownerId: string,
  overrides: Record<string, unknown> = {},
) {
  const res = await page.request.post(`${API_URL}/exercises/edit`, {
    data: {
      name: `e2e-exercise-${Date.now()}`,
      youtubeUrl: YOUTUBE_URL,
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

/** Navigate to exercises page and wait for it to load */
async function goToExercises(page: Page) {
  await page.goto("/exercises");
  // Wait for the page header
  await expect(page.getByRole("heading", { name: "Exercises" })).toBeVisible({
    timeout: 10000,
  });
}

/** Open the "type" select dropdown in the exercise edit modal and pick a type */
async function selectExerciseType(page: Page, type: string) {
  // The type dropdown shows "Select a Type" or the selected type
  const typeDropdownButton = page
    .locator("form")
    .locator("div.group.relative")
    .locator("button")
    .first();
  await typeDropdownButton.click();

  // Click the option in the dropdown list
  await page
    .locator("div.group.relative ul")
    .getByText(type, { exact: true })
    .click();
}

async function filterExercises(page: Page, exerciseName: string) {
  // Open filter
  const filterToggle = page.locator("form button[type='button']").first();
  await filterToggle.click();

  await expect(page.getByText("Filter & Search")).toBeVisible();

  // Type into the name filter
  await page.locator("input#name-generic-filter").fill(exerciseName);

  // Submit filter
  await page.getByRole("button", { name: "Search" }).click();
}

/** Open a multi-select dropdown (muscles or equipment) and pick an item */
async function selectMultiItem(
  page: Page,
  sectionLabel: string,
  itemName: string,
) {
  // Find the SelectMultiWithSearch by the "No selected <label>" text or existing selection
  const container = page.locator("form .relative.w-full.h-fit").filter({
    has: page.locator(`text=/${sectionLabel}|No selected/i`),
  });

  // Open the dropdown
  await container.locator("button").last().click();

  // Wait for dropdown to appear and search
  const dropdown = page.locator(
    "div.absolute.shadow-\\[0px_0px_6px_1px_rgba\\(0\\,0\\,0\\,1\\)\\]",
  );
  await expect(dropdown).toBeVisible({ timeout: 3000 });

  // Type in search input
  const searchInput = dropdown.locator("input[placeholder='Search by name']");
  await searchInput.fill(itemName);

  // Click the item button
  await dropdown.getByText(itemName, { exact: false }).first().click();
}

// ---------------------------------------------------------------------------
// Test setup: create & clean up a dedicated test user
// ---------------------------------------------------------------------------

let testUserId: string;

test.beforeAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  testUserId = await apiSignUp(page);
  await ctx.close();
});

test.afterAll(async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  // Sign in to get cookie, then delete user
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
  await apiDeleteUser(page, testUserId);
  await ctx.close();
});

// Each test gets a fresh browser context. We sign in via UI once per test.
test.beforeEach(async ({ page }) => {
  // Sign in via API to set the cookie
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
});

// ---------------------------------------------------------------------------
// Exercise list page – rendering
// ---------------------------------------------------------------------------

test.describe("Exercise list page", () => {
  test("shows the exercises page with header and add button", async ({
    page,
  }) => {
    await goToExercises(page);

    await expect(
      page.getByRole("heading", { name: "Exercises" }),
    ).toBeVisible();

    // The "add new" link to /exercises/edit
    const addLink = page.locator("a[href='/exercises/edit']");
    await expect(addLink).toBeVisible();
  });

  test('shows "No exercises found" when user has no exercises', async ({
    page,
  }) => {
    await goToExercises(page);

    // Wait for loading to finish
    await page.waitForTimeout(1000);

    // If user has no exercises, the empty state message appears
    const noItems = page.getByText("No exercises found");
    const exerciseList = page.locator("ul li").first();

    // Either we see exercises or the empty state
    const hasExercises = await exerciseList.isVisible().catch(() => false);
    if (!hasExercises) {
      await expect(noItems).toBeVisible();
      await expect(
        page.getByText("Create your first exercise to get started!"),
      ).toBeVisible();
    }
  });

  test("displays exercise cards when exercises exist", async ({ page }) => {
    // Create an exercise via API
    const exercise = await apiCreateExercise(page, testUserId, {
      name: `e2e-list-display-${Date.now()}`,
    });

    try {
      await goToExercises(page);

      // Should see at least one exercise card
      const card = page.locator("ul li").first();
      await expect(card).toBeVisible({ timeout: 5000 });
    } finally {
      await apiDeleteExercise(page, exercise.id);
    }
  });
});

// ---------------------------------------------------------------------------
// Exercise filter
// ---------------------------------------------------------------------------

test.describe("Exercise filter", () => {
  test("can open and close filter panel", async ({ page }) => {
    await goToExercises(page);

    // Click the search/filter icon button to open filter
    const filterToggle = page.locator("form button[type='button']").first();
    await filterToggle.click();

    // Filter heading should appear
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

  test("can filter exercises by name", async ({ page }) => {
    const uniqueName = `E2e Filter ${Date.now()}`;
    const exercise = await apiCreateExercise(page, testUserId, {
      name: uniqueName,
    });

    try {
      await goToExercises(page);

      // Open filter
      const filterToggle = page.locator("form button[type='button']").first();
      await filterToggle.click();

      await expect(page.getByText("Filter & Search")).toBeVisible();

      // Type into the name filter
      await page.locator("input#name-generic-filter").fill(uniqueName);

      // Submit filter
      await page.getByRole("button", { name: "Search" }).click();

      // Should see the exercise
      await expect(page.getByText(new RegExp(uniqueName, "i"))).toBeVisible({
        timeout: 5000,
      });
    } finally {
      await apiDeleteExercise(page, exercise.id);
    }
  });

  test("filter can be reset", async ({ page }) => {
    await goToExercises(page);

    // Open filter
    const filterToggle = page.locator("form button[type='button']").first();
    await filterToggle.click();

    // Fill a name filter
    await page.locator("input#name-generic-filter").fill("something");

    // Reset
    await page.getByRole("button", { name: "Reset" }).click();

    // Input should be cleared
    await expect(page.locator("input#name-generic-filter")).toHaveValue("");
  });
});

// ---------------------------------------------------------------------------
// Exercise create (edit modal)
// ---------------------------------------------------------------------------

test.describe("Exercise create", () => {
  test("opens create modal when clicking add button", async ({ page }) => {
    await goToExercises(page);

    await page.locator("a[href='/exercises/edit']").click();

    // The edit form should appear (it's a modal overlay)
    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });
  });

  test("shows validation errors when submitting empty form", async ({
    page,
  }) => {
    await page.goto("/exercises/edit");

    // Wait for the form
    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Click Save
    await page.getByRole("button", { name: "Save" }).click();

    // Should see validation errors
    await expect(
      page.getByText(/Exercise name must be at least 1 characters/i),
    ).toBeVisible({ timeout: 3000 });
    await expect(
      page.getByText(/Youtube url must be at least 1 characters/i),
    ).toBeVisible();
  });

  test("shows error for invalid YouTube URL", async ({ page }) => {
    await page.goto("/exercises/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Fill in an invalid YouTube URL
    await page.locator("input[name='youtubeUrl']").fill("not-a-url");
    await page.locator("input[name='name']").click();

    // Should show YouTube URL validation error
    await expect(
      page.getByText(/Must be a valid YouTube URL|Must be a valid URL/i),
    ).toBeVisible({ timeout: 3000 });
  });

  test("successfully creates an exercise", async ({ page }) => {
    const exerciseName = `E2e Create ${Date.now()}`;

    await page.goto("/exercises/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Fill name
    await page.locator("input[name='name']").fill(exerciseName);

    // Fill YouTube URL
    await page.locator("input[name='youtubeUrl']").fill(YOUTUBE_URL);

    // Select type: use the type dropdown
    await selectExerciseType(page, "Strength");

    // Select a muscle: open the muscles multi-select
    // The muscles multi-select shows "No selected Muscles" when empty
    const musclesContainer = page
      .locator("form .relative.w-full.h-fit")
      .first();
    await musclesContainer.locator("button").last().click();

    // Wait for dropdown
    const muscleDropdown = page
      .locator(
        "div.absolute.shadow-\\[0px_0px_6px_1px_rgba\\(0\\,0\\,0\\,1\\)\\]",
      )
      .first();
    await expect(muscleDropdown).toBeVisible({ timeout: 3000 });
    await muscleDropdown
      .locator("input[placeholder='Search by name']")
      .fill("pectoralis");
    await muscleDropdown.getByText("Pectoralis Major").click();

    // Select equipment: open the equipment multi-select
    const equipmentContainer = page
      .locator("form .relative.w-full.h-fit")
      .last();
    await equipmentContainer.locator("button").last().click();

    const equipDropdown = page
      .locator(
        "div.absolute.shadow-\\[0px_0px_6px_1px_rgba\\(0\\,0\\,0\\,1\\)\\]",
      )
      .last();
    await expect(equipDropdown).toBeVisible({ timeout: 3000 });
    await equipDropdown
      .locator("input[placeholder='Search by name']")
      .fill("barbell");
    await equipDropdown.getByText("Barbell").click();

    // Save
    await page.getByRole("button", { name: "Save" }).click();

    // Modal should close and redirect to exercise list
    await expect(page.locator("form input[name='name']")).not.toBeVisible({
      timeout: 10000,
    });

    // Verify the exercise appears in the list
    await goToExercises(page);

    // Open filter and search for our exercise
    const filterToggle = page.locator("form button[type='button']").first();
    await filterToggle.click();
    await page.locator("input#name-generic-filter").fill(exerciseName);
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText(new RegExp(exerciseName, "i"))).toBeVisible({
      timeout: 5000,
    });

    // Cleanup: find the exercise ID and delete via API
    const listRes = await page.request.get(
      `${API_URL}/exercises?name=${exerciseName}`,
    );
    const listBody = await listRes.json();
    const createdExercise = listBody?.data?.[0];
    if (createdExercise?.id) {
      await apiDeleteExercise(page, createdExercise.id);
    }
  });

  test("cancel button closes the form without saving", async ({ page }) => {
    await page.goto("/exercises/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Click Cancel
    await page.getByRole("button", { name: "Cancel" }).click();

    // Form should close
    await expect(page.locator("form input[name='name']")).not.toBeVisible({
      timeout: 5000,
    });
  });
});

// ---------------------------------------------------------------------------
// Exercise details
// ---------------------------------------------------------------------------

test.describe("Exercise details", () => {
  test("shows exercise details in a modal", async ({ page }) => {
    const exerciseName = `E2e Details${Date.now()}`;
    const exercise = await apiCreateExercise(page, testUserId, {
      name: exerciseName,
    });

    try {
      await goToExercises(page);

      // Open filter
      const filterToggle = page.locator("form button[type='button']").first();
      await filterToggle.click();

      await expect(page.getByText("Filter & Search")).toBeVisible();

      // Type into the name filter
      await page.locator("input#name-generic-filter").fill(exerciseName);

      // Submit filter
      await page.getByRole("button", { name: "Search" }).click();

      // Click the details link on the exercise card
      const detailsLink = page.locator(`a[href='/exercises/${exercise.id}']`);
      await detailsLink.click();

      // Details modal should show
      await expect(
        page.getByRole("heading", { name: new RegExp(exerciseName, "i") }),
      ).toBeVisible({ timeout: 5000 });

      // Should show exercise type
      await expect(page.getByText("Strength")).toBeVisible();

      // Should show compound/isolation
      await expect(page.getByText("Compound movement")).toBeVisible();

      // Should show muscles
      await expect(page.getByText("Pectoralis Major").first()).toBeVisible();

      // Should show equipment
      await expect(page.getByText("Barbell").first()).toBeVisible();

      // Close button
      await page.getByRole("button", { name: "Close" }).click();

      // Modal should close
      await expect(page.getByRole("button", { name: "Close" })).not.toBeVisible(
        { timeout: 3000 },
      );
    } finally {
      await apiDeleteExercise(page, exercise.id);
    }
  });
});

// ---------------------------------------------------------------------------
// Exercise edit (update)
// ---------------------------------------------------------------------------

test.describe("Exercise update", () => {
  test("opens edit modal with pre-filled data", async ({ page }) => {
    const exerciseName = `E2e Edit Prefill ${Date.now()}`;
    const exercise = await apiCreateExercise(page, testUserId, {
      name: exerciseName,
    });
    console.log("🚀 ~ exercise:", exercise)

    try {
      await goToExercises(page);

      await filterExercises(page,exerciseName)

      // Click the edit link
      const editLink = page.locator(`a[href='/exercises/edit/${exercise.id}']`);
      await editLink.click();

      // Form should open with the exercise name pre-filled
      await expect(page.locator("input[name='name']")).toHaveValue(
        exerciseName,
        { timeout: 5000 },
      );

      // YouTube URL should be pre-filled
      await expect(page.locator("input[name='youtubeUrl']")).toHaveValue(
        YOUTUBE_URL,
      );

      // Type should be selected
      await expect(page.getByText("Strength")).toBeVisible();
    } finally {
      await apiDeleteExercise(page, exercise.id);
    }
  });

  test("can update exercise name", async ({ page }) => {
    const exerciseName = `e2e-update-${Date.now()}`;
    const updatedName = `E2e Updated ${Date.now()}`;
    const exercise = await apiCreateExercise(page, testUserId, {
      name: exerciseName,
    });

    try {
      await goToExercises(page);

      await filterExercises(page,exerciseName)

      // Open edit modal
      const editLink = page.locator(`a[href='/exercises/edit/${exercise.id}']`);
      await editLink.click();

      await expect(page.locator("input[name='name']")).toBeVisible({
        timeout: 5000,
      });

      // Clear and type new name
      await page.locator("input[name='name']").fill(updatedName);

      // Save
      await page.getByRole("button", { name: "Save" }).click();

      // Modal should close
      await expect(page.locator("form input[name='name']")).not.toBeVisible({
        timeout: 10000,
      });

      // Verify the updated name by searching
      await goToExercises(page);
      const filterToggle = page.locator("form button[type='button']").first();
      await filterToggle.click();
      await page.locator("input#name-generic-filter").fill(updatedName);
      await page.getByRole("button", { name: "Search" }).click();

      await expect(page.getByText(new RegExp(updatedName, "i"))).toBeVisible({
        timeout: 5000,
      });
    } finally {
      await apiDeleteExercise(page, exercise.id);
    }
  });
});

// ---------------------------------------------------------------------------
// Exercise delete
// ---------------------------------------------------------------------------

test.describe("Exercise delete", () => {
  test("can delete an exercise from the list", async ({ page }) => {
    const exerciseName = `e2e delete ${Date.now()}`;
    const exercise = await apiCreateExercise(page, testUserId, {
      name: exerciseName,
    });

    await goToExercises(page);

    // Verify the exercise appears
    // Open filter, search for it
    await filterExercises(page,exerciseName)

    // Click the delete button on the exercise card
    // The delete button is a button within the exercise card's action nav
    const exerciseCard = page.locator("ul li").filter({
      hasText: new RegExp(toTitle( exerciseName), "i"),
    });
    const deleteBtn = exerciseCard.locator("nav button").last();
    await deleteBtn.click();

    // Exercise should disappear
    await expect(page.getByText(new RegExp(exerciseName, "i"))).not.toBeVisible(
      { timeout: 10000 },
    );
  });
});

// ---------------------------------------------------------------------------
// Exercise name validation (real-time)
// ---------------------------------------------------------------------------

test.describe("Exercise form – real-time validation", () => {
  test("validates exercise name in real-time", async ({ page }) => {
    await page.goto("/exercises/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    // Type something then clear it
    await page.locator("input[name='name']").fill("test");
    await page.locator("input[name='name']").fill("");
    await page.locator("input[name='youtubeUrl']").click();

    await expect(
      page.getByText(/Exercise name must be at least 1 characters/i),
    ).toBeVisible({ timeout: 3000 });

    // Fix it
    await page.locator("input[name='name']").fill("Valid Name");
    await page.locator("input[name='youtubeUrl']").click();

    await expect(
      page.getByText(/Exercise name must be at least 1 characters/i),
    ).not.toBeVisible();
  });

  test("validates YouTube URL in real-time", async ({ page }) => {
    await page.goto("/exercises/edit");

    await expect(page.locator("form input[name='name']")).toBeVisible({
      timeout: 5000,
    });

    await page.locator("input[name='youtubeUrl']").fill("invalid-url");
    await page.locator("input[name='name']").click();

    await expect(
      page.getByText(/Must be a valid YouTube URL|Must be a valid URL/i),
    ).toBeVisible({ timeout: 3000 });

    await page.locator("input[name='youtubeUrl']").fill(YOUTUBE_URL);
    await page.locator("input[name='name']").click();

    await expect(
      page.getByText(/Must be a valid YouTube URL|Must be a valid URL/i),
    ).not.toBeVisible();
  });
});
