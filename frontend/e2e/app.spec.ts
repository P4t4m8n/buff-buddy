import { test, expect, type Page } from "@playwright/test";

const API_URL = "http://localhost:3030/api/v1";

// Test user credentials – created once per test file run
// The random suffix keeps parallel workers that load this file in the same
// millisecond from colliding.
const TEST_EMAIL = `e2e-app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
const TEST_PASSWORD = "TestPass1";
const TEST_FIRST_NAME = "AppShell";
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

async function apiSignIn(page: Page) {
  await page.request.post(`${API_URL}/auth/sign-in`, {
    data: { email: TEST_EMAIL, password: TEST_PASSWORD },
  });
}

/** The bottom navigation bar */
function appNav(page: Page) {
  return page.getByRole("contentinfo").getByRole("navigation");
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
  await apiSignIn(page);
  await apiDeleteUser(page, testUserId);
  await ctx.close();
});

// ---------------------------------------------------------------------------
// Auth guard
// ---------------------------------------------------------------------------

test.describe("Auth guard", () => {
  for (const path of ["/", "/workouts", "/programs", "/exercises", "/profile"]) {
    test(`shows the sign-in page on ${path} when signed out`, async ({
      page,
    }) => {
      await page.goto(path);

      await expect(page.getByText("Welcome Back")).toBeVisible({
        timeout: 10000,
      });
      await expect(appNav(page)).not.toBeVisible();
    });
  }
});

// ---------------------------------------------------------------------------
// Signed-in app shell
// ---------------------------------------------------------------------------

test.describe("Signed in", () => {
  test.beforeEach(async ({ page }) => {
    await apiSignIn(page);
  });

  test.describe("Home dashboard", () => {
    test("greets the user and shows the stats and charts", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(
        page.getByRole("heading", {
          name: new RegExp(`Welcome Back, ${TEST_FIRST_NAME}!`, "i"),
        }),
      ).toBeVisible({ timeout: 10000 });

      for (const stat of [
        "Steps Today",
        "Calories Burned",
        "Workouts This Week",
      ]) {
        await expect(page.getByText(stat)).toBeVisible();
      }
      await expect(
        page.getByRole("heading", { name: "Daily Activity" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Most Trained Muscles" }),
      ).toBeVisible();
    });
  });

  test.describe("Bottom navigation", () => {
    test("shows a link for every main section", async ({ page }) => {
      await page.goto("/");

      const nav = appNav(page);
      await expect(nav).toBeVisible({ timeout: 10000 });
      for (const label of [
        "HOME",
        "WORKOUTS",
        "PROGRAMS",
        "EXERCISES",
        "PROFILE",
      ]) {
        await expect(nav.getByRole("link", { name: label })).toBeVisible();
      }
    });

    const sections = [
      { label: "WORKOUTS", url: /\/workouts$/, heading: "Weekly Workouts" },
      { label: "PROGRAMS", url: /\/programs$/, heading: "Programs" },
      { label: "EXERCISES", url: /\/exercises$/, heading: "Exercises" },
      { label: "PROFILE", url: /\/profile$/, heading: /Profile$/ },
      { label: "HOME", url: /\/$/, heading: /Welcome Back/ },
    ];

    test("navigates to every section", async ({ page }) => {
      // Start somewhere other than home so the HOME link is exercised too
      await page.goto("/programs");
      await expect(appNav(page)).toBeVisible({ timeout: 10000 });

      for (const { label, url, heading } of sections) {
        await appNav(page).getByRole("link", { name: label }).click();

        await expect(page).toHaveURL(url);
        await expect(
          page.getByRole("heading", { name: heading }).first(),
        ).toBeVisible({ timeout: 10000 });
      }
    });
  });

  test.describe("Profile", () => {
    test("shows the user's details", async ({ page }) => {
      await page.goto("/profile");

      await expect(
        page.getByRole("heading", {
          name: new RegExp(`${TEST_FIRST_NAME} profile`, "i"),
        }),
      ).toBeVisible({ timeout: 10000 });
      await expect(page.getByText(TEST_EMAIL, { exact: true })).toBeVisible();
      await expect(
        page.getByText(new RegExp(`${TEST_LAST_NAME} ${TEST_FIRST_NAME}`, "i")),
      ).toBeVisible();
    });

    test("links to the user's exercises, workouts and programs", async ({
      page,
    }) => {
      await page.goto("/profile");

      await expect(
        page.getByRole("link", { name: "Exercises", exact: true }),
      ).toHaveAttribute("href", "/profile/exercises", { timeout: 10000 });
      await expect(page.getByRole("link", { name: "Workouts", exact: true })).toHaveAttribute(
        "href",
        "/profile/workouts",
      );
      await expect(page.getByRole("link", { name: "Programs", exact: true })).toHaveAttribute(
        "href",
        "/programs",
      );
    });

    test("profile exercises page shows the empty state for a new user", async ({
      page,
    }) => {
      await page.goto("/profile");
      await page.getByRole("link", { name: "Exercises", exact: true }).click();

      await expect(page).toHaveURL(/\/profile\/exercises$/);
      await expect(page.getByText("No exercises found")).toBeVisible({
        timeout: 10000,
      });
    });

    test("profile workouts page opens", async ({ page }) => {
      await page.goto("/profile");
      await page.getByRole("link", { name: "Workouts", exact: true }).click();

      await expect(page).toHaveURL(/\/profile\/workouts$/);
      await expect(appNav(page)).toBeVisible();
    });

    test("signs the user out", async ({ page }) => {
      await page.goto("/profile");

      await page.getByRole("button", { name: "Sign Out" }).click();

      await expect(page.getByText("Welcome Back")).toBeVisible({
        timeout: 10000,
      });

      // The session cookie is gone, so a refresh stays signed out
      await page.reload();
      await expect(page.getByText("Welcome Back")).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe("Admin", () => {
    test("admin page opens inside the app shell", async ({ page }) => {
      await page.goto("/admin");

      await expect(appNav(page)).toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(/\/admin$/);
    });
  });
});

// ---------------------------------------------------------------------------
// Edit profile – each test renames its own user, so other tests keep their name
// ---------------------------------------------------------------------------

test.describe("Edit profile", () => {
  let editUserId: string;

  test.beforeEach(async ({ page }) => {
    const res = await page.request.post(`${API_URL}/auth/sign-up`, {
      data: {
        email: `e2e-profile-edit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        firstName: "Before",
        lastName: "Edit",
      },
    });
    editUserId = (await res.json())?.data?.id;
  });

  test.afterEach(async ({ page }) => {
    await apiDeleteUser(page, editUserId);
  });

  test("opens the edit form from the profile with the current name", async ({
    page,
  }) => {
    await page.goto("/profile");
    await page.getByRole("link", { name: "Edit Profile" }).click();

    await expect(page).toHaveURL(/\/profile\/edit$/);
    await expect(
      page.getByRole("heading", { name: "Edit Profile" }),
    ).toBeVisible({ timeout: 10000 });
    await expect(page.locator("input[name='firstName']")).toHaveValue(
      "before",
    );
    await expect(page.locator("input[name='lastName']")).toHaveValue("edit");
  });

  test("saves a new name and shows it on the profile", async ({ page }) => {
    await page.goto("/profile/edit");
    await expect(page.locator("input[name='firstName']")).toHaveValue(
      "before",
      { timeout: 10000 },
    );

    await page.locator("input[name='firstName']").fill("After");
    await page.locator("input[name='lastName']").fill("Saved");
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await expect(page).toHaveURL(/\/profile$/, { timeout: 10000 });
    await expect(
      page.getByRole("heading", { name: /After Profile/i }),
    ).toBeVisible();
    await expect(page.getByText(/saved after/i)).toBeVisible();

    // The change is persisted, not just kept in the client state
    await page.reload();
    await expect(
      page.getByRole("heading", { name: /After Profile/i }),
    ).toBeVisible({ timeout: 10000 });
  });

  test("shows an error and does not save an empty first name", async ({
    page,
  }) => {
    await page.goto("/profile/edit");
    await expect(page.locator("input[name='firstName']")).toHaveValue(
      "before",
      { timeout: 10000 },
    );

    await page.locator("input[name='firstName']").fill("");
    await page.getByRole("button", { name: "Save", exact: true }).click();

    await expect(
      page.getByText(/First name must be at least 1 characters/i),
    ).toBeVisible({ timeout: 5000 });
    await expect(page).toHaveURL(/\/profile\/edit$/);

    const res = await page.request.get(`${API_URL}/auth/session-user`);
    expect((await res.json()).data.firstName).toBe("before");
  });

  test("cancel goes back without saving", async ({ page }) => {
    await page.goto("/profile");
    await page.getByRole("link", { name: "Edit Profile" }).click();
    await expect(page.locator("input[name='firstName']")).toHaveValue(
      "before",
      { timeout: 10000 },
    );

    await page.locator("input[name='firstName']").fill("Discarded");
    await page.getByRole("button", { name: "Cancel" }).click();

    await expect(page).toHaveURL(/\/profile$/);
    await expect(
      page.getByRole("heading", { name: /Before Profile/i }),
    ).toBeVisible();
  });
});
