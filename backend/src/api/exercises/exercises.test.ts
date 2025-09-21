import request from "supertest";
import { app } from "../../server";
import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { IAuthSignUpDTO } from "../../../../shared/models/auth.model";

describe("Exercises API", () => {
  let authToken: string;
  let testUserId: string;
  const testExercises: IExerciseDTO[] = [];

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
      testExercises.push(exercise);
      expect(exercise).toHaveProperty("id");
      testExercises.push(exercise);

      expect(exercise.name?.toLowerCase()).toBe(
        newExercise.name?.toLowerCase()
      );
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
      expect(res.body.errors.youtubeUrl).toBe("Must be a valid URL");
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
      expect(res.body.errors.type).toMatch(
        "Invalid type type only strength, cardio, flexibility, miscellaneous are allowed"
      );
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
      expect(res.body.errors.type).toBeDefined();
      expect(res.body.errors.type).toMatch(
        "Invalid type type only strength, cardio, flexibility, miscellaneous are allowed"
      );
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
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toMatch("Validation failed");

      expect(res.body.errors).toBeDefined();
      expect(res.body.errors["muscles.0"]).toBeDefined();
      expect(res.body.errors["muscles.1"]).toBeDefined();

      expect(res.body.errors["muscles.0"]).toMatch("Invalid muscles type");
      expect(res.body.errors["muscles.1"]).toMatch("Invalid muscles type");
    });

    it("should reject exercise with missing required equipment", async () => {
      const incompleteExercise = {
        name: "Incomplete Muscles Exercise",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["wall", "BomB"],
        muscles: ["glutes"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(incompleteExercise);

      expect(res.status).toBe(400);

      expect(res.body.message).toBeDefined();
      expect(res.body.message).toMatch("Validation failed");

      expect(res.body.errors).toBeDefined();
      expect(res.body.errors["equipment.0"]).toBeDefined();
      expect(res.body.errors["equipment.1"]).toBeDefined();

      expect(res.body.errors["equipment.0"]).toMatch("Invalid equipment type");
      expect(res.body.errors["equipment.1"]).toMatch("Invalid equipment type");
    });

    it("should reject exercise with missing credentials", async () => {
      const newExercise: IExerciseDTO = {
        name: "Testable Bench Press",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .send(newExercise);

      expect(res.status).toBe(401);
    });

    it("should sanitize HTML tags from exercise name", async () => {
      const exerciseWithHtml: IExerciseDTO = {
        name: "<script>alert('xss')</script>Malicious <b>Bench</b> Press",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exerciseWithHtml);

      expect(res.status).toBe(201);
      const exercise: IExerciseDTO = res.body.data;
      testExercises.push(exercise);

      expect(exercise.name).toBe("malicious bench press");
      expect(exercise.name).not.toMatch(/<[^>]*>/);
    });

    it("should sanitize HTML tags from exercise name", async () => {
      const exerciseWithHtmlNotes: IExerciseDTO = {
        name: '<p>This is a <strong>great</strong> exercise!</p><script>alert("hack")</script>',
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exerciseWithHtmlNotes);

      expect(res.status).toBe(201);
      const exercise: IExerciseDTO = res.body.data;
      testExercises.push(res.body.data);

      expect(exercise.name).toBe("this is a great exercise!");
      expect(exercise.name).not.toMatch(/<[^>]*>/);
    });

    it("should handle multiple whitespace characters in exercise name", async () => {
      const exerciseWithWhitespace: IExerciseDTO = {
        name: "   Spaced    Out     Exercise   ",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exerciseWithWhitespace);

      expect(res.status).toBe(201);
      const exercise: IExerciseDTO = res.body.data;
      testExercises.push(res.body.data);

      // Should trim and collapse whitespace
      expect(exercise.name).toBe("spaced out exercise");
    });

    it("should sanitize dangerous HTML attributes onerror", async () => {
      const exerciseWithDangerousHtml: IExerciseDTO = {
        name: '<img src="x" onerror="alert(1)">Dangerous Exercise',
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exerciseWithDangerousHtml);

      expect(res.status).toBe(201);
      const exercise: IExerciseDTO = res.body.data;
      testExercises.push(res.body.data);

      // Should completely strip dangerous HTML
      expect(exercise.name).toBe("dangerous exercise");

      // Should not contain any HTML tags or attributes
      expect(exercise.name).not.toMatch(/<[^>]*>/);
      expect(exercise.name).not.toContain("onerror");
    });

    it("should sanitize dangerous HTML attributes onclick", async () => {
      const exerciseWithDangerousHtml: IExerciseDTO = {
        name: '<div onclick="steal()">Click me</div> Dangerous Exercise',
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exerciseWithDangerousHtml);

      expect(res.status).toBe(201);
      const exercise: IExerciseDTO = res.body.data;
      testExercises.push(res.body.data);

      // Should completely strip dangerous HTML
      expect(exercise.name).toBe("click me dangerous exercise");

      // Should not contain any HTML tags or attributes
      expect(exercise.name).not.toMatch(/<[^>]*>/);
      expect(exercise.name).not.toContain("onclick");
    });

    it("should handle empty strings after sanitization", async () => {
      const exerciseWithOnlyHtml: IExerciseDTO = {
        name: "<script></script><style></style>",
        youtubeUrl: "https://www.youtube.com/watch?v=test12345",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["chest", "triceps"],
      };

      const res = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exerciseWithOnlyHtml);

      // Should fail validation because name becomes empty after sanitization
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.name).toMatch(
        "Exercise name must be at least 1 characters long"
      );
    });
  });

  describe("GET /api/v1/exercises", () => {
    it("should return all exercises", async () => {
      const res = await request(app)
        .get("/api/v1/exercises")
        .set("Cookie", `token=${authToken}`);
      const exercisesRes = res.body;
      expect(res.status).toBe(200);
      expect(Array.isArray(exercisesRes)).toBe(true);
      expect(exercisesRes).toHaveLength(6);
    });

    it("should filter exercises by name", async () => {
      const res = await request(app)
        .get("/api/v1/exercises?name=Pull-up")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      expect(
        res.body.every((e: IExerciseDTO) => e.name?.includes("pull-up"))
      ).toBe(true);
    });

    it("should filter exercises by muscle", async () => {
      const res = await request(app)
        .get("/api/v1/exercises?muscles=biceps")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      expect(
        res.body.every((e: IExerciseDTO) => e.muscles?.includes("biceps"))
      ).toBe(true);
    });

    it("should support pagination", async () => {
      const res = await request(app)
        .get("/api/v1/exercises?skip=1&take=5")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /api/v1/exercises/:id", () => {
    let exerciseRes: IExerciseDTO;
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
      exerciseRes = res.body.data;

      testExercises.push(exerciseRes);
    });

    it("should get a single exercise by its ID", async () => {
      const res = await request(app)
        .get(`/api/v1/exercises/${exerciseRes.id}`)
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(exerciseRes.id);
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
      const res = await request(app)
        .get("/api/v1/exercises/non-existent-id")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/exercises/edit/:id", () => {
    let exerciseId: string;
    const baseExercise: IExerciseDTO = {
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
        .send(baseExercise);
      exerciseId = res.body.data.id;
    });
    afterEach(async () => {
      if (!exerciseId) return;
      await request(app)
        .delete(`/api/v1/exercises/${exerciseId}`)
        .set("Cookie", `token=${authToken}`);
    });

    it("should update exercise name successfully", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "Updated Exercise Name",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Exercise updated successfully");
      expect(res.body.data.name).toBe("updated exercise name");
      expect(res.body.data.id).toBe(exerciseId);
    });

    it("should update exercise muscles successfully", async () => {
      const updateData: Partial<IExerciseDTO> = {
        muscles: ["hip_flexors", "triceps"],
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.muscles).toEqual(
        expect.arrayContaining(updateData.muscles ?? [])
      );
      expect(res.body.data.name).toBe(baseExercise.name?.toLowerCase());
      expect(res.body.data.type).toBe(baseExercise.type);
    });

    it("should update exercise equipment successfully", async () => {
      const updateData: Partial<IExerciseDTO> = {
        equipment: ["barbell", "adjustable_bench"],
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.equipment).toEqual(
        expect.arrayContaining(updateData.equipment ?? [])
      );
      expect(res.body.data.name).toBe(baseExercise.name?.toLowerCase());
      expect(res.body.data.muscles).toEqual(
        expect.arrayContaining(baseExercise.muscles ?? [])
      );
    });

    it("should update exercise type successfully", async () => {
      const updateData: Partial<IExerciseDTO> = {
        type: "cardio",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.type).toBe("cardio");
      expect(res.body.data.name).toBe(baseExercise.name?.toLowerCase());
      expect(res.body.data.equipment).toEqual(
        expect.arrayContaining(baseExercise.equipment ?? [])
      );
    });

    it("should update exercise YouTube URL successfully", async () => {
      const updateData: Partial<IExerciseDTO> = {
        youtubeUrl: "https://www.youtube.com/watch?v=newvideo123",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.youtubeUrl).toBe(updateData.youtubeUrl);
      expect(res.body.data.name).toBe(baseExercise.name?.toLowerCase());
      expect(res.body.data.type).toBe(baseExercise.type);
    });

    it("should update multiple fields at once", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "Completely Updated Exercise",
        type: "flexibility",
        muscles: ["hamstrings", "calves"],
        equipment: ["yoga_mat"],
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("completely updated exercise");
      expect(res.body.data.type).toBe("flexibility");
      expect(res.body.data.muscles).toEqual(
        expect.arrayContaining(updateData.muscles ?? [])
      );
      expect(res.body.data.equipment).toEqual(
        expect.arrayContaining(updateData.equipment ?? [])
      );
    });

    it("should sanitize HTML in updated exercise name", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "<script>alert('hack')</script>Updated <b>Exercise</b>",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated exercise");
      expect(res.body.data.name).not.toMatch(/<[^>]*>/);
    });

    it("should reject update with invalid YouTube URL", async () => {
      const updateData: Partial<IExerciseDTO> = {
        youtubeUrl: "not-a-valid-url",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.youtubeUrl).toBe("Must be a valid URL");
    });

    it("should reject update with invalid exercise type", async () => {
      const updateData = {
        type: "invalid-type",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.errors.type).toMatch(
        "Invalid type type only strength, cardio, flexibility, miscellaneous are allowed"
      );
    });

    it("should reject update with invalid muscles", async () => {
      const updateData = {
        muscles: ["invalid-muscle", "another-invalid"],
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.errors["muscles.0"]).toMatch("Invalid muscles type");
      expect(res.body.errors["muscles.1"]).toMatch("Invalid muscles type");
    });

    it("should reject update with invalid equipment", async () => {
      const updateData = {
        equipment: ["invalid-equipment", "another-invalid"],
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.errors["equipment.0"]).toMatch("Invalid equipment type");
      expect(res.body.errors["equipment.1"]).toMatch("Invalid equipment type");
    });

    it("should normalize YouTube URLs on update", async () => {
      const updateData: Partial<IExerciseDTO> = {
        youtubeUrl: "https://youtu.be/newvideo456",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.youtubeUrl).toBe(
        "https://www.youtube.com/watch?v=newvideo456"
      );
    });

    it("should handle whitespace normalization on update", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "   Updated    Exercise   Name   ",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated exercise name");
    });

    it("should return 400 for updating a non-existent exercise", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "This will fail",
      };

      const res = await request(app)
        .put("/api/v1/exercises/edit/non-existent-id")
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(
        "Exercise - No record was found for an update"
      );
    });

    it("should reject update with missing credentials", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "This will fail without auth",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .send(updateData);

      expect(res.status).toBe(401);
    });

    it("should reject update with empty name after sanitization", async () => {
      const updateData: Partial<IExerciseDTO> = {
        name: "<script></script><style></style>",
      };

      const res = await request(app)
        .put(`/api/v1/exercises/edit/${exerciseId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.errors.name).toMatch(
        "Exercise name must be at least 1 characters long"
      );
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

      const getRes = await request(app)
        .get(`/api/v1/exercises/${exerciseId}`)
        .set("Cookie", `token=${authToken}`);
      expect(getRes.status).toBe(404);
    });

    it("should return 400 for deleting a non-existent exercise", async () => {
      const res = await request(app)
        .delete("/api/v1/exercises/non-existent-id")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
    for (const { id } of testExercises) {
      if (!id) continue;
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
