import request from "supertest";
import { app } from "../../server";

import { IExerciseDTO } from "../../../../shared/models/exercise.model";
import {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../../shared/models/program.model";
import {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";
import {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../../shared/models/userWorkout";

describe("WorkoutPlanner API", () => {
  const testWorkouts: IWorkoutDTO[] = [];
  const testCardioExercises: IExerciseDTO[] = [];
  const testStrengthExercises: IExerciseDTO[] = [];
  const testPrograms: IProgramDTO[] = [];
  const testUserWorkouts: IUserWorkoutDTO[] = [];
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
      },
      {
        name: "strength 2",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["biceps", "forearms"],
      },
      {
        name: "strength 3",
        youtubeUrl: "https://www.youtube.com/watch?v=Dy28vbdq2PjcM",
        type: "strength",
        equipment: ["barbell"],
        muscles: ["quads", "glutes", "hamstrings", "lower_back"],
      },
      {
        name: "strength 4",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5gfdv0Oo",
        type: "strength",
        equipment: ["dumbbell"],
        muscles: ["biceps", "forearms"],
      },
    ];

    // const cardioExercises: IExerciseDTO[] = [
    //   {
    //     name: "cardio 1",
    //     youtubeUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
    //     type: "cardio",
    //     equipment: ["cable_machine"],
    //     muscles: ["chest", "triceps", "abductors"],
    //   },
    //   {
    //     name: "cardio 2",
    //     youtubeUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
    //     type: "cardio",
    //     equipment: ["air_bike"],
    //     muscles: ["triceps", "abs", "rotator_cuff"],
    //   },
    // ];

    for (const exercise of strengthExercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      if (exerciseRes.body.data.id) {
        testStrengthExercises.push(exerciseRes.body.data);
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
              type: testStrengthExercises[0].type ?? "strength",
              id: testStrengthExercises[0].id!,
            },
            crudOperation: "create",
            isBodyWeight: true,
            hasWarmup: true,
          },
          // {
          //   order: 2,
          //   notes: "2nd exercise 1",
          //   exerciseData: {
          //     type: testStrengthExercises[1].type ?? "strength",
          //     id: testStrengthExercises[1].id!,
          //   },
          //   crudOperation: "create",
          // },
        ],
      },
      // {
      //   name: "Full Body Test Workout 2 ",
      //   notes: "A workout for testing purposes.",
      //   crudOperation: "create",
      //   workoutExercises: [
      //     {
      //       order: 1,
      //       notes: "First exercise 2",
      //       exerciseData: {
      //         type: testStrengthExercises[3].type!,
      //         id: testStrengthExercises[3].id!,
      //       },
      //       crudOperation: "create",
      //     },
      //     {
      //       order: 2,
      //       notes: "2nd exercise 2",
      //       exerciseData: {
      //         type: testStrengthExercises[1].type!,
      //         id: testStrengthExercises[1].id!,
      //       },
      //       crudOperation: "create",
      //       isBodyWeight: true,
      //       hasWarmup: true,
      //     },
      //   ],
      // },
      // {
      //   name: "Full Body Test Workout 3",
      //   notes: "A workout for testing purposes.",
      //   crudOperation: "create",
      //   workoutExercises: [
      //     {
      //       order: 1,
      //       notes: "First exercise 4",
      //       exerciseData: {
      //         type: testStrengthExercises[3].type!,
      //         id: testStrengthExercises[3].id!,
      //       },
      //       crudOperation: "create",
      //       isBodyWeight: true,
      //       hasWarmup: true,
      //     },
      //     {
      //       order: 2,
      //       notes: "2nd exercise 3",
      //       exerciseData: {
      //         type: testStrengthExercises[2].type!,
      //         id: testStrengthExercises[2].id!,
      //       },
      //       crudOperation: "create",
      //       isBodyWeight: true,
      //       hasWarmup: true,
      //     },
      //   ],
      // },
      // {
      //   name: "Full Body Test Workout 4",
      //   notes: "A workout for testing purposes.",
      //   crudOperation: "create",
      //   workoutExercises: [
      //     {
      //       order: 1,
      //       notes: "First exercise",
      //       exerciseData: {
      //         type: testStrengthExercises[0].type!,
      //         id: testStrengthExercises[0].id!,
      //       },
      //       crudOperation: "create",
      //       isBodyWeight: true,
      //       hasWarmup: true,
      //     },
      //     {
      //       order: 2,
      //       notes: "2nd exercise 4",
      //       exerciseData: {
      //         type: testStrengthExercises[2].type!,
      //         id: testStrengthExercises[2].id!,
      //       },
      //       crudOperation: "create",
      //     },
      //   ],
      // },
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
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
        // {
        //   daysOfWeek: ["monday", "friday"],
        //   crudOperation: "create",
        //   workout: {
        //     id: testWorkouts[1].id,
        //   },
        //   level: "beginner",
        //   workoutGoal: "hypertrophy",
        // },
        // {
        //   daysOfWeek: ["monday", "friday"],
        //   crudOperation: "create",
        //   workout: {
        //     id: testWorkouts[2].id,
        //   },
        //   level: "beginner",
        //   workoutGoal: "hypertrophy",
        // },
        // {
        //   daysOfWeek: ["monday", "friday"],
        //   crudOperation: "create",
        //   workout: {
        //     id: testWorkouts[3].id,
        //   },
        //   level: "beginner",
        //   workoutGoal: "hypertrophy",
        // },
      ],
    };

    const programRes = await request(app)
      .post("/api/v1/programs/edit")
      .set("Cookie", `token=${authToken}`)
      .send(newProgram);

    testPrograms.push(programRes.body.data);

    const userWorkouts: IUserWorkoutEditDTO[] = [
      {
        dateCompleted: new Date(9 / 17 / 25),
        ownerId: testUserId,
        workoutId: testPrograms?.[0]?.programWorkouts?.[0]?.workout?.id,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId:
              testPrograms?.[0]?.programWorkouts?.[0]?.workout
                ?.workoutExercises?.[0].id! ?? "",
            userStrengthSets: [
              {
                reps: 15,
                weight: 5,
                crudOperation: "create",
                order: 1,
              },
              {
                reps: 15,
                weight: 5,
                crudOperation: "create",
                order: 2,
              },
              {
                reps: 3,
                weight: 5,
                crudOperation: "create",
                order: 3,
              },
            ],
          },
        ],
      },
    ];
    // const userWorkouts: IUserWorkoutEditDTO[] = [
    //   {
    //     dateCompleted: new Date(9 / 17 / 25),
    //     ownerId: testUserId,
    //     workoutId: testPrograms?.[0]?.programWorkouts?.[0]?.workout?.id,
    //     programId: testPrograms[0].id,
    //     userWorkoutExercises: [
    //       {
    //         workoutExerciseId:
    //           testWorkouts?.[0].workoutExercises?.[0].id! ?? "",
    //         userStrengthSets: [
    //           {
    //             reps: 5,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 1,
    //           },
    //           {
    //             reps: 4,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 2,
    //           },
    //           {
    //             reps: 3,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 3,
    //           },
    //         ],
    //       },
    //       {
    //         workoutExerciseId:
    //           testWorkouts?.[0].workoutExercises?.[1].id! ?? "",
    //         userStrengthSets: [
    //           {
    //             reps: 9,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 1,
    //           },
    //           {
    //             reps: 8,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 2,
    //           },
    //           {
    //             reps: 7,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 3,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     dateCompleted: new Date(9 / 18 / 25),
    //     ownerId: testUserId,
    //     workoutId: testPrograms?.[0]?.programWorkouts?.[0]?.workout?.id,
    //     programId: testPrograms[0].id,
    //     userWorkoutExercises: [
    //       {
    //         workoutExerciseId:
    //           testWorkouts?.[0].workoutExercises?.[0].id! ?? "",
    //         userStrengthSets: [
    //           {
    //             reps: 6,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 1,
    //           },
    //           {
    //             reps: 5,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 2,
    //           },
    //           {
    //             reps: 4,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 3,
    //           },
    //         ],
    //       },
    //       {
    //         workoutExerciseId:
    //           testWorkouts?.[0].workoutExercises?.[1].id! ?? "",
    //         userStrengthSets: [
    //           {
    //             reps: 9,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 1,
    //           },
    //           {
    //             reps: 8,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 2,
    //           },
    //           {
    //             reps: 7,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 3,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     dateCompleted: new Date(9 / 19 / 25),
    //     ownerId: testUserId,
    //     workoutId: testPrograms?.[0]?.programWorkouts?.[0]?.workout?.id,
    //     programId: testPrograms[0].id,
    //     userWorkoutExercises: [
    //       {
    //         workoutExerciseId:
    //           testWorkouts?.[0].workoutExercises?.[0].id! ?? "",
    //         userStrengthSets: [
    //           {
    //             reps: 8,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 1,
    //           },
    //           {
    //             reps: 7,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 2,
    //           },
    //           {
    //             reps: 7,
    //             weight: 5,
    //             crudOperation: "create",
    //             order: 3,
    //           },
    //         ],
    //       },
    //       {
    //         workoutExerciseId:
    //           testWorkouts?.[0].workoutExercises?.[1].id! ?? "",
    //         userStrengthSets: [
    //           {
    //             reps: 10,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 1,
    //           },
    //           {
    //             reps: 8,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 2,
    //           },
    //           {
    //             reps: 8,
    //             weight: 1,
    //             crudOperation: "create",
    //             order: 3,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ];
    for (const usw of userWorkouts) {
      const userWorkoutRes = await request(app)
        .post("/api/v1/user-workouts")
        .set("Cookie", `token=${authToken}`)
        .send(usw);
      const workoutData: IUserWorkoutDTO = userWorkoutRes.body.data;
      testUserWorkouts.push(workoutData);
    }
  });

  describe("GET /api/v1/workout-start/:workoutId", () => {
    it("should GET the planed workout start", async () => {
      const workoutId =
        testPrograms?.[0]?.programWorkouts?.[0]?.workout?.id ??
        testWorkouts[0].id!;
      const res = await request(app)
        .get(`/api/v1/workout-start/${workoutId}`)
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
    });
  });

  afterAll(async () => {
    if (testPrograms.length > 0) {
      for (const id of testPrograms) {
        await request(app)
          .delete(`/api/v1/programs/${id}`)
          .set("Cookie", `token=${authToken}`)
          .catch((err) => {
            console.error(err);
          });
      }
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
    if (testStrengthExercises.length > 0) {
      for (const exercise of testStrengthExercises) {
        await request(app)
          .delete(`/api/v1/exercises/${exercise.id}`)
          .set("Cookie", `token=${authToken}`)
          .catch((err) => {
            console.error(err);
          });
      }
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
