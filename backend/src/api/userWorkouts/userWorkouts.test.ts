import request from "supertest";
import { app } from "../../server";
import {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";
import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
  IUserWorkoutExercisesEditDTO,
} from "../../../../shared/models/userWorkout";
import {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../../shared/models/program.model";
import {
  ICoreStrengthSetEditDTO,
  IUserStrengthSetEditDTO,
} from "../../../../shared/models/strengthSet.model";
import {
  ICoreCardioSetEditDTO,
  IUserCardioSetEditDTO,
} from "../../../../shared/models/cardioSet.model";

const getRandomCoreStrengthSet = (): ICoreStrengthSetEditDTO => {
  return {
    reps: Math.floor(Math.random() * 15) + 1,
    weight: Math.floor(Math.random() * 100) + 1,
    hasWarmup: Math.random() < 0.5,
    numberOfSets: Math.floor(Math.random() * 5) + 1,
    restTime: Math.floor(Math.random() * 60) + 30, // Random rest time between 30 and 90 seconds
    isBodyWeight: false,
    crudOperation: "create",
  };
};

const getRandomCoreCardioSet = (): ICoreCardioSetEditDTO => {
  return {
    warmupTime: Math.floor(Math.random() * 300) + 60, // Random warmup time between 60 and 360 seconds
    workTime: Math.floor(Math.random() * 300) + 60, // Random work time between 60 and 360 seconds
    avgHeartRate: Math.floor(Math.random() * 50) + 120, // Random average heart rate between 120 and 170 bpm
    avgSpeed: Math.floor(Math.random() * 10) + 1, // Random average speed in km/h
    distance: Math.floor(Math.random() * 5000) + 1000, // Random distance between 1000 and 6000 meters
    calorieTarget: Math.floor(Math.random() * 500) + 100, // Random calorie target between 100 and 600
    crudOperation: "create",
  };
};

const getRandomUserStrengthSet = (
  coreSetId?: string
): IUserStrengthSetEditDTO => {
  const isBodyWeight = Math.random() < 0.5;
  return {
    reps: Math.floor(Math.random() * 15) + 1,
    weight: isBodyWeight ? 0 : Math.floor(Math.random() * 100) + 1,
    isWarmup: Math.random() < 0.5,
    isCompleted: Math.random() < 0.8,
    isMuscleFailure: Math.random() < 0.3,
    isJointPain: Math.random() < 0.2,
    isBodyWeight: isBodyWeight,
    crudOperation: "create",
    coreSetId: coreSetId,
    order: Math.floor(Math.random() * 10) + 1,
  };
};

const getRandomUserCardioSet = (coreSetId: string): IUserCardioSetEditDTO => {
  return {
    workTime: Math.floor(Math.random() * 300) + 60, // Random work time between 60 and 360 seconds
    avgHeartRate: Math.floor(Math.random() * 50) + 120, // Random average heart rate between 120 and 170 bpm
    avgSpeed: Math.floor(Math.random() * 10) + 1, // Random average speed in km/h
    distance: Math.floor(Math.random() * 5000) + 1000, // Random distance between 1000 and 6000 meters
    caloriesBurned: Math.floor(Math.random() * 500) + 100, // Random calories burned between 100 and 600
    isCompleted: Math.random() < 0.8, // Randomly set completion status
    skippedReason: Math.random() < 0.2 ? "Skipped for rest" : null, // Randomly assign a skipped reason
    order: Math.floor(Math.random() * 10) + 1,
    coreSetId: coreSetId,
    programExerciseId: "",
    crudOperation: "create",
  };
};

describe("UserWorkout API", () => {
  const testWorkouts: IWorkoutDTO[] = [];
  const testExercises: IExerciseDTO[] = [];
  let testUserId: string;
  let authToken: string;
  let testProgramWorkoutsIds: string[] = [];

  let testProgramId: string;
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
      if (exerciseRes.body.data.id) {
        testExercises.push(exerciseRes.body.data);
      }
    }

    const workouts: IWorkoutEditDTO[] = [
      {
        name: "Full Body Test Workout 1",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 1",
            exerciseData: {
              type: testExercises[0].type!,
              id: testExercises[0].id!,
            },
            crudOperation: "create",
            coreCardioSet: getRandomCoreCardioSet(),
          },
          {
            order: 2,
            notes: "2nd exercise 1",
            exerciseData: {
              type: testExercises[1].type!,
              id: testExercises[1].id!,
            },
            crudOperation: "create",
            coreStrengthSet: getRandomCoreStrengthSet(),
          },
        ],
      },
      {
        name: "Full Body Test Workout 2 ",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 2",
            exerciseData: {
              type: testExercises[3].type!,
              id: testExercises[3].id!,
            },
            crudOperation: "create",
            coreCardioSet: getRandomCoreCardioSet(),
          },
          {
            order: 2,
            notes: "2nd exercise 2",
            exerciseData: {
              type: testExercises[1].type!,
              id: testExercises[1].id!,
            },
            crudOperation: "create",
            coreStrengthSet: getRandomCoreStrengthSet(),
          },
        ],
      },
      {
        name: "Full Body Test Workout 3",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 4",
            exerciseData: {
              type: testExercises[3].type!,
              id: testExercises[3].id!,
            },
            crudOperation: "create",
            coreCardioSet: getRandomCoreCardioSet(),
          },
          {
            order: 2,
            notes: "2nd exercise 3",
            exerciseData: {
              type: testExercises[2].type!,
              id: testExercises[2].id!,
            },
            crudOperation: "create",
            coreStrengthSet: getRandomCoreStrengthSet(),
          },
        ],
      },
      {
        name: "Full Body Test Workout 4",
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
            coreCardioSet: getRandomCoreCardioSet(),
          },
          {
            order: 2,
            notes: "2nd exercise 4",
            exerciseData: {
              type: testExercises[2].type!,
              id: testExercises[2].id!,
            },
            crudOperation: "create",
            coreStrengthSet: getRandomCoreStrengthSet(),
          },
        ],
      },
    ];

    for (const workout of workouts) {
      const workoutRes = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(workout);
      const workoutData: IWorkoutDTO = workoutRes.body.data;
      testWorkouts.push(workoutData);
    }

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
            id: testWorkouts[0].id,
          },
        },
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts[1].id,
          },
        },
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts[2].id,
          },
        },
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts[3].id,
          },
        },
      ],
    };

    const programRes = await request(app)
      .post("/api/v1/programs/edit")
      .set("Cookie", `token=${authToken}`)
      .send(newProgram);

    const program: IProgramDTO = programRes.body.data;
    testProgramId = program.id!;
    testProgramWorkoutsIds = program.programWorkouts?.map((pw) => pw.id!) ?? [];
  });

  describe("POST /api/v1/user-workouts", () => {
    it("Should create a new user workout successfully", async () => {
      const userWorkoutData: IUserWorkoutEditDTO = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        userWorkoutExercises: testWorkouts[0]!.workoutExercises!.map((we) => {
          const workoutExercise: IUserWorkoutExercisesEditDTO = {
            workoutExerciseId: we.id!,
          };
          if (we.exercise?.type === "cardio") {
            workoutExercise.userCardioSets = Array.from({ length: 1 }, () => {
              return getRandomUserCardioSet(we.coreCardioSet?.id || "");
            });
          } else {
            workoutExercise.userStrengthSets = Array.from(
              { length: we.coreStrengthSet?.numberOfSets || 3 },
              () => getRandomUserStrengthSet(we.coreStrengthSet?.id || "")
            );
          }
          return workoutExercise;
        }),
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      expect(res.status).toBe(201);

      const workoutRes: IUserWorkoutDTO = res.body.data;
      expect(workoutRes.program?.id).toBe(userWorkoutData.programId);
      expect(workoutRes.userWorkoutExercises).toHaveLength(
        userWorkoutData.userWorkoutExercises.length
      );
    });

    it("should fail if dateCompleted is missing", async () => {
      const valid = {
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0].id,
        workoutExercises: [
          {
            workoutExerciseId: testWorkouts[0]?.workoutExercises?.[0]?.id,
            userCardioSets: [
              getRandomUserCardioSet(
                testWorkouts?.[0]?.workoutExercises?.[0]?.coreCardioSet?.id!
              ),
            ],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);
      expect(res.status).toBe(400);
      expect(res.body.errors.dateCompleted).toBeDefined();
    });

    it("should fail if programId is missing", async () => {
      const valid = {
        dateCompleted: new Date(),
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
          {
            workoutExerciseId: testWorkouts[0]?.workoutExercises?.[0]?.id,
            userCardioSets: [
              getRandomUserCardioSet(
                testWorkouts?.[0]?.workoutExercises?.[0]?.coreCardioSet?.id!
              ),
            ],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);
      expect(res.status).toBe(400);
      expect(res.body.errors.programId).toBeDefined();
    });

    it("should fail if workoutId is missing", async () => {
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutExercises: [
          {
            workoutExerciseId: testWorkouts[0]?.workoutExercises?.[0]?.id,
            userCardioSets: [
              getRandomUserCardioSet(
                testWorkouts?.[0]?.workoutExercises?.[0]?.coreCardioSet?.id!
              ),
            ],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);
      expect(res.status).toBe(400);
      expect(res.body.errors.workoutId).toBeDefined();
    });

    it("should fail if workoutExercises is missing", async () => {
      const valid: Partial<IUserWorkoutEditDTO> = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);

      expect(res.status).toBe(400);
      expect(res.body.errors.userWorkoutExercises).toBeDefined();
    });

    it("should fail if workoutExercises[].workoutExerciseId is missing", async () => {
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        userWorkoutExercises: [
          {
            userCardioSets: [
              getRandomUserCardioSet(
                testWorkouts?.[0]?.workoutExercises?.[0]?.coreCardioSet?.id!
              ),
            ],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);

      expect(res.status).toBe(400);
      expect(
        res.body.errors["userWorkoutExercises.0.workoutExerciseId"]
      ).toBeDefined();
    });

    it("should fail if userWorkoutExercises[].userSets is missing", async () => {
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0]?.workoutExercises?.[0]?.id,
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);

      expect(res.status).toBe(400);
      expect(res.body.errors["userWorkoutExercises.0"]).toBeDefined();
    });

    it("should fail if userSets[].reps is missing", async () => {
      const invalidSet = {
        ...getRandomUserCardioSet(
          testWorkouts[0]?.workoutExercises?.[0]?.coreCardioSet?.id!
        ),
      };
      delete invalidSet.avgHeartRate;
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0]?.workoutExercises?.[0]?.id,
            userSets: [invalidSet],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);

      expect(res.status).toBe(400);
      expect(res.body.errors["userWorkoutExercises.0"]).toBeDefined();
    });

    it("should fail if userSets[].weight is negative", async () => {
      const invalidSet = {
        ...getRandomUserStrengthSet(
          testWorkouts[0]?.workoutExercises?.[0]?.coreStrengthSet?.id
        ),
        weight: -5,
      };
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        userWorkoutExercises: [
          {
            workoutExerciseId: testWorkouts[0]?.workoutExercises?.[0]?.id,
            userSets: [invalidSet],
          },
        ],
      };
      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(valid);

      expect(res.status).toBe(400);
      expect(res.body.errors["userWorkoutExercises.0"]).toBeDefined();
    });
  });

  describe("GET /api/v1/user-workouts/:workoutId/last", () => {
    // it("should retrieve the last user workout for a given workout ID", async () => {
    //   const res = await request(app)
    //     .get(`/api/v1/user-workouts/${testWorkouts[0].id}/last`)
    //     .set("Cookie", `token=${authToken}`);
    //   expect(res.status).toBe(200);
    //   expect(res.body.data.workout.id).toBe(testWorkouts[0].id);
    // });
    // it("should return 404 if no workout found for the given ID", async () => {
    //   const res = await request(app)
    //     .get("/api/v1/user-workouts/nonexistent/last")
    //     .set("Cookie", `token=${authToken}`);
    //   expect(res.status).toBe(404);
    //   expect(res.body.message).toBe("No workout found for the given ID");
    // });
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

    if (testProgramWorkoutsIds.length > 0) {
      for (const id of testProgramWorkoutsIds) {
        await request(app)
          .delete(`/api/v1/programs/${id}`)
          .set("Cookie", `token=${authToken}`)
          .catch((err) => {
            console.error(err);
          });
      }
    }

    if (testProgramId) {
      await request(app)
        .delete(`/api/v1/programs/${testProgramId}`)
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
