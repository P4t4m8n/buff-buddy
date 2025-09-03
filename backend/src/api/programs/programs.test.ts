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
  let testExercises: IExerciseDTO[] = [];
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

    const exercises: IExerciseDTO[] = [
      {
        name: "cardio 1",
        youtubeUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
        type: "cardio",
        equipment: ["cable_machine"],
        muscles: ["chest", "triceps", "abductors"],
      },
      {
        name: "strength 1",
        youtubeUrl: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["quads", "glutes", "hamstrings", "lower_back"],
      },
      {
        name: "strength 2",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["biceps", "forearms"],
      },
      {
        name: "cardio 2",
        youtubeUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
        type: "cardio",
        equipment: ["air_bike"],
        muscles: ["triceps", "abs", "rotator_cuff"],
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
      workoutExercises: [
        {
          order: 1,
          notes: "First exercise",
          exerciseData: {
            type: testExercises[0].type!,
            id: testExercises[0].id!,
          },
          crudOperation: "create",
          coreCardioSet: {
            warmupTime: 60 * 10, // 10 minutes
            workTime: 60 * 20, // 20 minutes
            avgHeartRate: 120,
            avgSpeed: 8,
            distance: 5,
            calorieTarget: 300,
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
      expect(program.name).toBe(newProgram.name?.toLowerCase());
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
        res.body.every((p: IProgramDTO) => (p?.name || "").includes("lifting"))
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
      expect(res.body.name).toBe("program to get");
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
    let programData: IProgramEditDTO;
    beforeEach(async () => {
      const workout: IWorkoutEditDTO = {
        name: "Full Body Test Workout",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise",
            exerciseData: {
              id: testExercises[0].id!,
              type: testExercises[0].type!,
            },
            crudOperation: "create",
            coreCardioSet: {
              warmupTime: 60 * 10, // 10 minutes
              workTime: 60 * 20, // 20 minutes
              avgHeartRate: 120,
              avgSpeed: 8,
              distance: 5,
              calorieTarget: 300,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            notes: "Second exercise",
            exerciseData: {
              id: testExercises[1].id!,
              type: testExercises[1].type!,
            },
            crudOperation: "create",
            coreStrengthSet: {
              reps: 10,
              weight: 70,
              restTime: 90,
              numberOfSets: 4,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
          {
            order: 3,
            notes: "Third exercise",
            exerciseData: {
              id: testExercises[2].id!,
              type: testExercises[2].type!,
            },
            crudOperation: "create",
            coreStrengthSet: {
              reps: 15,
              weight: 20,
              restTime: 45,
              numberOfSets: 2,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 4,
            notes: "Fourth exercise",
            exerciseData: {
              id: testExercises[3].id!,
              type: testExercises[3].type!,
            },
            crudOperation: "create",
            coreCardioSet: {
              warmupTime: 60 * 5, // 5 minutes
              workTime: 60 * 15, // 15 minutes
              avgHeartRate: 130,
              avgSpeed: 7,
              distance: 3,
              calorieTarget: 200,
              crudOperation: "create",
            },
          },
        ],
      };
      const program: IProgramEditDTO = {
        name: "Program To Update",
        startDate: "2025-03-01",
        endDate: "2025-04-01",
        isActive: true,
        programWorkouts: [
          {
            workout: workout,
            crudOperation: "create",
            daysOfWeek: ["tuesday"],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/programs/edit")
        .set("Cookie", `token=${authToken}`)
        .send(program);

      programId = res.body.data.id;
      programData = res.body.data;
      createdProgramIds.push(programId);
    });

    it("should update an existing programWorkout", async () => {
      const updateData: IProgramEditDTO = {
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
    it("should update an existing program", async () => {
      const updateData: IProgramEditDTO = {
        name: "Updated Program Name",
        notes: "This program has been updated.",
        isActive: false,
        startDate: "2025-03-01",
        endDate: "2025-04-01",
      };
      const res = await request(app)
        .put(`/api/v1/programs/edit/${programId}`)
        .set("Cookie", `token=${authToken}`)
        .send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(updateData.name?.toLowerCase());
      expect(res.body.data.notes).toBe(updateData.notes?.toLowerCase());
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

    if (testExercises.length > 0) {
      for (const exercise of testExercises) {
        await request(app)
          .delete(`/api/v1/exercises/${exercise.id}`)
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
