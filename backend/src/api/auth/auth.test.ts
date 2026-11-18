import request from "supertest";
import { app } from "../../server";
import type { IUserDTO } from "../../../../shared/models/user.model";
import type {
  IAuthSignUpDTO,
  IAuthSignInDTO,
} from "../../../../shared/models/auth.model";

describe("Auth API", () => {
  const testUsers: { user: IUserDTO; token: string }[] = [];
  let mainAuthToken: string;
  const mainUserCredentials: IAuthSignUpDTO = {
    email: `main-test-user@test.com`,
    password: "Aa123456",
    confirmPassword: "Aa123456",
    firstName: "Main",
    lastName: "User",
  };
  let mainUser: IUserDTO;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(mainUserCredentials);
    mainUser = res.body.data;
    mainAuthToken = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
  });

  describe("POST /api/v1/auth/sign-up", () => {
    it("should create a new user successfully", async () => {
      const userCredentials: IAuthSignUpDTO = {
        email: `test-user-${Date.now()}@example.com`,
        password: "Password123!",
        confirmPassword: "Password123!",
        firstName: "Test",
        lastName: "User",
      };

      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(userCredentials);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User created successfully");
      const user: IUserDTO = res.body.data;
      testUsers.push({
        user,
        token: res.headers["set-cookie"][0].split(";")[0].split("=")[1],
      });

      expect(user).toHaveProperty("id");
      expect(user.email).toBe(userCredentials.email.toLowerCase());
      expect(user.firstName).toBe(userCredentials.firstName.toLowerCase());
      expect(user.lastName).toBe(userCredentials.lastName.toLowerCase());
      expect(user).not.toHaveProperty("passwordHash");
      expect(res.headers["set-cookie"]).toBeDefined();
    });

    it("should reject sign-up with an existing email", async () => {
      const existingUser = testUsers[0];
      const res = await request(app).post("/api/v1/auth/sign-up").send({
        email: mainUser.email,
        password: "Password123!",
        confirmPassword: "Password123!",
        firstName: "Another",
        lastName: "User",
      });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Bad Request");
    });

    it("should reject sign-up with mismatched passwords", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send({
          email: `mismatch-${Date.now()}@example.com`,
          password: "Password123!",
          confirmPassword: "Password321@",
          firstName: "Mismatch",
          lastName: "Pass",
        });

      expect(res.status).toBe(400);
      expect(res.body.errors.confirmPassword).toBe("Passwords do not match");
    });

    it("should reject sign-up with an invalid email", async () => {
      const res = await request(app).post("/api/v1/auth/sign-up").send({
        email: "not-an-email",
        password: "Password123!",
        confirmPassword: "Password123!",
        firstName: "Invalid",
        lastName: "Email",
      });

      expect(res.status).toBe(400);
      expect(res.body.errors.email).toBe("Must be a valid email address");
    });

    it("should reject sign-up with a weak password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send({
          email: `weakpass-${Date.now()}@example.com`,
          password: "weak",
          confirmPassword: "weak",
          firstName: "Weak",
          lastName: "Pass",
        });

      expect(res.status).toBe(400);
      expect(res.body.errors.password).toBeDefined();
    });

    it("should sanitize HTML from name fields", async () => {
      const userCredentials = {
        email: `sanitize-${Date.now()}@example.com`,
        password: "Password123!",
        confirmPassword: "Password123!",
        firstName: "<h1>Sanitized</h1>",
        lastName: "<script>alert('xss')</script>User",
      };
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(userCredentials);

      expect(res.status).toBe(201);
      const user: IUserDTO = res.body.data;
      testUsers.push({
        user,
        token: res.headers["set-cookie"][0].split(";")[0].split("=")[1],
      });
      expect(user.firstName).toBe("sanitized");
      expect(user.lastName).toBe("user");
    });
  });

  describe("POST /api/v1/auth/sign-in", () => {
    const userCredentials: IAuthSignUpDTO = {
      email: `signin-user-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "SignIn",
      lastName: "Test",
    };

    beforeAll(async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-up")
        .send({
          ...userCredentials,
          confirmPassword: userCredentials.password,
        });
      testUsers.push({
        user: res.body.data,
        token: res.headers["set-cookie"][0].split(";")[0].split("=")[1],
      });
    });

    it("should sign in a user successfully", async () => {
      const res = await request(app).post("/api/v1/auth/sign-in").send({
        email: userCredentials.email,
        password: userCredentials.password,
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User signed in successfully");
      expect(res.body.data).toHaveProperty("id");
      expect(res.headers["set-cookie"]).toBeDefined();

      expect(res.body.data.email).toBe(userCredentials.email.toLowerCase());
      expect(res.body.data.firstName).toBe(
        userCredentials.firstName.toLowerCase()
      );
      expect(res.body.data.lastName).toBe(
        userCredentials.lastName.toLowerCase()
      );
    });

    it("should reject sign-in with incorrect password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-in")
        .send({ email: userCredentials.email, password: "WrongPassword!" });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Wrong credentials");
    });

    it("should reject sign-in with a non-existent email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/sign-in")
        .send({ email: "nosuchuser@example.com", password: "Password123!" });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe("Wrong credentials");
    });
  });

  describe("POST /api/v1/auth/sign-out", () => {
    it("should sign out a user successfully", async () => {
      let authToken;
      const userCredentials: IAuthSignUpDTO = {
        email: `test-auth-user-${Date.now()}@example.com`,
        password: "Password123!",
        confirmPassword: "Password123!",
        firstName: "Auth",
        lastName: "Tester",
      };
      const userRes = await request(app)
        .post("/api/v1/auth/sign-up")
        .send(userCredentials);

      if (userRes.status === 201) {
        authToken = userRes.headers["set-cookie"][0]
          .split(";")[0]
          .split("=")[1];
        testUsers.push({ user: userRes.body.data, token: authToken });
      }
      const res = await request(app)
        .post("/api/v1/auth/sign-out")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User signed out successfully");
      const cookieHeader = res.headers["set-cookie"][0];
      expect(cookieHeader).toContain("token=;");
      expect(cookieHeader).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
    });
    it("should fail sign out a user ", async () => {
      const res = await request(app).post("/api/v1/auth/sign-out");

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Not Authenticated");

      expect(res.headers["set-cookie"]).toBeUndefined();
    });
  });

  describe("GET /api/v1/auth/session-user", () => {
    it("should return the current user if authenticated", async () => {
      const res = await request(app)
        .get("/api/v1/auth/session-user")
        .set("Cookie", `token=${mainAuthToken}`);

      expect(res.status).toBe(200);
      const user: IUserDTO = res.body.data;
      expect(user.id).toBe(mainUser.id);
      expect(user.email).toBe(mainUser.email);
    });

    it("should return 401 if not authenticated", async () => {
      const res = await request(app).get("/api/v1/auth/session-user");
      expect(res.status).toBe(401);
    });
  });

  describe("PUT /api/v1/auth/update-user", () => {
    it("should update the session user's name", async () => {
      const { user, token } = testUsers[0];

      const res = await request(app)
        .put("/api/v1/auth/update-user")
        .set("Cookie", `token=${token}`)
        .send({ firstName: "Updated", lastName: "Name" });

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(user.id);
      expect(res.body.data.firstName).toBe("updated");
      expect(res.body.data.lastName).toBe("name");

      const sessionRes = await request(app)
        .get("/api/v1/auth/session-user")
        .set("Cookie", `token=${token}`);
      expect(sessionRes.body.data.firstName).toBe("updated");
    });

    it("should reject an empty name", async () => {
      const res = await request(app)
        .put("/api/v1/auth/update-user")
        .set("Cookie", `token=${testUsers[0].token}`)
        .send({ firstName: "", lastName: "Name" });

      expect(res.status).toBe(400);
      expect(res.body.errors.firstName).toBeDefined();
    });

    it("should return 401 if not authenticated", async () => {
      const res = await request(app)
        .put("/api/v1/auth/update-user")
        .send({ firstName: "No", lastName: "Session" });

      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /api/v1/auth/delete-user/:id", () => {
    it("should return 403 when deleting another user", async () => {
      const otherUser = testUsers[0].user;

      const res = await request(app)
        .delete(`/api/v1/auth/delete-user/${otherUser.id}`)
        .set("Cookie", `token=${mainAuthToken}`);

      expect(res.status).toBe(403);

      const sessionRes = await request(app)
        .get("/api/v1/auth/session-user")
        .set("Cookie", `token=${testUsers[0].token}`);

      expect(sessionRes.status).toBe(200);
      expect(sessionRes.body.data.id).toBe(otherUser.id);
    });
  });

  afterAll(async () => {
 
    for (const { user, token } of testUsers) {
      if (user.id) {
        await request(app)
          .delete(`/api/v1/auth/delete-user/${user.id}`)
          .set("Cookie", `token=${token}`)
          .catch((err) => {
            console.error(`Failed to delete user ${user.id}:`, err.message);
          });
      }
    }
    await request(app)
      .delete(`/api/v1/auth/delete-user/${mainUser?.id}`)
      .set("Cookie", `token=${mainAuthToken}`)
      .catch((err) => {
        console.error(`Failed to delete user ${mainUser.id}:`, err.message);
      });
  });
});
