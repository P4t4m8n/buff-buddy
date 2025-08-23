import request from "supertest";
import { app } from "../../server";
import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { IAuthSignUpDTO } from "../../../../shared/models/auth.model";

describe("Exercises API", () => {
  let authToken: string;
  let testUserId: string;
  const createdExerciseIds: string[] = [];

  beforeAll(async () => {
    const userCredentials: IAuthSignUpDTO = {
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
      const newExercise: IExerciseDTO = {
        name: "Testable Bench Press",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newExercise);

      expect(res.status).toBe(201);
      const exercise: IExerciseDTO = res.body.data;
      expect(res.body.message).toBe("Exercise created successfully");
      expect(exercise).toHaveProperty("id");
      createdExerciseIds.push(res.body.data.id);

      expect(exercise.name).toBe(newExercise.name?.toLowerCase());
      expect(exercise.youtubeUrl).toBe(newExercise.youtubeUrl);
      expect(exercise.type).toBe(newExercise.type);
      expect(exercise.equipment).toEqual(
        expect.arrayContaining(newExercise?.equipment ?? [])
      );
      expect(exercise.muscles).toEqual(
        expect.arrayContaining(newExercise?.muscles ?? [])
      );
    });
    it("should reject exercise with invalid youtubeUrl ", async () => {
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
      expect(res.body.errors.youtubeUrl).toBeDefined();
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
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.youtubeUrl).toMatch("Youtube url is required.");
      expect(res.body.errors.type).toMatch("Type is required.");
      expect(res.body.errors.equipment).toMatch("Equipment is required.");
      expect(res.body.errors.muscles).toMatch("Muscles are required.");
    });
    it("should reject exercise with missing required type", async () => {
      const incompleteExercise = {
        name: "Incomplete Type Exercise",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "fun",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteExercise);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.type).toBeDefined();
    });
    it("should reject exercise with missing required muscles", async () => {
      const incompleteExercise = {
        name: "Incomplete Muscles Exercise",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["head", "lag"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteExercise);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
    it("should reject exercise with missing required equipment", async () => {
      const incompleteExercise = {
        name: "Incomplete Muscles Exercise",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["wall"],
        muscles: ["glutes"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteExercise);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("GET /api/v1/exercises", () => {
    beforeAll(async () => {
      const exercise: IExerciseDTO = {
        name: "Filter Test Pull-up",
        youtubeUrl: "https://www.youtube.com/watch?v=filtertest",
        type: "strength",
        equipment: ["adjustable_bench"],
        muscles: ["adductors", "biceps"],
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
        res.body.every((e: IExerciseDTO) => e.name?.includes("pull-up"))
      ).toBe(true);
    });

    it("should filter exercises by muscle", async () => {
      const res = await request(app).get("/api/v1/exercises?muscles=biceps");
      expect(res.status).toBe(200);
      expect(
        res.body.every((e: IExerciseDTO) => e.muscles?.includes("biceps"))
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
    const exercise: IExerciseDTO = {
      name: "Get By ID Test",
      youtubeUrl: "https://www.youtube.com/watch?v=getbyidtest",
      type: "cardio",
      equipment: ["air_bike"],
      muscles: ["chest"],
    };
    beforeAll(async () => {
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      exerciseId = res.body.data.id;

      createdExerciseIds.push(exerciseId);
    });

    it("should get a single exercise by its ID", async () => {
      const res = await request(app).get(`/api/v1/exercises/${exerciseId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(exerciseId);
      expect(res.body.data.name).toBe("get by id test");
      expect(res.body.data.youtubeUrl).toBe(exercise.youtubeUrl);
      expect(res.body.data.type).toBe("cardio");
      expect(res.body.data.equipment).toEqual(
        expect.arrayContaining(exercise.equipment ?? [])
      );
      expect(res.body.data.muscles).toEqual(
        expect.arrayContaining(exercise.muscles ?? [])
      );
    });

    it("should return 404 for a non-existent exercise ID", async () => {
      const res = await request(app).get("/api/v1/exercises/non-existent-id");
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/exercises/edit/:id", () => {
    let exerciseId: string;
    const exercise: IExerciseDTO = {
      name: "Exercise To Update",
      youtubeUrl: "https://www.youtube.com/watch?v=tobeupdatedTest",
      type: "strength",
      equipment: ["dumbbell"],
      muscles: ["adductors"],
    };
    beforeEach(async () => {
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      exerciseId = res.body.data.id;
      createdExerciseIds.push(exerciseId);
    });

    it("should update an existing exercise", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "Updated Exercise Name",
        muscles: ["hip_flexors", "triceps"],
      };
      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.body.data.name).toBe(updateData.name?.toLowerCase());
      expect(res.body.data.muscles).toEqual(
        expect.arrayContaining(updateData?.muscles ?? [])
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
      const exercise: IExerciseDTO = {
        name: "Exercise To Be Deleted",
        youtubeUrl: "https://www.youtube.com/watch?v=tobedeleted",
        type: "flexibility",
        equipment: ["cable_crossover"],
        muscles: ["hamstrings"],
      };
      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
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
