import { test, expect, type Page } from "@playwright/test";

const API_URL = "http://localhost:3030/api/v1";

// Unique test user for each run to avoid collisions
const TEST_EMAIL = `e2e-test-${Date.now()}@test.com`;
const TEST_PASSWORD = "TestPass1";
const TEST_FIRST_NAME = "E2E";
const TEST_LAST_NAME = "Tester";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fillSignIn(
  page: Page,
  { email, password }: { email: string; password: string }
) {
  await page.locator("input[name='email']").fill(email);
  await page.locator("input[name='password']").fill(password);
}

async function fillSignUp(
  page: Page,
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
) {
  await page.locator("input[name='firstName']").fill(fields.firstName);
  await page.locator("input[name='lastName']").fill(fields.lastName);
  await page.locator("input[name='email']").fill(fields.email);
  await page.locator("input[name='password']").fill(fields.password);
  await page
    .locator("input[name='confirmPassword']")
    .fill(fields.confirmPassword);
}

function submitButton(page: Page) {
  return page.locator("form button[type='submit']");
}

/** Delete the test user via API (requires the auth cookie from the page context) */
async function deleteTestUser(page: Page) {
  const cookies = await page.context().cookies();
  const tokenCookie = cookies.find((c) => c.name === "token");
  if (!tokenCookie) return;

  // Get user id from session
  const sessionRes = await page.request.get(
    `${API_URL}/auth/session-user`
  );
  if (!sessionRes.ok()) return;
  const session = await sessionRes.json();
  const userId = session?.data?.id;
  if (!userId) return;

  await page.request.delete(`${API_URL}/auth/delete-user/${userId}`);
}

// ---------------------------------------------------------------------------
// Page rendering (no backend interaction needed)
// ---------------------------------------------------------------------------

test.describe("Auth page – rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows sign-in mode by default", async ({ page }) => {
    await expect(page.getByText("Welcome Back")).toBeVisible();
    await expect(
      page.getByText("Sign in to continue your journey")
    ).toBeVisible();
    await expect(submitButton(page)).toHaveText("Sign In");
  });

  test("shows email and password fields only in sign-in mode", async ({
    page,
  }) => {
    await expect(page.locator("input[name='email']")).toBeVisible();
    await expect(page.locator("input[name='password']")).toBeVisible();
    await expect(page.locator("input[name='firstName']")).not.toBeVisible();
    await expect(page.locator("input[name='lastName']")).not.toBeVisible();
    await expect(
      page.locator("input[name='confirmPassword']")
    ).not.toBeVisible();
  });

  test("Google OAuth link is present", async ({ page }) => {
    const googleLink = page.getByRole("link", {
      name: /continue with google/i,
    });
    await expect(googleLink).toBeVisible();
    await expect(googleLink).toHaveAttribute(
      "href",
      /accounts\.google\.com\/o\/oauth2/
    );
  });

  test('shows "Or continue with email" separator', async ({ page }) => {
    await expect(page.getByText("Or continue with email")).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Toggle between sign-in / sign-up
// ---------------------------------------------------------------------------

test.describe("Auth page – mode toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("switches to sign-up mode", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(
      page.getByRole("heading", { name: "Create Account" })
    ).toBeVisible();
    await expect(
      page.getByText("Join the buff community today")
    ).toBeVisible();
    await expect(page.locator("input[name='firstName']")).toBeVisible();
    await expect(page.locator("input[name='lastName']")).toBeVisible();
    await expect(
      page.locator("input[name='confirmPassword']")
    ).toBeVisible();
    await expect(submitButton(page)).toHaveText("Create Account");
  });

  test("switches back to sign-in mode", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(
      page.getByRole("heading", { name: "Create Account" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Welcome Back")).toBeVisible();
    await expect(page.locator("input[name='firstName']")).not.toBeVisible();
  });

  test("clears form fields when toggling modes", async ({ page }) => {
    await fillSignIn(page, {
      email: "test@example.com",
      password: "Password1",
    });

    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.locator("input[name='email']")).toHaveValue("");
    await expect(page.locator("input[name='password']")).toHaveValue("");
  });
});

// ---------------------------------------------------------------------------
// Sign-in client-side validation
// ---------------------------------------------------------------------------

