import request from "supertest";
import { app } from "../../server";
import { IExerciseDTO } from "../../../../shared/models/exercise.model";

describe("Exercises API", () => {
  let authToken: string;
  let testUserId: string;
  const createdExerciseIds: string[] = [];

  beforeAll(async () => {
    const userCredentials = {
      email: `test-exercise-user-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Exercise",
      lastName: "Tester",
    };
    const userRes = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(userCredentials);
    testUserId = userRes.body.data.id;
    authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];
  });

  describe("POST /api/v1/exercises/edit", () => {
    it("should create a new exercise successfully", async () => {
      const newExercise = {
        name: "Testable Bench Press",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        types: ["strength"],
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newExercise);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Exercise created successfully");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.name).toBe(newExercise.name);
      createdExerciseIds.push(res.body.data.id);
    });

    it("should reject exercise with invalid data (e.g., bad URL)", async () => {
      const invalidExercise = {
        name: "Invalid Data Exercise",
        youtubeUrl: "not-a-valid-url",
        types: ["strength"],
        equipment: ["barbell"],
        muscles: ["chest"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidExercise);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should reject exercise with missing required fields", async () => {
      const incompleteExercise = {
        name: "Incomplete Exercise",
        // Missing youtubeUrl, types, equipment, muscles
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteExercise);

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/exercises", () => {
    beforeAll(async () => {
      const exercise = {
        name: "Filter Test Pull-up",
        youtubeUrl: "https://www.youtube.com/watch?v=filtertest",
        types: ["strength"],
        equipment: ["body_weight"],
        muscles: ["back", "biceps"],
      };
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      createdExerciseIds.push(res.body.data.id);
    });

    it("should return all exercises", async () => {
      const res = await request(app).get("/api/v1/exercises");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should filter exercises by name", async () => {
      const res = await request(app).get("/api/v1/exercises?name=Pull-up");
      expect(res.status).toBe(200);
      expect(
        res.body.every((e: IExerciseDTO) => e.name?.includes("Pull-up"))
      ).toBe(true);
    });

    it("should filter exercises by muscle", async () => {
      const res = await request(app).get("/api/v1/exercises?muscles=back");
      expect(res.status).toBe(200);
      expect(
        res.body.every((e: IExerciseDTO) => e.muscles?.includes("back"))
      ).toBe(true);
    });

    it("should support pagination", async () => {
      const res = await request(app).get("/api/v1/exercises?skip=1&take=5");
      expect(res.status).toBe(200);
      expect(res.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /api/v1/exercises/:id", () => {
    let exerciseId: string;
    beforeAll(async () => {
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send({
          name: "Get By ID Test",
          youtubeUrl: "https://www.youtube.com/watch?v=getbyid",
          types: ["cardio"],
          equipment: ["none"],
          muscles: ["core"],
        });
      exerciseId = res.body.data.id;
      createdExerciseIds.push(exerciseId);
    });

    it("should get a single exercise by its ID", async () => {
      const res = await request(app).get(`/api/v1/exercises/${exerciseId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(exerciseId);
      expect(res.body.data.name).toBe("Get By ID Test");
    });

    it("should return 404 for a non-existent exercise ID", async () => {
      const res = await request(app).get("/api/v1/exercises/non-existent-id");
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/exercises/edit/:id", () => {
    let exerciseId: string;
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send({
          name: "Exercise To Update",
          youtubeUrl: "https://www.youtube.com/watch?v=tobeupdated",
          types: ["strength"],
          equipment: ["dumbbell"],
          muscles: ["shoulders"],
        });
      exerciseId = res.body.data.id;
      createdExerciseIds.push(exerciseId);
    });

    it("should update an existing exercise", async () => {
      const updateData = {
        name: "Updated Exercise Name",
        muscles: ["shoulders", "triceps"],
      };
      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(updateData.name);
      expect(res.body.data.muscles).toEqual(
        expect.arrayContaining(updateData.muscles)
      );
    });

    it("should return 400 for updating a non-existent exercise", async () => {
      const res = await request(app)
        .put("/api/v1/exercises/edit/non-existent-id")
        .set("Cookie", `token=${authToken}`)
        .send({ name: "This will fail" });
      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /api/v1/exercises/:id", () => {
    it("should delete an existing exercise", async () => {
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send({
          name: "Exercise To Be Deleted",
          youtubeUrl: "https://www.youtube.com/watch?v=tobedeleted",
          types: ["flexibility"],
          equipment: ["none"],
          muscles: ["hamstrings"],
        });
      const exerciseId = res.body.data.id;

      const deleteRes = await request(app)
        .delete(`/api/v1/exercises/${exerciseId}`)
        .set("Cookie", `token=${authToken}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe("Exercise deleted successfully");

      const getRes = await request(app).get(`/api/v1/exercises/${exerciseId}`);
      expect(getRes.status).toBe(404);
    });

    it("should return 400 for deleting a non-existent exercise", async () => {
      const res = await request(app)
        .delete("/api/v1/exercises/non-existent-id")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(400);
    });
  });

  afterAll(async () => {
    for (const id of createdExerciseIds) {
      await request(app)
        .delete(`/api/v1/exercises/${id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }
    if (testUserId) {
      await request(app)
        .delete(`/api/v1/auth/delete-user/${testUserId}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }
  });
});
