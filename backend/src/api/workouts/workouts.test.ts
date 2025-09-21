import request from "supertest";
import { app } from "../../server";
import {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseDTO,
} from "../../../../shared/models/workout.model";
import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { ExerciseType } from "../../../prisma/generated/prisma";

describe("Workouts API", () => {
  let testExercises: IExerciseDTO[] = [];
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
  });

  describe("POST /api/v1/workouts/edit", () => {
    it("should create a new workout successfully", async () => {
      const newWorkout: IWorkoutEditDTO = {
        name: "full body test workout",
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

      createdWorkoutIds.push(workout.id!);
    });

    it("should reject workout with missing required fields", async () => {
      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();

      const errors = res.body.errors;

      expect(errors.name).toBeDefined();
      expect(errors.name).toBe("Workout name is required.");
      expect(errors.workoutExercises).toBeDefined();
      expect(errors.workoutExercises).toBe(
        "Workout need at least one exercise."
      );
    });

    it("should reject workout with invalid workoutExercises", async () => {
      const invalidWorkout: Partial<IWorkoutEditDTO> = {
        name: "Invalid workoutExercises Workout",
        workoutExercises: [
          {
            order: 1,
            exerciseData: {
              type: "WRONG TYPE" as ExerciseType,
              id: "alert(hi)",
            },
          },
        ],
      };

      const res = await request(app)
        .post("/api/v1/workouts/edit")
        .set("Cookie", `token=${authToken}`)
        .send(invalidWorkout);

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();

      const errors = res.body.errors;
      const typeError = errors["workoutExercises.0.exerciseData.type"];
      expect(typeError).toBeDefined();
      expect(typeError).toBe(
        "Invalid type type only strength, cardio, flexibility, miscellaneous are allowed"
      );
    });
  });

  // describe("GET /api/v1/workouts", () => {
  //   it("should return a paginated list of workouts", async () => {
  //     const res = await request(app)
  //       .get("/api/v1/workouts?page=1&take=5")
  //       .set("Cookie", `token=${authToken}`);
  //     expect(res.status).toBe(200);
  //     expect(Array.isArray(res.body)).toBe(true);
  //     expect(res.body.length).toBeLessThanOrEqual(5);
  //   });
  // });

  // describe("GET /api/v1/workouts/:id", () => {
  //   it("should get a workout by its id with all nested data", async () => {
  //     const res = await request(app)
  //       .get(`/api/v1/workouts/${createdWorkoutIds[0]}`)
  //       .set("Cookie", `token=${authToken}`);
  //     expect(res.status).toBe(200);
  //     const workout: IWorkoutDTO = res.body;
  //     expect(workout.id).toBe(createdWorkoutIds[0]);
  //     expect(workout.name).toBe("full body test workout");
  //     expect(workout.workoutExercises).toHaveLength(1);
  //   });

  //   it("should return 404 for a non-existent workout id", async () => {
  //     const res = await request(app)
  //       .get("/api/v1/workouts/non-existent-id")
  //       .set("Cookie", `token=${authToken}`);
  //     expect(res.status).toBe(404);
  //   });
  // });

  // describe("PUT /api/v1/workouts/edit/:id", () => {
  //   let workoutToUpdateId: string;
  //   let originalWorkoutExercises: IWorkoutExerciseDTO[];

  //   beforeEach(async () => {
  //     const workout: IWorkoutEditDTO = {
  //       name: "Workout to be Updated",
  //       notes: "A workout for updating purposes.",
  //       crudOperation: "create",
  //       workoutExercises: [
  //         {
  //           crudOperation: "create",
  //           order: 1,
  //           notes: "Initial exercise str",
  //           exerciseData: {
  //             type: testExercises[1].type!,
  //             id: testExercises[1].id!,
  //           },
  //         },
  //         {
  //           crudOperation: "create",
  //           order: 1,
  //           notes: "Initial exercise car",
  //           exerciseData: {
  //             type: testExercises[0].type!,
  //             id: testExercises[0].id!,
  //           },
  //         },
  //       ],
  //     };

  //     const workoutRes = await request(app)
  //       .post("/api/v1/workouts/edit")
  //       .set("Cookie", `token=${authToken}`)
  //       .send(workout);
  //     workoutToUpdateId = workoutRes.body.data.id;
  //     originalWorkoutExercises = workoutRes.body.data.workoutExercises;

  //     createdWorkoutIds.push(workoutToUpdateId);
  //   });

  //   it("should update top-level fields of a workout", async () => {
  //     const updateFields: IWorkoutEditDTO = {
  //       name: "Updated Workout Name",
  //       notes: "Updated notes.",
  //     };
  //     const res = await request(app)
  //       .put(`/api/v1/workouts/edit/${workoutToUpdateId}`)
  //       .set("Cookie", `token=${authToken}`)
  //       .send(updateFields);

  //     expect(res.status).toBe(200);
  //     expect(res.body.data.name).toBe(updateFields.name?.toLowerCase());
  //     expect(res.body.data.notes).toBe(updateFields.notes?.toLowerCase());
  //   });

  //   it("should perform CRUD operations on workout and nested workoutExercises and coreStrengthSets", async () => {
  //     const x = originalWorkoutExercises.find(
  //       (e) => e.notes === "initial exercise str"
  //     );
  //     const y = originalWorkoutExercises.find(
  //       (e) => e.notes === "initial exercise car"
  //     );
  //     const updatePayload: IWorkoutEditDTO = {
  //       workoutExercises: [
  //         {
  //           id: x?.id,
  //           notes: "Updated CRUD str",
  //           crudOperation: "update",
  //           order: 2,
  //           exerciseData: {
  //             id: testExercises[1].id!,
  //             type: testExercises[1].type!,
  //           },
  //         },
  //         {
  //           id: y?.id!,
  //           notes: "Updated CRUD car",
  //           crudOperation: "update",
  //           order: 2,
  //           exerciseData: {
  //             id: testExercises[0].id!,
  //             type: testExercises[0].type!,
  //           },
  //         },
  //         {
  //           notes: "create exercise notes",
  //           crudOperation: "create",
  //           order: 2,
  //           exerciseData: {
  //             id: testExercises[2].id!,
  //             type: testExercises[2].type!,
  //           },
  //         },
  //       ],
  //     };

  //     const res = await request(app)
  //       .put(`/api/v1/workouts/edit/${workoutToUpdateId}`)
  //       .set("Cookie", `token=${authToken}`)
  //       .send(updatePayload);

  //     expect(res.status).toBe(200);
  //     const updatedWorkout = res.body.data as IWorkoutDTO;

  //     expect(updatedWorkout.id).toBe(workoutToUpdateId);
  //   });

  //   it("should return 400 for updating a non-existent workout", async () => {
  //     const res = await request(app)
  //       .put("/api/v1/workouts/edit/non-existent-id")
  //       .set("Cookie", `token=${authToken}`)
  //       .send({ name: "Doesn't matter" });
  //     expect(res.status).toBe(400);
  //   });
  // });

  // describe("DELETE /api/v1/workouts/:id", () => {
  //   it("should delete an existing workout", async () => {
  //     const workoutToDelete: IWorkoutEditDTO = {
  //       name: "Workout to be Deleted",
  //       crudOperation: "create",
  //       workoutExercises: [
  //         {
  //           order: 1,
  //           crudOperation: "create",
  //           exerciseData: {
  //             id: testExercises[1].id!,
  //             type: testExercises[1].type!,
  //           },
  //         },
  //       ],
  //     };

  //     const workoutRes = await request(app)
  //       .post("/api/v1/workouts/edit")
  //       .set("Cookie", `token=${authToken}`)
  //       .send(workoutToDelete);

  //     const workoutId = workoutRes.body.data.id;

  //     const deleteRes = await request(app)
  //       .delete(`/api/v1/workouts/${workoutId}`)
  //       .set("Cookie", `token=${authToken}`);
  //     expect(deleteRes.status).toBe(200);
  //     expect(deleteRes.body.message).toBe("Workout deleted successfully");

  //     const getRes = await request(app)
  //       .get(`/api/v1/workouts/${workoutId}`)
  //       .set("Cookie", `token=${authToken}`);
  //     expect(getRes.status).toBe(404);
  //   });

  //   it("should return 400 for deleting a non-existent workout", async () => {
  //     const res = await request(app)
  //       .delete("/api/v1/workouts/non-existent-id")
  //       .set("Cookie", `token=${authToken}`);
  //     expect(res.status).toBe(400);
  //   });
  // });

  afterAll(async () => {
    for (const id of createdWorkoutIds) {
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