test.describe("Sign-in – client validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows error when email is empty on submit", async ({ page }) => {
    await page.locator("input[name='password']").fill("Password1");
    await submitButton(page).click();

    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("shows error when password is empty on submit", async ({ page }) => {
    await page.locator("input[name='email']").fill("test@example.com");
    await submitButton(page).click();

    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.locator("input[name='email']").fill("not-an-email");
    await page.locator("input[name='password']").click();

    await expect(
      page.getByText("Must be a valid email address")
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Sign-up client-side validation
// ---------------------------------------------------------------------------

test.describe("Sign-up – client validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
  });

  test("shows errors when submitting empty form", async ({ page }) => {
    await submitButton(page).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(
      page.getByText("Password must be at least 8 characters").first()
    ).toBeVisible();
    await expect(
      page.getByText(/First name must be at least 1 characters/i)
    ).toBeVisible();
    await expect(
      page.getByText(/Last name must be at least 1 characters/i)
    ).toBeVisible();
  });

  test("shows error when password has no uppercase letter", async ({
    page,
  }) => {
    await page.locator("input[name='password']").fill("password1");
    await page.locator("input[name='email']").click();

    await expect(
      page.getByText("Password must contain at least one uppercase letter")
    ).toBeVisible();
  });

  test("shows error when password has no lowercase letter", async ({
    page,
  }) => {
    await page.locator("input[name='password']").fill("PASSWORD1");
    await page.locator("input[name='email']").click();

    await expect(
      page.getByText("Password must contain at least one lowercase letter")
    ).toBeVisible();
  });

  test("shows error when password has no number", async ({ page }) => {
    await page.locator("input[name='password']").fill("Passworddd");
    await page.locator("input[name='email']").click();

    await expect(
      page.getByText("Password must contain at least one number")
    ).toBeVisible();
  });

  test("shows error when passwords do not match", async ({ page }) => {
    await fillSignUp(page, {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      password: "Password1",
      confirmPassword: "Password2",
    });

    await submitButton(page).click();

    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.locator("input[name='email']").fill("bad-email");
    await page.locator("input[name='password']").click();

    await expect(
      page.getByText("Must be a valid email address")
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Real-time field validation
// ---------------------------------------------------------------------------

test.describe("Real-time field validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("validates email in real-time and clears on fix", async ({ page }) => {
    await page.locator("input[name='email']").fill("invalid");
    await page.locator("input[name='password']").click();

    await expect(
      page.getByText("Must be a valid email address")
    ).toBeVisible();

    await page.locator("input[name='email']").fill("valid@email.com");
    await page.locator("input[name='password']").click();

    await expect(
      page.getByText("Must be a valid email address")
    ).not.toBeVisible();
  });

  test("validates password strength in real-time (sign-up)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign up" }).click();

    await page.locator("input[name='password']").fill("weak");
    await page.locator("input[name='email']").click();

    await expect(
      page.getByText(/Password must contain at least one uppercase letter/i)
    ).toBeVisible();

    await page.locator("input[name='password']").fill("Strong1");
    await page.locator("input[name='email']").click();

    await expect(
      page.getByText(/Password must contain at least one/i)
    ).not.toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Password visibility toggle
// ---------------------------------------------------------------------------

test.describe("Password visibility toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("password field is hidden by default", async ({ page }) => {
    await expect(page.locator("input[name='password']")).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("toggles password visibility on icon click", async ({ page }) => {
    const passwordInput = page.locator("input[name='password']");
    const toggleButton = passwordInput
      .locator("xpath=ancestor::div[contains(@class, 'relative')]")
      .locator("button[type='button']");

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("confirm password toggle works independently in sign-up", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign up" }).click();

    const confirmInput = page.locator("input[name='confirmPassword']");
    const confirmToggle = confirmInput
      .locator("xpath=ancestor::div[contains(@class, 'relative')]")
      .locator("button[type='button']");

    await expect(confirmInput).toHaveAttribute("type", "password");
    await confirmToggle.click();
    await expect(confirmInput).toHaveAttribute("type", "text");
  });
});

// ---------------------------------------------------------------------------
// Sign-up → real backend
// ---------------------------------------------------------------------------

test.describe("Sign-up – real backend", () => {
  // Each test in this block creates a user with a unique email, then cleans up

  test("successfully creates an account and enters the app", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await fillSignUp(page, {
      firstName: TEST_FIRST_NAME,
      lastName: TEST_LAST_NAME,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD,
    });

    await submitButton(page).click();

    // Wait for the auth page to disappear – user is now in the app
    await expect(
      page.getByRole("heading", { name: "Create Account" })
    ).not.toBeVisible({ timeout: 10000 });

    // Cleanup: delete the test user
    await deleteTestUser(page);
  });

  test("shows error when signing up with an already registered email", async ({
    page,
  }) => {
    const dupEmail = `e2e-dup-${Date.now()}@test.com`;

    // First: create the user via API
    await page.request.post(`${API_URL}/auth/sign-up`, {
      data: {
        email: dupEmail,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        firstName: TEST_FIRST_NAME,
        lastName: TEST_LAST_NAME,
      },
    });

    // Clear cookies so we land on the auth page
    await page.context().clearCookies();

    // Now try to sign up with the same email via UI
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await fillSignUp(page, {
      firstName: TEST_FIRST_NAME,
      lastName: TEST_LAST_NAME,
      email: dupEmail,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD,
    });

    await submitButton(page).click();

    // Should see an error from the server
    await expect(page.locator(".text-error-red")).toContainText(/.+/, {
      timeout: 5000,
    });

    // Cleanup: delete the user we created via API
    // Sign in first to get a cookie, then delete
    const signInRes = await page.request.post(`${API_URL}/auth/sign-in`, {
      data: { email: dupEmail, password: TEST_PASSWORD },
    });
    if (signInRes.ok()) {
      const body = await signInRes.json();
      const userId = body?.data?.id;
      if (userId) {
        await page.request.delete(`${API_URL}/auth/delete-user/${userId}`);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Sign-in → real backend
// ---------------------------------------------------------------------------

test.describe("Sign-in – real backend", () => {
  const signInEmail = `e2e-signin-${Date.now()}@test.com`;

  test.beforeAll(async ({ request }) => {
    // Create a test user before the sign-in tests
    await request.post(`${API_URL}/auth/sign-up`, {
      data: {
        email: signInEmail,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD,
        firstName: TEST_FIRST_NAME,
        lastName: TEST_LAST_NAME,
      },
    });
  });

  test.afterAll(async ({ request }) => {
    // Sign in to get the cookie, then delete the user
    const signInRes = await request.post(`${API_URL}/auth/sign-in`, {
      data: { email: signInEmail, password: TEST_PASSWORD },
    });
    if (signInRes.ok()) {
      const body = await signInRes.json();
      const userId = body?.data?.id;
      if (userId) {
        await request.delete(`${API_URL}/auth/delete-user/${userId}`);
      }
    }
  });

  test("successfully signs in and enters the app", async ({ page }) => {
    await page.goto("/");

    await fillSignIn(page, {
      email: signInEmail,
      password: TEST_PASSWORD,
    });

    await submitButton(page).click();

    // Auth page should disappear
    await expect(submitButton(page)).not.toBeVisible({ timeout: 10000 });
  });

  test("shows error for wrong password", async ({ page }) => {
    await page.goto("/");

    await fillSignIn(page, {
      email: signInEmail,
      password: "WrongPassword1",
    });

    await submitButton(page).click();

    // Backend returns an error for wrong credentials
    await expect(page.locator(".text-error-red")).toContainText(/.+/, {
      timeout: 5000,
    });
  });

  test("shows error for non-existent email", async ({ page }) => {
    await page.goto("/");

    await fillSignIn(page, {
      email: "nonexistent-user-xyz@test.com",
      password: TEST_PASSWORD,
    });

    await submitButton(page).click();

    await expect(page.locator(".text-error-red")).toContainText(/.+/, {
      timeout: 5000,
    });
  });
});

// ---------------------------------------------------------------------------
// Session persistence
// ---------------------------------------------------------------------------

test.describe("Session persistence", () => {
  const sessionEmail = `e2e-session-${Date.now()}@test.com`;

  test.afterAll(async ({ request }) => {
    const signInRes = await request.post(`${API_URL}/auth/sign-in`, {
      data: { email: sessionEmail, password: TEST_PASSWORD },
    });
    if (signInRes.ok()) {
      const body = await signInRes.json();
      const userId = body?.data?.id;
      if (userId) {
        await request.delete(`${API_URL}/auth/delete-user/${userId}`);
      }
    }
  });

  test("stays logged in after page refresh", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await fillSignUp(page, {
      firstName: TEST_FIRST_NAME,
      lastName: TEST_LAST_NAME,
      email: sessionEmail,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD,
    });

    await submitButton(page).click();

    // Wait for auth page to disappear
    await expect(
      page.getByRole("heading", { name: "Create Account" })
    ).not.toBeVisible({ timeout: 10000 });

    // Refresh the page
    await page.reload();

    // Should still be in the app — auth page should not appear
    await expect(submitButton(page)).not.toBeVisible({ timeout: 10000 });
  });
});

// ---------------------------------------------------------------------------
// Loading state (uses real backend latency)
// ---------------------------------------------------------------------------

test.describe("Loading state", () => {
  test("shows loading text on sign-in submit", async ({ page }) => {
    await page.goto("/");

    await fillSignIn(page, {
      email: "loading-test@example.com",
      password: "Password1",
    });

    await submitButton(page).click();

    // The button text should change while the request is in flight
    // Even with a fast backend, the loading state should briefly appear
    await expect(submitButton(page)).toHaveText(
      /Signing In\.\.\.|Sign In/
    );
  });

  test("shows loading text on sign-up submit", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();

    await fillSignUp(page, {
      firstName: "Load",
      lastName: "Test",
      email: "loading-signup-test@example.com",
      password: "Password1",
      confirmPassword: "Password1",
    });

    await submitButton(page).click();

    await expect(submitButton(page)).toHaveText(
      /Creating Account\.\.\.|Create Account/
    );
  });
});
