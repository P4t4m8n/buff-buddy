import request from "supertest";
import { app } from "../../server";

import {
  IExerciseDTO,
  IExerciseEditDTO,
} from "../../../../shared/models/exercise.model";
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
import { IEquipment, IMuscle } from "../exercises/exercises.model";

describe("WorkoutPlanner API", () => {
  const testWorkouts: IWorkoutDTO[] = [];
  const testCardioExercises: IExerciseDTO[] = [];
  const testStrengthExercises: IExerciseDTO[] = [];
  const testPrograms: IProgramDTO[] = [];
  const testUserWorkouts: IUserWorkoutDTO[] = [];
  let testUserId: string;
  let authToken: string;
  let workoutTwoId: string | undefined;
  let workoutOneId: string | undefined;
  let muscles: IMuscle[] = [];
  let equipment: IEquipment[] = [];
  const userWorkoutBaseUrl = "/api/v1/user-workouts";
  const userWorkoutEditBaseUrl = userWorkoutBaseUrl + "/edit";
  const baseUrl = "/api/v1/workout-start";

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

    const musclesRes = await request(app)
      .get("/api/v1/exercises/muscles/list")
      .set("Cookie", `token=${authToken}`);
    muscles = musclesRes.body.data;

    const equipmentRes = await request(app)
      .get("/api/v1/exercises/equipment/list")
      .set("Cookie", `token=${authToken}`);
    equipment = equipmentRes.body.data;

    const strengthExercises: IExerciseEditDTO[] = [
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
    ];

    const cardioExercises: IExerciseEditDTO[] = [
      {
        name: "cardio 1",
        youtubeUrl: "https://www.youtube.com/watch?v=_l3ySVKYVJ8",
        type: "cardio",
        equipment: [{ name: "cable_machine", crudOperation: "create" }],
        muscles: [
          { name: "chest", crudOperation: "create" },
          { name: "triceps", crudOperation: "create" },
          { name: "abductors", crudOperation: "create" },
        ],
        ownerId: testUserId,
      },
      {
        name: "cardio 2",
        youtubeUrl: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
        type: "cardio",
        equipment: [{ name: "air_bike", crudOperation: "create" }],
        muscles: [
          { name: "triceps", crudOperation: "create" },
          { name: "abs", crudOperation: "create" },
          { name: "rotator_cuff", crudOperation: "create" },
        ],
        ownerId: testUserId,
      },
    ];

    for (const exercise of strengthExercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      if (exerciseRes.body?.data?.id) {
        testStrengthExercises.push(exerciseRes.body.data);
      }
    }

    const workouts: IWorkoutEditDTO[] = [
      {
        name: "Full Body Test Workout 1",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        ownerId: testUserId,

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
      {
        name: "Full Body Test Workout 2 ",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        ownerId: testUserId,

        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 2",
            exerciseData: {
              type: testStrengthExercises[1].type!,
              id: testStrengthExercises[1].id!,
            },
            crudOperation: "create",
          },
        ],
      },
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

    workoutTwoId = testWorkouts.find(
      (tw) => tw.name === "full body test workout 2"
    )?.id;

    workoutOneId = testWorkouts.find(
      (tw) => tw.name === "full body test workout 1"
    )?.id;
    const newProgram: IProgramEditDTO = {
      name: "My New Lifting Program",
      notes: "3-day split for strength.",
      startDate: "2025-08-01",
      endDate: "2025-10-31",
      ownerId: testUserId,

      isActive: true,
      programWorkouts: [
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: {
            id: workoutOneId,
          },
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: {
            id: workoutTwoId,
          },
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
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
        dateCompleted: new Date("09/17/2025"),
        ownerId: testUserId,
        workoutId: workoutOneId,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId:
              testPrograms?.[0]?.programWorkouts?.find(
                (pw) => pw?.workout?.name === "full body test workout 1"
              )?.workout?.workoutExercises?.[0]?.id ?? "",
            userStrengthSets: [
              {
                reps: 9,
                weight: 5,
                crudOperation: "create",
                order: 1,
              },
              {
                reps: 8,
                weight: 5,
                crudOperation: "create",
                order: 2,
              },
              {
                reps: 7,
                weight: 5,
                crudOperation: "create",
                order: 3,
              },
            ],
          },
        ],
      },
      {
        dateCompleted: new Date("09/18/2025"),
        ownerId: testUserId,
        workoutId: workoutTwoId,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId:
              testPrograms?.[0]?.programWorkouts?.find(
                (pw) => pw?.workout?.name === "full body test workout 2"
              )?.workout?.workoutExercises?.[0]?.id ?? "",
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
                reps: 15,
                weight: 5,
                crudOperation: "create",
                order: 3,
              },
            ],
          },
        ],
      },
      {
        dateCompleted: new Date("09/19/2025"),
        ownerId: testUserId,
        workoutId: workoutTwoId,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId:
              testPrograms?.[0]?.programWorkouts?.find(
                (pw) => pw?.workout?.name === "full body test workout 2"
              )?.workout?.workoutExercises?.[0]?.id ?? "",
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
                reps: 15,
                weight: 5,
                crudOperation: "create",
                order: 3,
              },
            ],
          },
        ],
      },
      {
        dateCompleted: new Date("09/20/2025"),
        ownerId: testUserId,
        workoutId: workoutTwoId,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId:
              testPrograms?.[0]?.programWorkouts?.find(
                (pw) => pw?.workout?.name === "full body test workout 2"
              )?.workout?.workoutExercises?.[0]?.id ?? "",
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
                reps: 15,
                weight: 5,
                crudOperation: "create",
                order: 3,
              },
            ],
          },
        ],
      },
      {
        dateCompleted: new Date("09/21/2025"),
        ownerId: testUserId,
        workoutId: workoutTwoId,
        programId: testPrograms[0].id,
        userWorkoutExercises: [
          {
            workoutExerciseId:
              testPrograms?.[0]?.programWorkouts?.find(
                (pw) => pw?.workout?.name === "full body test workout 2"
              )?.workout?.workoutExercises?.[0]?.id ?? "",
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
                reps: 15,
                weight: 5,
                crudOperation: "create",
                order: 3,
              },
            ],
          },
        ],
      },
    ];

    for (const usw of userWorkouts) {
      const userWorkoutRes = await request(app)
        .post(userWorkoutEditBaseUrl)
        .set("Cookie", `token=${authToken}`)
        .send(usw);
      const workoutData: IUserWorkoutDTO = userWorkoutRes.body.data;
      testUserWorkouts.push(workoutData);
    }
  });

  describe("GET /api/v1/workout-start/:workoutId", () => {
    it(
      "should GET the planed workout start with increased reps",
      async () => {
        const res = await request(app)
          .get(`${baseUrl}/${workoutOneId}`)
          .set("Cookie", `token=${authToken}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(
          "Workout start was successfully planed"
        );

        const userWorkoutRes = res.body.data as IUserWorkoutEditDTO;
        // console.dir(userWorkoutRes, { colors: true, depth: 5 });

        userWorkoutRes?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .forEach((uss, idx) => expect(uss.goalSet?.reps).toBe(10 - idx));
      },
      60 * 60
    );

    it("should GET the planed workout start with increased weight", async () => {
      const workoutId = testWorkouts.find(
        (tw) => tw.name === "full body test workout 2"
      )?.id;
      const res = await request(app)
        .get(`${baseUrl}/${workoutId}`)
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch("Workout start was successfully planed");
      const userWorkoutRes = res.body.data as IUserWorkoutEditDTO;
      userWorkoutRes.userWorkoutExercises?.[0].userStrengthSets
        ?.filter((uss) => !uss.isWarmup)
        .forEach((uss) => {
          expect(uss.goalSet?.reps).toBe(8);
          expect(uss.goalSet?.weight).toBe(5.5);
        });
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
