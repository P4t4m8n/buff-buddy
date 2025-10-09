import request from "supertest";

import { app } from "../../server";

import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseDTO,
} from "../../../../shared/models/workout.model";
import type {
  IExerciseDTO,
  IExerciseEditDTO,
} from "../../../../shared/models/exercise.model";
import type { ExerciseType } from "../../../prisma/generated/prisma";
import type { IAuthSignUpDTO } from "../../../../shared/models/auth.model";
import { IEquipment, IMuscle } from "../exercises/exercises.model";

describe("Workouts API", () => {
  const testExercises: IExerciseDTO[] = [];
  let authToken: string;
  let testUserId: string;
  const testWorkouts: IWorkoutDTO[] = [];
  let muscles: IMuscle[] = [];
  let equipment: IEquipment[] = [];

  beforeAll(async () => {
    const userCredentials: IAuthSignUpDTO = {
      email: `test-workout-user-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Workout",
      lastName: "Tester",
    };
    const userRes = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(userCredentials);
    testUserId = userRes.body.data.id;
    authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];

    const musclesRes = await request(app)
      .get("/api/v1/exercises/muscles/list")
      .set("Cookie", `token=${authToken}`);
    muscles = musclesRes.body.data;

    const equipmentRes = await request(app)
      .get("/api/v1/exercises/equipment/list")
      .set("Cookie", `token=${authToken}`);
    equipment = equipmentRes.body.data;
    const exercises: IExerciseEditDTO[] = [
      {
        name: "strength 1",
        youtubeUrl: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
        type: "strength",
        equipment: equipment.sort(() => 0.5 - Math.random()).slice(0, 1),
        muscles: muscles.sort(() => 0.5 - Math.random()).slice(0, 2),
        ownerId: testUserId,
      },
      {
        name: "strength 2",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
        type: "strength",
        equipment: equipment.sort(() => 0.5 - Math.random()).slice(0, 1),
        muscles: muscles.sort(() => 0.5 - Math.random()).slice(0, 2),
        ownerId: testUserId,
      },
      {
        name: "cardio 1",
        youtubeUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
        type: "cardio",
        equipment: equipment.sort(() => 0.5 - Math.random()).slice(0, 1),
        muscles: muscles.sort(() => 0.5 - Math.random()).slice(0, 2),
        ownerId: testUserId,
      },
      {
        name: "cardio 2",
        youtubeUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
        type: "cardio",
        equipment: equipment.sort(() => 0.5 - Math.random()).slice(0, 1),
        muscles: muscles.sort(() => 0.5 - Math.random()).slice(0, 2),
        ownerId: testUserId,
      },
    ];

    for (const exercise of exercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      testExercises.push(exerciseRes.body.data);
    }
  });

  describe("POST /api/v1/workouts/edit", () => {
    it("should create a new workout successfully", async () => {
      const newWorkout: IWorkoutEditDTO = {
        name: "Full Body Test Workout",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise",
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            hasWarmup: true,
            isBodyWeight: true,
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newWorkout);

      expect(res.status).toBe(201);
      const workout: IWorkoutDTO = res.body.data;
      expect(res.body.message).toBe("Workout created successfully");
      expect(workout).toHaveProperty("id");
      expect(workout.name).toBe(newWorkout.name?.toLowerCase());
      expect(workout.workoutExercises).toHaveLength(1);
      expect(workout?.workoutExercises?.[0]?.exercise?.id).toBe(
        newWorkout.workoutExercises?.[0].exerciseData?.id
      );
      expect(workout?.workoutExercises?.[0]?.isBodyWeight).toBe(true);
      expect(workout?.workoutExercises?.[0]?.hasWarmup).toBe(true);

      testWorkouts.push(workout);
    });

    it("should reject workout with missing required fields", async () => {
      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send({ ownerId: testUserId });

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors.name).toBe("Workout name is required.");
      expect(res.body.errors.workoutExercises).toBe(
        "Workout need at least one exercise."
      );
    });

    it("should reject workout with invalid exercise type", async () => {
      const invalidWorkout: Partial<IWorkoutEditDTO> = {
        name: "Invalid Type Workout",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: "WRONG_TYPE" as ExerciseType,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors["workoutExercises.0.exerciseData.type"]).toMatch(
        "Invalid type type only strength, cardio, flexibility, miscellaneous are allowed"
      );
    });

    it("should reject workout with invalid exercise ID", async () => {
      const invalidWorkout: Partial<IWorkoutEditDTO> = {
        name: "Invalid ID Workout",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: "invalid-exercise-id",
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.message).toContain(
        "One or more referenced records not found"
      );
    });

    it("should reject workout with invalid order", async () => {
      const invalidWorkout: Partial<IWorkoutEditDTO> = {
        name: "Invalid Order Workout",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 0, // Invalid order (must be >= 1)
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors["workoutExercises.0.order"]).toMatch(
        "Order must be at least 1"
      );
    });

    it("should reject workout with order too high", async () => {
      const invalidWorkout: Partial<IWorkoutEditDTO> = {
        name: "High Order Workout",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 101, // Invalid order (must be <= 100)
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors["workoutExercises.0.order"]).toMatch(
        "Order cannot exceed 100"
      );
    });

    it("should reject workout with too many exercises", async () => {
      const workoutExercises = Array.from({ length: 51 }, (_, i) => ({
        order: i + 1,
        exerciseData: {
          type: testExercises[0].type!,
          id: testExercises[0].id!,
        },
        crudOperation: "create" as const,
      }));

      const invalidWorkout: Partial<IWorkoutEditDTO> = {
        name: "Too Many Exercises Workout",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises,
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors.workoutExercises).toMatch(
        "Maximum 50 workout sets allowed per workout"
      );
    });

    it("should sanitize HTML in workout name", async () => {
      const workoutWithHtml: IWorkoutEditDTO = {
        name: "<script>alert('xss')</script>Malicious <b>Workout</b>",
        crudOperation: "create",
        ownerId: testUserId,

        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workoutWithHtml);

      expect(res.status).toBe(201);
      const workout: IWorkoutDTO = res.body.data;
      testWorkouts.push(workout);

      expect(workout.name).toBe("malicious workout");
      expect(workout.name).not.toMatch(/<[^>]*>/);
    });

    it("should sanitize HTML in workout notes", async () => {
      const workoutWithHtmlNotes: IWorkoutEditDTO = {
        name: "Test Workout",
        notes:
          '<p>This is a <strong>great</strong> workout!</p><script>alert("hack")</script>',
        crudOperation: "create",
        ownerId: testUserId,

        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workoutWithHtmlNotes);

      expect(res.status).toBe(201);
      const workout: IWorkoutDTO = res.body.data;
      testWorkouts.push(workout);

      expect(workout.notes).toBe("this is a great workout!");
      expect(workout.notes).not.toMatch(/<[^>]*>/);
    });

    it("should handle whitespace normalization in workout name", async () => {
      const workoutWithWhitespace: IWorkoutEditDTO = {
        name: "   Spaced    Out     Workout   ",
        crudOperation: "create",
        ownerId: testUserId,

        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workoutWithWhitespace);

      expect(res.status).toBe(201);
      const workout: IWorkoutDTO = res.body.data;
      testWorkouts.push(workout);

      expect(workout.name).toBe("spaced out workout");
    });

    it("should handle empty string after sanitization", async () => {
      const workoutWithOnlyHtml: IWorkoutEditDTO = {
        name: "<script></script><style></style>",
        ownerId: testUserId,

        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workoutWithOnlyHtml);

      expect(res.status).toBe(400);
      expect(res.body.errors.name).toMatch(
        "Workout name must be at least 1 characters long"
      );
    });

    it("should reject workout with missing credentials", async () => {
      const newWorkout: IWorkoutEditDTO = {
        name: "Unauthorized Workout",
        ownerId: testUserId,

        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .send(newWorkout);

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/v1/workouts", () => {
    beforeAll(async () => {
      const workoutsToCreate: IWorkoutEditDTO[] = [
        {
          name: "Cardio Blast",
          notes: "A high-intensity cardio workout.",
          crudOperation: "create",
          ownerId: testUserId,

          workoutExercises: [
            {
              order: 1,
              exerciseData: {
                type: testExercises.find((ex) => ex.type === "cardio")?.type!,
                id: testExercises.find((ex) => ex.type === "cardio")?.id!,
              },
              crudOperation: "create",
            },
          ],
        },
        {
          name: "Strength Builder",
          notes: "Focus on building strength.",
          isTemplate: true,
          crudOperation: "create",
          ownerId: testUserId,

          workoutExercises: [
            {
              order: 1,
              exerciseData: {
                type: testExercises.find((ex) => ex.type === "strength")?.type!,
                id: testExercises.find((ex) => ex.type === "strength")?.id!,
              },
              crudOperation: "create",
            },
          ],
        },
        {
          name: "Morning Cardio",
          notes: "A refreshing morning cardio workout.",
          crudOperation: "create",
          ownerId: testUserId,

          workoutExercises: [
            {
              order: 1,
              exerciseData: {
                type: testExercises.find((ex) => ex.type === "cardio")?.type!,
                id: testExercises.find((ex) => ex.type === "cardio")?.id!,
              },
              crudOperation: "create",
            },
          ],
        },
      ];
      for (const workout of workoutsToCreate) {
        const res = await request(app)
          .post("/api/v1/workouts/edit")
          .set("Cookie", `token=${authToken}`)
          .send(workout);
        testWorkouts.push(res.body.data);
      }
    });

    it("should return a list of workouts", async () => {
      const res = await request(app)
        .get("/api/v1/workouts")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(5);
    });

    it("should filter workouts exercise by name", async () => {
      const res = await request(app)
        .get("/api/v1/workouts?exerciseName=cardio")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);

      const workoutsRes: IWorkoutDTO[] = res.body.data;
      expect(Array.isArray(workoutsRes)).toBe(true);

      expect(
        workoutsRes.every((workout) =>
          workout?.workoutExercises?.some((ex) =>
            ex.exercise?.name?.toLowerCase().includes("cardio")
          )
        )
      ).toBe(true);
    });

    it("should filter workouts by template status false", async () => {
      const res = await request(app)
        .get("/api/v1/workouts?isTemplate=false")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      const workoutsRes: IWorkoutDTO[] = res.body.data;
      expect(Array.isArray(workoutsRes)).toBe(true);
      expect(workoutsRes.every((workout) => workout.isTemplate === false)).toBe(
        true
      );
    });

    it("should filter workouts by template status true", async () => {
      const res = await request(app)
        .get("/api/v1/workouts?isTemplate=true")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      const workoutsRes: IWorkoutDTO[] = res.body.data;
      expect(Array.isArray(workoutsRes)).toBe(true);
      expect(workoutsRes.every((workout) => workout.isTemplate === true)).toBe(
        true
      );
    });

    it("should support pagination", async () => {
      const res = await request(app)
        .get("/api/v1/workouts?skip=0&take=5")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      const workoutsRes: IWorkoutDTO[] = res.body.data;
      expect(Array.isArray(workoutsRes)).toBe(true);
      expect(workoutsRes.length).toBeLessThanOrEqual(5);
    });
  });

  describe("GET /api/v1/workouts/:id", () => {
    let workoutId: string;

    beforeAll(async () => {
      const workout: IWorkoutEditDTO = {
        name: "Workout To Get",
        notes: "A workout for getting by ID.",
        crudOperation: "create",
        ownerId: testUserId,

        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workout);

      workoutId = res.body.data.id;
      testWorkouts.push(res.body.data);
    });

    it("should get a single workout by its ID", async () => {
      const res = await request(app)
        .get(`/api/v1/workouts/${workoutId}`)
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.id || res.body.data.id).toBe(workoutId);
      expect((res.body.name || res.body.data.name).toLowerCase()).toBe(
        "workout to get"
      );
    });

    it("should return 404 for a non-existent workout ID", async () => {
      const res = await request(app)
        .get("/api/v1/workouts/non-existent-id")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/workouts/edit/:id", () => {
    let workoutId: string;
    let originalWorkoutExercises: IWorkoutExerciseDTO[];

    beforeEach(async () => {
      const workout: IWorkoutEditDTO = {
        name: "Workout To Update",
        notes: "A workout for updating purposes.",
        crudOperation: "create",
        ownerId: testUserId,

        workoutExercises: [
          {
            order: 1,
            notes: "Initial exercise str",
            exerciseData: {
              type: testExercises[1].type!,
              id: testExercises[1].id!,
            },
            crudOperation: "create",
          },
          {
            order: 2,
            notes: "Initial exercise car",
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workout);

      workoutId = res.body.data.id;
      originalWorkoutExercises = res.body.data.workoutExercises;
      testWorkouts.push(res.body.data);
    });

    it("should update workout name successfully", async () => {
      const updateData: IWorkoutEditDTO = {
        name: "Updated Workout Name",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Workout updated successfully");
      expect(res.body.data.name).toBe("updated workout name");
    });

    it("should update workout notes successfully", async () => {
      const updateData: IWorkoutEditDTO = {
        notes: "Updated workout notes",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.notes).toBe("updated workout notes");
    });

    it("should update workout template status", async () => {
      const updateData: IWorkoutEditDTO = {
        isTemplate: true,
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.isTemplate).toBe(true);
    });

    it("should perform CRUD operations on workoutExercises", async () => {
      const strengthExercise = originalWorkoutExercises.find(
        (e) => e.notes === "initial exercise str"
      );
      const cardioExercise = originalWorkoutExercises.find(
        (e) => e.notes === "initial exercise car"
      );

      const updateData: IWorkoutEditDTO = {
        ownerId: testUserId,

        workoutExercises: [
          {
            id: strengthExercise?.id,
            notes: "Updated strength exercise",
            crudOperation: "update",

            order: 3,
            exerciseData: {
              id: testExercises[1].id!,
              type: testExercises[1].type!,
            },
          },
          {
            id: cardioExercise?.id!,
            notes: "Updated cardio exercise",
            crudOperation: "update",
            order: 1,
            exerciseData: {
              id: testExercises[0].id!,
              type: testExercises[0].type!,
            },
          },
          {
            notes: "New exercise",
            crudOperation: "create",
            order: 2,
            exerciseData: {
              id: testExercises[2].id!,
              type: testExercises[2].type!,
            },
          },
        ],
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.workoutExercises).toHaveLength(3);
    });

    it("should sanitize HTML in updated workout name", async () => {
      const updateData: IWorkoutEditDTO = {
        name: "<script>alert('hack')</script>Updated <b>Workout</b>",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated workout");
      expect(res.body.data.name).not.toMatch(/<[^>]*>/);
    });

    it("should handle whitespace normalization on update", async () => {
      const updateData: IWorkoutEditDTO = {
        name: "   Updated    Workout   Name   ",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated workout name");
    });

    it("should return 400 for updating a non-existent workout", async () => {
      const updateData: IWorkoutEditDTO = {
        name: "This will fail",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put("/api/v1/workouts/edit/non-existent-id")
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
    });

    it("should reject update with missing credentials", async () => {
      const updateData: IWorkoutEditDTO = {
        name: "This will fail without auth",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .send(updateData);

      expect(res.status).toBe(401);
    });

    it("should reject update with empty name after sanitization", async () => {
      const updateData: IWorkoutEditDTO = {
        name: "<script></script><style></style>",
        ownerId: testUserId,
      };

      const res = await request(app)
        .put(`/api/v1/workouts/edit/${workoutId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.errors.name).toMatch(
        "Workout name must be at least 1 characters long"
      );
    });
  });

  describe("DELETE /api/v1/workouts/:id", () => {
    it("should delete an existing workout", async () => {
      const workout: IWorkoutEditDTO = {
        name: "Workout To Be Deleted",
        ownerId: testUserId,
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workout);

      const workoutIdToDelete = res.body.data.id;

      const deleteRes = await request(app)
        .delete(`/api/v1/workouts/${workoutIdToDelete}`)
        .set("Cookie", `token=${authToken}`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe("Workout deleted successfully");

      const getRes = await request(app)
        .get(`/api/v1/workouts/${workoutIdToDelete}`)
        .set("Cookie", `token=${authToken}`);

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
    for (const { id } of testWorkouts) {
      await request(app)
        .delete(`/api/v1/workouts/${id}`)
        .set("Cookie", `token=${authToken}`)

        .catch((err) => {
          console.error(err);
        });
    }

    for (const exercise of testExercises) {
      await request(app)
        .delete(`/api/v1/exercises/${exercise.id}`)
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
