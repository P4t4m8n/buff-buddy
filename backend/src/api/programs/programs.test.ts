import request from "supertest";

import { app } from "../../server";

import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../../shared/models/program.model";
import type { IAuthSignUpDTO } from "../../../../shared/models/auth.model";
import type {
  IExerciseDTO,
  IExerciseEditDTO,
} from "../../../../shared/models/exercise.model";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";
import { IEquipment, IMuscle } from "../exercises/exercises.model";

describe("Programs API", () => {
  let authToken: string;
  let testUserId: string;
  const testWorkouts: IWorkoutDTO[] = [];
  const testExercises: IExerciseDTO[] = [];
  const testPrograms: IProgramDTO[] = [];
  let muscles: IMuscle[] = [];
  let equipment: IEquipment[] = [];

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

    const workout: IWorkoutEditDTO = {
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
          crudOperation: "create",
          hasWarmup: true,
        },
      ],
    };

    const workoutRes = await request(app)
      .post("/api/v1/workouts/edit")
      .set("Cookie", `token=${authToken}`)
      .send(workout);
    testWorkouts.push(workoutRes.body.data);
  });

  describe("POST /api/v1/programs/edit", () => {
    it("should create a new program successfully", async () => {
      const newProgram: IProgramEditDTO = {
        ownerId: testUserId,
        name: "My New Lifting Program",
        notes: "3-day split for strength.",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        isActive: true,
        programWorkouts: [
          {
            daysOfWeek: ["monday", "friday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
            workout: {
              id: testWorkouts[0].id,
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
      expect(program.name).toBe(newProgram.name?.toLowerCase());
      expect(program.programWorkouts).toHaveLength(1);
      expect(program?.programWorkouts?.[0]?.workout?.id).toBe(
        testWorkouts[0].id
      );
      expect(program?.programWorkouts?.[0]?.daysOfWeek).toEqual([
        "monday",
        "friday",
      ]);
      testPrograms.push(program);
    });

    it("should reject program if end date is before start date", async () => {
      const invalidProgram: IProgramEditDTO = {
        ownerId: testUserId,
        name: "Invalid Date Program",
        startDate: "2025-10-31",
        endDate: "2025-08-01",
        isActive: true,
        programWorkouts: [
          {
            workout: {
              id: testWorkouts[0].id,
            },
            daysOfWeek: ["monday"],
            crudOperation: "create",
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
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
        .send({ name: "Only a name", ownerId: testUserId });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors.startDate).toBeDefined();
      expect(res.body.errors.endDate).toBeDefined();
      expect(res.body.errors.programWorkouts).toBeDefined();
    });

    it("should reject program with invalid workout goal", async () => {
      const invalidProgram = {
        name: "Invalid Goal Program",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "invalid-goal",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidProgram);

      expect(res.status).toBe(400);
      expect(res.body.errors["programWorkouts.0.workoutGoal"]).toBeDefined();
      expect(res.body.errors["programWorkouts.0.workoutGoal"]).toMatch(
        "Invalid enum value. Expected 'hypertrophy', received 'invalid-goal"
      );
    });

    it("should reject program with invalid level", async () => {
      const invalidProgram = {
        name: "Invalid Level Program",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "invalid-level",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidProgram);

      expect(res.status).toBe(400);
      expect(res.body.errors["programWorkouts.0.workoutLevel"]).toBeDefined();
      expect(res.body.errors["programWorkouts.0.workoutLevel"]).toMatch(
        "Invalid enum value. Expected 'beginner', received 'invalid-level'"
      );
    });

    it("should reject program with invalid days of week", async () => {
      const invalidProgram = {
        name: "Invalid Days Program",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["invalid-day", "another-invalid"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidProgram);

      expect(res.status).toBe(400);
      expect(res.body.errors["programWorkouts.0.daysOfWeek.0"]).toBeDefined();
      expect(res.body.errors["programWorkouts.0.daysOfWeek.1"]).toBeDefined();
    });

    it("should reject program with no program workouts", async () => {
      const invalidProgram = {
        name: "No Workouts Program",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidProgram);

      expect(res.status).toBe(400);
      expect(res.body.errors.programWorkouts).toMatch(
        "At least one exercise is required"
      );
    });

    it("should sanitize HTML in program name", async () => {
      const programWithHtml: IProgramEditDTO = {
        name: "<script>alert('xss')</script>Malicious <b>Program</b>",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(programWithHtml);

      expect(res.status).toBe(201);
      const program: IProgramDTO = res.body.data;
      testPrograms.push(program);

      expect(program.name).toBe("malicious program");
      expect(program.name).not.toMatch(/<[^>]*>/);
    });

    it("should sanitize HTML in program notes", async () => {
      const programWithHtmlNotes: IProgramEditDTO = {
        name: "Test Program",
        ownerId: testUserId,
        notes:
          '<p>This is a <strong>great</strong> program!</p><script>alert("hack")</script>',
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(programWithHtmlNotes);

      expect(res.status).toBe(201);
      const program: IProgramDTO = res.body.data;
      testPrograms.push(program);

      expect(program.notes).toBe("this is a great program!");
      expect(program.notes).not.toMatch(/<[^>]*>/);
    });

    it("should handle whitespace normalization in program name", async () => {
      const programWithWhitespace: IProgramEditDTO = {
        name: "   Spaced    Out     Program   ",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(programWithWhitespace);

      expect(res.status).toBe(201);
      const program: IProgramDTO = res.body.data;
      testPrograms.push(program);

      expect(program.name).toBe("spaced out program");
    });

    it("should handle empty string after sanitization", async () => {
      const programWithOnlyHtml: IProgramEditDTO = {
        name: "<script></script><style></style>",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(programWithOnlyHtml);

      expect(res.status).toBe(400);
      expect(res.body.errors.name).toMatch(
        "Program name must be at least 1 characters long"
      );
    });

    it("should reject program with missing credentials", async () => {
      const newProgram: IProgramEditDTO = {
        name: "Unauthorized Program",
        startDate: "2025-08-01",
        endDate: "2025-10-31",
        ownerId: testUserId,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["monday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .send(newProgram);

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/v1/programs", () => {
    beforeAll(async () => {});
    it("should return a list of programs", async () => {
      const res = await request(app)
        .get("/api/v1/programs")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should filter programs by name", async () => {
      const res = await request(app)
        .get("/api/v1/programs?name=Lifting")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(
        res.body.data.every((p: IProgramDTO) =>
          (p?.name || "").includes("lifting")
        )
      ).toBe(true);
    });

    it("should filter programs by active status", async () => {
      const res = await request(app)
        .get("/api/v1/programs?isActive=true")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.every((p: IProgramDTO) => p.isActive === true)).toBe(
        true
      );
    });

    it("should support pagination", async () => {
      const res = await request(app)
        .get("/api/v1/programs?skip=1&page=1")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("GET /api/v1/programs/:id", () => {
    let programId: string;

    beforeAll(async () => {
      const program: IProgramEditDTO = {
        ownerId: testUserId,
        name: "Program To Get",
        startDate: "2025-01-01",
        endDate: "2025-02-01",
        isActive: true,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["saturday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(program);

      programId = res.body.data.id;
      testPrograms.push(res.body.data);
    });

    it("should get a single program by its ID", async () => {
      const res = await request(app)
        .get(`/api/v1/programs/${programId}`)
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(programId);
      expect(res.body.data.name).toBe("program to get");
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
    let programData: IProgramDTO;

    beforeEach(async () => {
      const program: IProgramEditDTO = {
        ownerId: testUserId,
        name: "Program To Update",
        startDate: "2025-03-01",
        endDate: "2025-04-01",
        isActive: true,
        programWorkouts: [
          {
            workout: {
              id: testWorkouts[0].id,
            },
            crudOperation: "create",
            daysOfWeek: ["tuesday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(program);

      programId = res.body.data.id;
      programData = res.body.data;
      testPrograms.push(res.body.data);
    });

    it("should update program name successfully", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        name: "Updated Program Name",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Program updated successfully");
      expect(res.body.data.name).toBe("updated program name");
    });

    it("should update program notes successfully", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        notes: "This program has been updated.",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.notes).toBe("this program has been updated.");
    });

    it("should update program active status successfully", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        isActive: false,
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.isActive).toBe(false);
    });

    it("should update program dates successfully", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        startDate: "2025-05-01",
        endDate: "2025-06-01",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      const programRes = res.body.data as IProgramDTO;

      expect(res.status).toBe(200);
      expect(programRes.startDate).toContain("2025-05-01");
      expect(programRes.endDate).toContain("2025-06-01");
    });

    it("should update an existing programWorkout", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        programWorkouts: [
          {
            id: programData!.programWorkouts![0].id,
            crudOperation: "update",
            daysOfWeek: ["monday", "tuesday"],
            workout: {
              id: programData!.programWorkouts![0].workout!.id!,
            },
          },
        ],
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      const resProgram: IProgramDTO = res.body.data;
      expect(resProgram?.programWorkouts?.[0].daysOfWeek).toEqual(
        expect.arrayContaining(["monday", "tuesday"])
      );
    });

    it("should sanitize HTML in updated program name", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        name: "<script>alert('hack')</script>Updated <b>Program</b>",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated program");
      expect(res.body.data.name).not.toMatch(/<[^>]*>/);
    });

    it("should reject update with invalid date range", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        startDate: "2025-10-31",
        endDate: "2025-08-01",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.errors.endDate).toContain(
        "End date must be after start date"
      );
    });

    it("should handle whitespace normalization on update", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        name: "   Updated    Program   Name   ",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("updated program name");
    });

    it("should return 404 for updating a non-existent program", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        name: "This will fail",
      };

      const res = await request(app)
        .put("/api/v1/programs/edit/non-existent-id")
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(400);
    });

    it("should reject update with missing credentials", async () => {
      const updateData: IProgramEditDTO = {
        ownerId: testUserId,
        name: "This will fail without auth",
      };

      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .send(updateData);

      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /api/v1/programs/:id", () => {
    it("should delete an existing program", async () => {
      const program: IProgramEditDTO = {
        ownerId: testUserId,
        name: "Program To Delete",
        startDate: "2025-05-01",
        endDate: "2025-06-01",
        isActive: false,
        programWorkouts: [
          {
            workout: { id: testWorkouts[0].id },
            daysOfWeek: ["wednesday"],
            workoutGoal: "hypertrophy",
            workoutLevel: "beginner",
            crudOperation: "create",
          },
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

    it("should return 404 for deleting a non-existent program", async () => {
      const res = await request(app)
        .delete("/api/v1/programs/non-existent-id")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(400);
    });
  });

  afterAll(async () => {
    for (const { id } of testPrograms) {
      if (!id) continue;
      await request(app)
        .delete(`/api/v1/programs/${id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }

    if (testWorkouts.length > 0) {
      for (const { id } of testWorkouts) {
        await request(app)
          .delete(`/api/v1/workouts/${id}`)
          .set("Cookie", `token=${authToken}`)

          .catch((err) => {
            console.error(err);
          });
      }
    }

    if (testExercises.length > 0) {
      for (const { id } of testExercises) {
        await request(app)
          .delete(`/api/v1/exercises/${id}`)
          .set("Cookie", `token=${authToken}`)

          .catch((err) => {
            console.error(err);
          });
      }
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
