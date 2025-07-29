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
} from "../../../../shared/models/workoutStart.model";
import {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../../shared/models/program.model";
import { IUserSetEditDTO } from "../../../../shared/models/set.model";

const getRandomUserSet = (coreSetId?: string): IUserSetEditDTO => {
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
  };
};

describe("UserWorkout API", () => {
  const testWorkouts: IWorkoutDTO[] = [];
  const testExercisesIds: string[] = [];
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
        name: "Push Up",
        youtubeUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
        types: ["strength"],
        equipment: ["body_weight"],
        muscles: ["chest", "triceps", "shoulders"],
      },
      {
        name: "Barbell Squat",
        youtubeUrl: "https://www.youtube.com/watch?v=Dy28eq2PjcM",
        types: ["strength"],
        equipment: ["barbell"],
        muscles: ["quads", "glutes", "hamstrings", "lower_back"],
      },
      {
        name: "Dumbbell Curl",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
        types: ["strength"],
        equipment: ["dumbbell"],
        muscles: ["biceps", "forearms"],
      },
      {
        name: "Plank",
        youtubeUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
        types: ["cardio"],
        equipment: ["body_weight"],
        muscles: ["core", "abs", "shoulders"],
      },
      {
        name: "Deadlift",
        youtubeUrl: "https://www.youtube.com/watch?v=op9kVnSso6Q",
        types: ["strength"],
        equipment: ["barbell"],
        muscles: ["back", "glutes", "hamstrings", "forearms"],
      },
      {
        name: "Kettlebell Swing",
        youtubeUrl: "https://www.youtube.com/watch?v=6u6Qp7LZKwg",
        types: ["cardio", "strength"],
        equipment: ["kettlebell"],
        muscles: ["glutes", "hamstrings", "core"],
      },
      {
        name: "Cable Row",
        youtubeUrl: "https://www.youtube.com/watch?v=GZbfZ033f74",
        types: ["strength"],
        equipment: ["cable"],
        muscles: ["back", "biceps", "forearms"],
      },
      {
        name: "Medicine Ball Slam",
        youtubeUrl: "https://www.youtube.com/watch?v=F5bP6fQFGJw",
        types: ["cardio", "strength"],
        equipment: ["medicine_ball"],
        muscles: ["core", "shoulders", "triceps"],
      },
      {
        name: "Resistance Band Pull Apart",
        youtubeUrl: "https://www.youtube.com/watch?v=QmWf4j6lFzY",
        types: ["strength"],
        equipment: ["resistance_band"],
        muscles: ["upper_back", "shoulders", "traps"],
      },
      {
        name: "Calf Raise",
        youtubeUrl: "https://www.youtube.com/watch?v=YMmgqO8Jo-k",
        types: ["strength"],
        equipment: ["body_weight"],
        muscles: ["calves"],
      },
    ];

    for (const exercise of exercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      testExercisesIds.push(exerciseRes.body.data.id);
    }

    const workouts: IWorkoutEditDTO[] = [
      {
        name: "Full Body Blast",
        notes: "A balanced full body workout.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[0],
            crudOperation: "create",
            coreSet: {
              reps: 12,
              weight: 0,
              numberOfSets: 3,
              isBodyWeight: true,
              restTime: 60,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[1],
            crudOperation: "create",
            coreSet: {
              reps: 10,
              weight: 40,
              numberOfSets: 3,
              isBodyWeight: false,
              restTime: 90,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Upper Body Strength",
        notes: "Focus on chest, shoulders, and arms.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[2],
            crudOperation: "create",
            coreSet: {
              reps: 8,
              weight: 20,
              numberOfSets: 4,
              isBodyWeight: false,
              restTime: 75,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[3],
            crudOperation: "create",
            coreSet: {
              reps: 15,
              weight: 0,
              numberOfSets: 3,
              isBodyWeight: true,
              restTime: 60,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Lower Body Power",
        notes: "Legs and glutes workout.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[4],
            crudOperation: "create",
            coreSet: {
              reps: 10,
              weight: 60,
              numberOfSets: 4,
              isBodyWeight: false,
              restTime: 90,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[5],
            crudOperation: "create",
            coreSet: {
              reps: 20,
              weight: 0,
              numberOfSets: 2,
              isBodyWeight: true,
              restTime: 45,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Core Crusher",
        notes: "Abs and core focused routine.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[6],
            crudOperation: "create",
            coreSet: {
              reps: 30,
              weight: 0,
              numberOfSets: 3,
              isBodyWeight: true,
              restTime: 30,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[7],
            crudOperation: "create",
            coreSet: {
              reps: 20,
              weight: 5,
              numberOfSets: 2,
              isBodyWeight: false,
              restTime: 45,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Cardio Burn",
        notes: "High intensity cardio session.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[8],
            crudOperation: "create",
            coreSet: {
              reps: 25,
              weight: 0,
              numberOfSets: 4,
              isBodyWeight: true,
              restTime: 30,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[9],
            crudOperation: "create",
            coreSet: {
              reps: 15,
              weight: 10,
              numberOfSets: 3,
              isBodyWeight: false,
              restTime: 60,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Back & Biceps",
        notes: "Pulling movements for back and arms.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[1],
            crudOperation: "create",
            coreSet: {
              reps: 12,
              weight: 30,
              numberOfSets: 3,
              isBodyWeight: false,
              restTime: 60,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[0],
            crudOperation: "create",
            coreSet: {
              reps: 10,
              weight: 15,
              numberOfSets: 3,
              isBodyWeight: false,
              restTime: 60,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Chest & Triceps",
        notes: "Push movements for chest and triceps.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[2],
            crudOperation: "create",
            coreSet: {
              reps: 10,
              weight: 0,
              numberOfSets: 4,
              isBodyWeight: true,
              restTime: 45,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[3],
            crudOperation: "create",
            coreSet: {
              reps: 12,
              weight: 20,
              numberOfSets: 3,
              isBodyWeight: false,
              restTime: 60,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Leg Day",
        notes: "Intense lower body workout.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[4],
            crudOperation: "create",
            coreSet: {
              reps: 15,
              weight: 50,
              numberOfSets: 4,
              isBodyWeight: false,
              restTime: 90,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[5],
            crudOperation: "create",
            coreSet: {
              reps: 20,
              weight: 0,
              numberOfSets: 2,
              isBodyWeight: true,
              restTime: 45,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Shoulder Shred",
        notes: "Focus on shoulders and upper back.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[6],
            crudOperation: "create",
            coreSet: {
              reps: 12,
              weight: 10,
              numberOfSets: 3,
              isBodyWeight: false,
              restTime: 60,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[7],
            crudOperation: "create",
            coreSet: {
              reps: 15,
              weight: 5,
              numberOfSets: 2,
              isBodyWeight: false,
              restTime: 45,
              hasWarmup: false,
              crudOperation: "create",
            },
          },
        ],
      },
      {
        name: "Glute Builder",
        notes: "Target glutes and hamstrings.",
        crudOperation: "create",
        workoutExercises: [
          {
            order: 1,
            exerciseId: testExercisesIds[8],
            crudOperation: "create",
            coreSet: {
              reps: 20,
              weight: 0,
              numberOfSets: 3,
              isBodyWeight: true,
              restTime: 60,
              hasWarmup: true,
              crudOperation: "create",
            },
          },
          {
            order: 2,
            exerciseId: testExercisesIds[0],
            crudOperation: "create",
            coreSet: {
              reps: 10,
              weight: 15,
              numberOfSets: 2,
              isBodyWeight: false,
              restTime: 45,
              hasWarmup: false,
              crudOperation: "create",
            },
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
        {
          daysOfWeek: ["wednesday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts[4].id,
          },
        },
        {
          daysOfWeek: ["sunday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts[5].id,
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
        workoutExercises: testWorkouts[0]!.workoutExercises!.map((we) => ({
          workoutExerciseId: we.id!,
          userSets: Array.from({ length: we.coreSet?.numberOfSets || 3 }, () =>
            getRandomUserSet(we.coreSet?.id || "")
          ),
        })),
      };

      const res = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(userWorkoutData);

      expect(res.status).toBe(201);

      const workoutRes: IUserWorkoutDTO = res.body.data;
      expect(workoutRes.program?.id).toBe(userWorkoutData.programId);
      expect(workoutRes.workoutExercises).toHaveLength(
        userWorkoutData.workoutExercises.length
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
            userSets: [
              getRandomUserSet(testWorkouts?.[0]?.workoutExercises?.[0]?.coreSet?.id),
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
            userSets: [
              getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
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
            userSets: [
              getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
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
      const valid = {
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
      expect(res.body.errors.workoutExercises).toBeDefined();
    });

    it("should fail if workoutExercises[].workoutExerciseId is missing", async () => {
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
          {
            userSets: [
              getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
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
        res.body.errors["workoutExercises.0.workoutExerciseId"]
      ).toBeDefined();
    });

    it("should fail if workoutExercises[].userSets is missing", async () => {
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
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
      expect(res.body.errors["workoutExercises.0.userSets"]).toBeDefined();
    });

    it("should fail if userSets[].reps is missing", async () => {
      const invalidSet = {
        ...getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
      };
      delete invalidSet.reps;
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
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
      expect(
        res.body.errors["workoutExercises.0.userSets.0.reps"]
      ).toBeDefined();
    });

    it("should fail if userSets[].weight is negative", async () => {
      const invalidSet = {
        ...getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
        weight: -5,
      };
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
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
      expect(
        res.body.errors["workoutExercises.0.userSets.0.weight"]
      ).toBeDefined();
    });

    it("should fail if userSets[].isBodyWeight=true and weight>0", async () => {
      const invalidSet = {
        ...getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
        isBodyWeight: true,
        weight: 10,
      };
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
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
      expect(
        res.body.errors["workoutExercises.0.userSets.0.weight"]
      ).toBeDefined();
    });

    it("should fail if userSets[].isBodyWeight=false and weight=0", async () => {
      const invalidSet = {
        ...getRandomUserSet(testWorkouts[0]?.workoutExercises?.[0]?.coreSet?.id),
        isBodyWeight: false,
        weight: 0,
      };
      const valid = {
        dateCompleted: new Date(),
        programId: testProgramId,
        ownerId: testUserId,
        workoutId: testWorkouts[0]?.id,
        workoutExercises: [
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
      expect(
        res.body.errors["workoutExercises.0.userSets.0.weight"]
      ).toBeDefined();
    });
  });
  afterAll(async () => {
    for (const { id } of testWorkouts) {
      await request(app)
        .delete(`/api/v1/workouts/${id}`)
        .catch((err) => {
          console.error(err);
        });
    }
    for (const id of testExercisesIds) {
      await request(app)
        .delete(`/api/v1/exercises/${id}`)
        .catch((err) => {
          console.error(err);
        });
    }
    for (const id of testProgramWorkoutsIds) {
      await request(app)
        .delete(`/api/v1/programs/${id}`)
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
