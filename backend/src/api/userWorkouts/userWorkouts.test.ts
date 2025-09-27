import request from "supertest";

import { app } from "../../server";

import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";
import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../shared/models/userWorkout";
import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../../shared/models/program.model";

describe("UserWorkout API", () => {
  const testWorkouts: IWorkoutDTO[] = [];
  const testCardioExercises: IExerciseDTO[] = [];
  const testStrengthExercises: IExerciseDTO[] = [];
  const testUserWorkouts: IUserWorkoutDTO[] = [];
  const testPrograms: IProgramDTO[] = [];
  let testUserId: string;
  let authToken: string;

  beforeAll(async () => {
    const userCredentials = {
      email: `test-userWorkout-${Date.now()}@example.com`,
      password: "Password123!",
      confirmPassword: "Password123!",
      firstName: "test-userWorkout",
      lastName: "API",
    };
    const userRes = await request(app)
      .post("/api/v1/auth/sign-up")
      .send(userCredentials);
    testUserId = userRes.body.data.id;
    authToken = userRes.headers["set-cookie"][0].split(";")[0].split("=")[1];

    const strengthExercises: IExerciseDTO[] = [
      {
        name: "strength 1",
        youtubeUrl: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["quads", "glutes", "hamstrings", "lower_back"],
        ownerId: testUserId,
      },
      {
        name: "strength 2",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["biceps", "forearms"],
        ownerId: testUserId,
      },
    ];

    const cardioExercises: IExerciseDTO[] = [
      {
        name: "cardio 1",
        youtubeUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
        type: "cardio",
        equipment: ["cable_machine"],
        muscles: ["chest", "triceps", "abductors"],
        ownerId: testUserId,
      },
      {
        name: "cardio 2",
        youtubeUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
        type: "cardio",
        equipment: ["air_bike"],
        muscles: ["triceps", "abs", "rotator_cuff"],
        ownerId: testUserId,
      },
    ];

    for (const exercise of strengthExercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      testStrengthExercises.push(exerciseRes.body.data);
    }

    for (const exercise of cardioExercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      testCardioExercises.push(exerciseRes.body.data);
    }

    const workouts: IWorkoutEditDTO[] = [
      {
        name: "Strength Test Workout",
        notes: "A workout for testing strength exercises.",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            notes: "First strength exercise",
            exerciseData: {
              type: testStrengthExercises[0].type!,
              id: testStrengthExercises[0].id!,
            },
            crudOperation: "create",
            isBodyWeight: false,
            hasWarmup: true,
          },
          {
            order: 2,
            notes: "Second strength exercise",
            exerciseData: {
              type: testStrengthExercises[1].type!,
              id: testStrengthExercises[1].id!,
            },
            crudOperation: "create",
            isBodyWeight: true,
            hasWarmup: false,
          },
        ],
      },
      {
        name: "Cardio Test Workout",
        notes: "A workout for testing cardio exercises.",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            notes: "First cardio exercise",
            exerciseData: {
              type: testCardioExercises[0].type!,
              id: testCardioExercises[0].id!,
            },
            crudOperation: "create",
            hasWarmup: true,
          },
          {
            order: 2,
            notes: "Second cardio exercise",
            exerciseData: {
              type: testCardioExercises[1].type!,
              id: testCardioExercises[1].id!,
            },
            crudOperation: "create",
            hasWarmup: false,
          },
        ],
      },
    ];

    for (const workout of workouts) {
      const workoutRes = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workout);
      testWorkouts.push(workoutRes.body.data);
    }

    const newProgram: IProgramEditDTO = {
      name: "UserWorkout Test Program",
      notes: "Program for testing user workouts.",
      startDate: "2025-08-01",
      endDate: "2025-10-31",
      ownerId: testUserId,
      isActive: true,
      programWorkouts: [
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: { id: testWorkouts[0].id, ownerId: testUserId },
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
        {
          daysOfWeek: ["wednesday"],
          crudOperation: "create",
          workout: { id: testWorkouts[1].id, ownerId: testUserId },
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
      ],
    };

    const programRes = await request(app)
      .post("/api/v1/programs/edit")
      .set("Cookie", `token=${authToken}`)
      .send(newProgram);
    testPrograms.push(programRes.body.data);
  });

  describe("POST /api/v1/user-workouts", () => {
    it("should create a new user workout with strength exercises successfully", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 10,
                weight: 135,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
              {
                reps: 8,
                weight: 135,
                isBodyWeight: false,
                crudOperation: "create",
                order: 2,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: true,
                isWarmup: false,
              },
            ],
          },
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[1].id!,
            userStrengthSets: [
              {
                reps: 12,
                weight: 0,
                isBodyWeight: true,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("User-Workout created successfully");
      const userWorkout: IUserWorkoutDTO = res.body.data;
      expect(userWorkout).toHaveProperty("id");
      expect(userWorkout.program?.id).toBe(testPrograms[0].id);
      expect(userWorkout.owner?.id).toBe(testUserId);
      expect(userWorkout.workout?.id).toBe(testWorkouts[0].id);
      expect(userWorkout.userWorkoutExercises).toHaveLength(2);

      testUserWorkouts.push(userWorkout);
    });

    it("should create a new user workout with cardio exercises successfully", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[1].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[1].workoutExercises?.[0].id!,
            userCardioSets: [
              {
                workTime: 60 * 30,
                avgHeartRate: 150,
                avgSpeed: 8.5,
                distance: 4.25,
                caloriesBurned: 320,
                isCompleted: true,
                order: 1,
                crudOperation: "create",
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      expect(res.status).toBe(201);
      const userWorkout: IUserWorkoutDTO = res.body.data;
      expect(userWorkout.userWorkoutExercises).toHaveLength(1);
      expect(userWorkout.userWorkoutExercises?.[0].userCardioSets).toHaveLength(
        1
      );

      testUserWorkouts.push(userWorkout);
    });

    it("should reject user workout with missing required fields", async () => {
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors.workoutId).toBeDefined();
      expect(res.body.errors.programId).toBeDefined();
      expect(res.body.errors.userWorkoutExercises).toBeDefined();
    });

    it("should reject user workout with invalid workout ID", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: "invalid-workout-id",
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 10,
                weight: 100,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(404);
      expect(res.body.message).toContain(
        "One or more referenced records not found"
      );
    });

    it("should reject user workout with invalid program ID", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: "invalid-program-id",
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 10,
                weight: 100,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(404);
      expect(res.body.message).toContain(
        "One or more referenced records not found"
      );
    });

    it("should reject user workout with both strength and cardio sets", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 10,
                weight: 100,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
            userCardioSets: [
              {
                workTime: 1800,
                avgHeartRate: 150,
                avgSpeed: 8.5,
                distance: 4.25,
                caloriesBurned: 320,
                isCompleted: true,
                order: 1,
                crudOperation: "create",
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.errors["userWorkoutExercises.0"]).toMatch(
        "Cannot provide both strength and cardio sets"
      );
    });

    it("should reject user workout with neither strength nor cardio sets", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(res.body.errors["userWorkoutExercises.0"]).toMatch(
        "At least one user set (strength or cardio) must be provided"
      );
    });

    it("should reject strength set with both weight and body weight", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 10,
                weight: 100, // Has weight
                isBodyWeight: true, // But also body weight - invalid
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(
        res.body.errors["userWorkoutExercises.0.userStrengthSets.0.weight"]
      ).toMatch("Cannot have both weight and body weight set");
    });

    it("should reject strength set with invalid reps", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 0, // Invalid - must be at least 1
                weight: 100,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(
        res.body.errors["userWorkoutExercises.0.userStrengthSets.0.reps"]
      ).toMatch("Reps must be at least 1");
    });

    it("should handle skipped strength sets correctly", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                skippedReason: "Joint pain prevented completion",
                isCompleted: false,
                crudOperation: "create",
                order: 1,
                isJointPain: true,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      expect(res.status).toBe(201);
      const userWorkout: IUserWorkoutDTO = res.body.data;
      expect(
        userWorkout.userWorkoutExercises?.[0].userStrengthSets?.[0]
          .skippedReason
      ).toBe("joint pain prevented completion");
      testUserWorkouts.push(userWorkout);
    });

    it("should reject skipped set with reps provided", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                skippedReason: "Too tired",
                isCompleted: false,
                reps: 10, // Invalid - can't have reps with skipped reason
                crudOperation: "create",
                order: 1,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(
        res.body.errors["userWorkoutExercises.0.userStrengthSets.0.reps"]
      ).toMatch("Reps must not be provided when skippedReason is present");
    });

    it("should reject cardio set with invalid values", async () => {
      const invalidData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[1].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[1].workoutExercises?.[0].id!,
            userCardioSets: [
              {
                workTime: -100, // Invalid - negative time
                avgHeartRate: 300, // Invalid - too high
                avgSpeed: 8.5,
                distance: 4.25,
                caloriesBurned: 320,
                isCompleted: true,
                order: 1,
                crudOperation: "create",
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(invalidData);

      expect(res.status).toBe(400);
      expect(
        res.body.errors["userWorkoutExercises.0.userCardioSets.0.workTime"]
      ).toMatch("Work Time must be at least 0");
      expect(
        res.body.errors["userWorkoutExercises.0.userCardioSets.0.avgHeartRate"]
      ).toMatch("Average Heart Rate cannot exceed 200");
    });

    it("should sanitize HTML in skipped reason", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                skippedReason:
                  "<script>alert('xss')</script>Too <b>tired</b> to continue",
                isCompleted: false,
                crudOperation: "create",
                order: 1,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      expect(res.status).toBe(201);
      const userWorkout: IUserWorkoutDTO = res.body.data;
      const skippedReason =
        userWorkout.userWorkoutExercises?.[0].userStrengthSets?.[0]
          .skippedReason;
      expect(skippedReason).toBe("too tired to continue");
      expect(skippedReason).not.toMatch(/<[^>]*>/);
      testUserWorkouts.push(userWorkout);
    });

    it("should reject user workout with missing credentials", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 10,
                weight: 100,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .send(userWorkoutData);

      expect(res.status).toBe(401);
    });
  });
  describe("GET /api/v1/user-workouts/:userWorkoutId", () => {
    let userWorkoutId: string;
    beforeAll(async () => {
      const userWorkoutData = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 5,
                weight: 50,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const createRes = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);
      userWorkoutId = createRes.body.data.id;
    });

    it("should get a single user-workout by its ID", async () => {
      const res = await request(app)
        .get(`/api/v1/user-workouts/${userWorkoutId}`)
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(userWorkoutId);
      expect(res.body.data.workout.id).toBe(testWorkouts[0].id);
    });

    it("should return 404 if no workout found for the given ID", async () => {
      const res = await request(app)
        .get("/api/v1/user-workouts/nonexistent")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("User Workout not found");
    });

    it("should reject request with missing credentials", async () => {
      const res = await request(app).get(
        `/api/v1/user-workouts/${userWorkoutId}`
      );

      expect(res.status).toBe(401);
    });
  });
  //TODO: Not in use at the moment, will change when create a get route

  // describe("GET /api/v1/user-workouts", () => {
  //   it("should return a list of user workouts", async () => {
  //     const res = await request(app)
  //       .get("/api/v1/user-workouts")
  //       .set("Cookie", `token=${authToken}`);

  //     expect(res.status).toBe(200);
  //     expect(Array.isArray(res.body.data || res.body)).toBe(true);
  //   });

  //   it("should support pagination", async () => {
  //     const res = await request(app)
  //       .get("/api/v1/user-workouts?skip=0&take=2")
  //       .set("Cookie", `token=${authToken}`);

  //     expect(res.status).toBe(200);
  //     const workouts = res.body.data || res.body;
  //     expect(workouts.length).toBeLessThanOrEqual(2);
  //   });
  // });

  //TODO: No Edit Route yes
  // describe("PUT /api/v1/user-workouts/:id", () => {
  //   let userWorkoutToUpdate: IUserWorkoutDTO;

  //   beforeEach(async () => {
  //     const userWorkoutData: IUserWorkoutEditDTO = {
  //       ownerId: testUserId,
  //       workoutId: testWorkouts[0].id,
  //       programId: testPrograms[0].id,
  //       userWorkoutExercises: [
  //         {
  //           workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
  //           userStrengthSets: [
  //             {
  //               reps: 10,
  //               weight: 100,
  //               isBodyWeight: false,
  //               crudOperation: "create",
  //               order: 1,
  //               isCompleted: true,
  //               isJointPain: false,
  //               isMuscleFailure: false,
  //               isWarmup: false,
  //             },
  //           ],
  //         },
  //       ],
  //     };

  //     const res = await request(app)
  //       .post("/api/v1/user-workouts")
  //       .set("Cookie", `token=${authToken}`)
  //       .send(userWorkoutData);

  //     userWorkoutToUpdate = res.body.data;
  //     testUserWorkouts.push(userWorkoutToUpdate);
  //   });

  //   it("should update user workout successfully", async () => {
  //     const updateData = {
  //       dateCompleted: "2025-09-15T10:00:00.000Z",
  //     };

  //     const res = await request(app)
  //       .put(`/api/v1/user-workouts/${userWorkoutToUpdate.id}`)
  //       .set("Cookie", `token=${authToken}`)
  //       .send(updateData);

  //     expect(res.status).toBe(200);
  //     expect(res.body.message).toBe("User-Workout updated successfully");
  //   });

  //   it("should return 404 for updating a non-existent user workout", async () => {
  //     const res = await request(app)
  //       .put("/api/v1/user-workouts/non-existent-id")
  //       .set("Cookie", `token=${authToken}`)
  //       .send({ dateCompleted: "2025-09-15T10:00:00.000Z" });

  //     expect(res.status).toBe(404);
  //   });
  // });

  describe("DELETE /api/v1/user-workouts/:id", () => {
    it("should delete an existing workout", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0].workoutExercises?.[0].id!,
            userStrengthSets: [
              {
                reps: 5,
                weight: 50,
                isBodyWeight: false,
                crudOperation: "create",
                order: 1,
                isCompleted: true,
                isJointPain: false,
                isMuscleFailure: false,
                isWarmup: false,
              },
            ],
          },
        ],
      };

      const createRes = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      const userWorkoutIdToDeleteId = createRes.body.data.id;

      const deleteRes = await request(app)
        .delete(`/api/v1/user-workouts/${userWorkoutIdToDeleteId}`)
        .set("Cookie", `token=${authToken}`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.message).toBe("User Workout deleted successfully");

      const getRes = await request(app)
        .get(`/api/v1/user-workouts/${userWorkoutIdToDeleteId}`)
        .set("Cookie", `token=${authToken}`);

      expect(getRes.status).toBe(404);
    });

    it("should return 404 for deleting a non-existent user-workout", async () => {
      const res = await request(app)
        .delete("/api/v1/user-workouts/non-existent-id")
        .set("Cookie", `token=${authToken}`);

      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
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

    for (const exercise of testStrengthExercises) {
      await request(app)
        .delete(`/api/v1/exercises/${exercise.id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }
    for (const exercise of testCardioExercises) {
      await request(app)
        .delete(`/api/v1/exercises/${exercise.id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }

    for (const id of testPrograms) {
      await request(app)
        .delete(`/api/v1/programs/${id}`)
        .set("Cookie", `token=${authToken}`)
        .catch((err) => {
          console.error(err);
        });
    }

    if (testUserWorkouts.length > 0) {
      for (const id of testUserWorkouts) {
        await request(app)
          .delete(`/api/v1/user-workout/${id}`)
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
