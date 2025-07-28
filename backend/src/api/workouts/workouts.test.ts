import request from "supertest";
import { app } from "../../server";
import {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";

describe("Workouts API", () => {
  let testExerciseId: string;
  let authToken: string;
  let testUserId: string;
  const createdWorkoutIds: string[] = [];

  beforeAll(async () => {
    const userCredentials = {
      email: `testuser-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Test User",
      lastName: "API",
    };
    const userRes = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(userCredentials);
    testUserId = userRes.body.data.id;

    authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];
    const exerciseRes = await request(app)
      .post("/api/v1/exercises/edit")
      .set("Cookie", `token=${authToken}`)
      .send({
        name: "Test Workout Exercise",
        youtubeUrl: "https://www.youtube.com/watch?v=testworkout",
        types: ["cardio"],
        equipment: ["body_weight"],
        muscles: ["biceps"],
      });
    testExerciseId = exerciseRes.body.data.id;
  });

  describe("POST /api/v1/workouts/edit", () => {
    it("should create a new workout successfully", async () => {
      const newWorkout: IWorkoutEditDTO = {
        name: "Full Body Test Workout",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise",
            exerciseId: testExerciseId,
            crudOperation: "create",
            coreSet: {
              reps: 12,
              weight: 50,
              restTime: 60,
              numberOfSets: 3,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newWorkout);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Workout created successfully");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data.name).toBe(newWorkout.name);
      createdWorkoutIds.push(res.body.data.id);
    });

    it("should reject workout with missing required fields", async () => {
      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send({ name: "Incomplete Workout" });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should reject workout with invalid nested data in coreSets", async () => {
      const invalidWorkout = {
        name: "Invalid Set Workout",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExerciseId,
            coreSet: { order: 1, restTime: 60 },
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should reject workout if a core set has both weight and isBodyWeight", async () => {
      const invalidWorkout = {
        name: "Invalid Set Combo",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExerciseId,
            coreSets: [
              {
                order: 1,
                reps: 10,
                weight: 100,
                isBodyWeight: true,
                restTime: 60,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe("GET /api/v1/workouts", () => {
    it("should return a paginated list of workouts", async () => {
      const res = await request(app).get("/api/v1/workouts?page=1&take=5");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /api/v1/workouts/:id", () => {
    it("should get a workout by its id with all nested data", async () => {
      const res = await request(app).get(
        `/api/v1/workouts/${createdWorkoutIds[0]}`
      );
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(createdWorkoutIds[0]);
      expect(res.body.name).toBe("Full Body Test Workout");
      expect(res.body.workoutExercises).toHaveLength(1);
      expect(res.body.workoutExercises[0].coreSet).toBeDefined();
    });

    it("should return 404 for a non-existent workout id", async () => {
      const res = await request(app).get("/api/v1/workouts/non-existent-id");
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/workouts/edit/:id", () => {
    let workoutToUpdateId: string;
    let originalWorkoutExerciseId: string;

    beforeEach(async () => {
      const workout: IWorkoutEditDTO = {
        name: "Workout to be Updated",
        notes: "A workout for updating purposes.",
        crudOperation: "create",
        workoutExercises: [
          {
            crudOperation: "create",
            order: 1,
            notes: "Initial exercise",
            exerciseId: testExerciseId,
            coreSet: {
              reps: 8,
              weight: 88,
              restTime: 88,
              hasWarmup: false,
              numberOfSets: 3,
              crudOperation: "create",
            },
          },
        ],
      };

      const workoutRes = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workout);
      workoutToUpdateId = workoutRes.body.data.id;
      originalWorkoutExerciseId = workoutRes.body.data.workoutExercises[0].id;

      createdWorkoutIds.push(workoutToUpdateId);
    });

    it("should update top-level fields of a workout", async () => {
      const updateFields: IWorkoutEditDTO = {
        name: "Updated Workout Name",
        notes: "Updated notes.",
      };
      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutToUpdateId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateFields);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("Updated Workout Name");
      expect(res.body.data.notes).toBe("Updated notes.");
    });

    it("should perform CRUD operations on nested workoutExercises and coreSets", async () => {
      const updatePayload: IWorkoutEditDTO = {
        workoutExercises: [
          {
            id: originalWorkoutExerciseId,
            notes: "Updated exercise notes",
            crudOperation: "update",
            order: 2,
            exerciseId: testExerciseId,
            coreSet: {
              crudOperation: "update",
              reps: 20,
              isBodyWeight: true,
              weight: 0,
              restTime: 30,
              numberOfSets: 2,
            },
          },
          {
            notes: "create exercise notes",
            crudOperation: "create",
            order: 2,
            exerciseId: testExerciseId,
            coreSet: {
              crudOperation: "create",
              reps: 15,
              isBodyWeight: false,
              weight: 11,
              restTime: 22,
              numberOfSets: 52,
            },
          },
        ],
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutToUpdateId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updatePayload);

      expect(res.status).toBe(200);
      const updatedWorkout = res.body.data as IWorkoutDTO;
      expect(updatedWorkout.workoutExercises).toHaveLength(2);
      expect(
        updatedWorkout.workoutExercises?.find(
          (we) => we.id === originalWorkoutExerciseId
        )?.notes
      ).toBe("Updated exercise notes");
    });

    it("should return 400 for updating a non-existent workout", async () => {
      const res = await request(app)
        .put("/api/v1/workouts/edit/non-existent-id")
        .set("Cookie", `token=${authToken}`)
        .send({ name: "Doesn't matter" });
      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /api/v1/workouts/:id", () => {
    it("should delete an existing workout", async () => {
      const workoutToDelete: IWorkoutEditDTO = {
        name: "Workout to be Deleted",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            crudOperation: "create",
            exerciseId: testExerciseId,
            coreSet: {
              crudOperation: "create",
              reps: 1,
              weight: 0,
              isBodyWeight: true,
              restTime: 30,
              numberOfSets: 1,
            },
          },
        ],
      };

      const workoutRes = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workoutToDelete);

      const workoutId = workoutRes.body.data.id;

      const deleteRes = await request(app)
        .delete(`/api/v1/workouts/${workoutId}`)
        .set("Cookie", `token=${authToken}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe("Workout deleted successfully");

      const getRes = await request(app).get(`/api/v1/workouts/${workoutId}`);
      expect(getRes.status).toBe(404);
    });

    it("should return 400 for deleting a non-existent workout", async () => {
      const res = await request(app)
        .delete("/api/v1/workouts/non-existent-id")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(400);
    });
  });

  afterAll(async () => {
    for (const id of createdWorkoutIds) {
      await request(app)
        .delete(`/api/v1/workouts/${id}`)
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
    await request(app)
      .delete(`/api/v1/exercises/${testExerciseId}`)
      .catch((err) => {
        console.error(err);
      });
  });
});
