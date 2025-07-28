import request from "supertest";
import { app } from "../../server";
import {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../../shared/models/program.model";
import { IAuthSignUpDTO } from "../../../../shared/models/auth.model";
import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { IWorkoutEditDTO } from "../../../../shared/models/workout.model";

describe("Programs API", () => {
  let authToken: string;
  let testUserId: string;
  let testWorkoutId: string;
  let testExerciseId: string;
  const createdProgramIds: string[] = [];

  beforeAll(async () => {
    const userCredentials: IAuthSignUpDTO = {
      email: `test-program-user-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "Program",
      lastName: "Tester",
    };
    const userRes = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(userCredentials);
    testUserId = userRes.body.data.id;
    authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];

    const exercise: IExerciseDTO = {
      name: `Program Test Exercise ${Date.now()}`,
      youtubeUrl: "https://www.youtube.com/watch?v=prgtest",
      types: ["strength"],
      equipment: ["barbell"],
      muscles: ["chest"],
    };

    const exerciseRes = await request(app)
      .post("/api/v1/exercises/edit")
      .set("Cookie", `token=${authToken}`)
      .send(exercise);
    testExerciseId = exerciseRes.body.data.id;

    const workout: IWorkoutEditDTO = {
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

    const workoutRes = await request(app)
      .post("/api/v1/workouts/edit")
      .set("Cookie", `token=${authToken}`)
      .send(workout);
    testWorkoutId = workoutRes.body.data.id;
  });

  describe("POST /api/v1/programs/edit", () => {
    it("should create a new program successfully", async () => {
      const newProgram: IProgramEditDTO = {
        name: "My New Lifting Program",
        notes: "3-day split for strength.",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        isActive: true,
        programWorkouts: [
          {
            daysOfWeek: ["monday", "friday"],
            crudOperation: "create",
            workout: {
              id: testWorkoutId,
            },
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(newProgram);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Program created successfully");
      const program: IProgramDTO = res.body.data;
      expect(program.id).toBeDefined();
      expect(program.name).toBe(newProgram.name);
      expect(program.programWorkouts).toHaveLength(1);
      expect(program?.programWorkouts?.[0]?.workout?.id).toBe(testWorkoutId);
      expect(program?.programWorkouts?.[0]?.daysOfWeek).toEqual([
        "monday",
        "friday",
      ]);
      createdProgramIds.push(program.id!);
    });

    it("should reject program if end date is before start date", async () => {
      const invalidProgram: IProgramEditDTO = {
        name: "Invalid Date Program",
        startDate: "2025-10-31",
        endDate: "2025-08-01",
        isActive: true,
        programWorkouts: [
          {
            workout: {
              id: testWorkoutId,
            },
            daysOfWeek: ["monday"],
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidProgram);

      expect(res.status).toBe(400);
      expect(res.body.errors.endDate).toContain(
        "End date must be after start date"
      );
    });

    it("should reject program with missing required fields", async () => {
      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send({ name: "Only a name" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("GET /api/v1/programs", () => {
    it("should return a list of programs", async () => {
      const res = await request(app)
        .get("/api/v1/programs")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should filter programs by name", async () => {
      const res = await request(app)
        .get("/api/v1/programs?name=Lifting")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(
        res.body.every((p: IProgramDTO) => (p?.name || "").includes("Lifting"))
      ).toBe(true);
    });
  });

  describe("GET /api/v1/programs/:id", () => {
    let programId: string;
    beforeAll(async () => {
      const program: IProgramEditDTO = {
        name: "Program To Get",
        startDate: "2025-01-01",
        endDate: "2025-02-01",
        isActive: true,
        programWorkouts: [
          { workout: { id: testWorkoutId }, daysOfWeek: ["saturday"] },
        ],
      };
      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(program);
      programId = res.body.data.id;
      createdProgramIds.push(programId);
    });

    it("should get a single program by its ID", async () => {
      const res = await request(app)
        .get(`/api/v1/programs/${programId}`)
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(programId);
      expect(res.body.name).toBe("Program To Get");
    });

    it("should return 404 for a non-existent program ID", async () => {
      const res = await request(app)
        .get("/api/v1/programs/non-existent-id")
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/v1/programs/edit/:id", () => {
    let programId: string;
    beforeEach(async () => {
      const program: IProgramEditDTO = {
        name: "Program To Update",
        startDate: "2025-03-01",
        endDate: "2025-04-01",
        isActive: true,
        programWorkouts: [
          { workout: { id: testWorkoutId }, daysOfWeek: ["tuesday"] },
        ],
      };
      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(program);
      programId = res.body.data.id;
      createdProgramIds.push(programId);
    });

    it("should update an existing program", async () => {
      const updateData: IProgramEditDTO = {
        name: "Updated Program Name",
        notes: "This program has been updated.",
        isActive: false,
      };
      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(updateData.name);
      expect(res.body.data.notes).toBe(updateData.notes);
    });
  });

  describe("DELETE /api/v1/programs/:id", () => {
    it("should delete an existing program", async () => {
      const program: IProgramEditDTO = {
        name: "Program To Delete",
        startDate: "2025-05-01",
        endDate: "2025-06-01",
        isActive: false,
        programWorkouts: [
          { workout: { id: testWorkoutId }, daysOfWeek: ["wednesday"] },
        ],
      };
      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(program);
      const programIdToDelete = res.body.data.id;

      const deleteRes = await request(app)
        .delete(`/api/v1/programs/${programIdToDelete}`)
        .set("Cookie", `token=${authToken}`);
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe("Program deleted successfully");

      const getRes = await request(app)
        .get(`/api/v1/programs/${programIdToDelete}`)
        .set("Cookie", `token=${authToken}`);
      expect(getRes.status).toBe(404);
    });
  });

  afterAll(async () => {
    // The user deletion will cascade and delete programs, but we can be explicit
    for (const id of createdProgramIds) {
      await request(app)
        .delete(`/api/v1/programs/${id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }

    if (testExerciseId) {
      await request(app)
        .delete(`/api/v1/exercises/${testExerciseId}`)
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
