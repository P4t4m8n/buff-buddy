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
import testUtil from "../../shared/utils/test.util";

const STRENGTH_EXERCISE_NAMES = [
  "strength 1",
  "strength 2",
  "strength is compounded",
  "strength is separateHands",
] as const;

type TStrengthExerciseNames = (typeof STRENGTH_EXERCISE_NAMES)[number];

const WORKOUT_NAMES = [
  "workout for default get",
  "workout for reps",
  "workout for weight",
] as const;

type TWorkoutNames = (typeof WORKOUT_NAMES)[number];

describe("WorkoutPlanner API", () => {
  const testWorkouts: Record<TWorkoutNames, IWorkoutDTO> = {} as Record<
    TWorkoutNames,
    IWorkoutDTO
  >;
  const testStrengthExercises: Record<TStrengthExerciseNames, IExerciseDTO> =
    {} as Record<TStrengthExerciseNames, IExerciseDTO>;

  const testPrograms: IProgramDTO[] = [];
  const testUserWorkouts: IUserWorkoutDTO[] = [];

  let testUserId: string;
  let authToken: string;

  let muscles: IMuscle[] = [];
  let equipment: IEquipment[] = [];

  const userWorkoutBaseUrl = "/api/v1/user-workouts";
  const userWorkoutEditBaseUrl = userWorkoutBaseUrl + "/edit";
  const baseUrl = "/api/v1/workout-start";

  beforeAll(async () => {
    const userCredentials = testUtil.getUserCredentials({
      testName: "userWorkout",
    });
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
      {
        name: "strength is Compounded",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZ5yhOo",
        type: "strength",
        equipment: equipment.sort(() => 0.5 - Math.random()).slice(0, 1),
        muscles: muscles.sort(() => 0.5 - Math.random()).slice(0, 2),
        ownerId: testUserId,
        isCompounded: true,
      },
      {
        name: "strength is SeparateHands",
        youtubeUrl: "https://www.youtube.com/watch?v=ykJmrZfg0Oo",
        type: "strength",
        equipment: equipment.sort(() => 0.5 - Math.random()).slice(0, 1),
        muscles: muscles.sort(() => 0.5 - Math.random()).slice(0, 2),
        ownerId: testUserId,
        isSeparateHands: true,
      },
    ];

    for (const exercise of strengthExercises) {
      const exerciseRes = await request(app)
        .post("/api/v1/exercises/edit")
        .set("Cookie", `token=${authToken}`)
        .send(exercise);
      const exerciseData: IExerciseDTO = exerciseRes.body.data;
      if (exerciseData.id) {
        testStrengthExercises[exerciseData.name as TStrengthExerciseNames] =
          exerciseData;
      }
    }

    const workouts: IWorkoutEditDTO[] = [
      {
        name: "workout for default get",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        isTemplate: true,
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 1",
            exerciseData: {
              type: testStrengthExercises["strength 1"]?.type ?? "strength",
              id: testStrengthExercises["strength 1"]?.id!,
            },
            crudOperation: "create",
            isBodyWeight: false,
            hasWarmup: true,
            numberOfSets: 3,
          },
        ],
      },
      {
        name: "workout for reps",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 2",
            exerciseData: {
              type: testStrengthExercises["strength 2"].type!,
              id: testStrengthExercises["strength 2"].id!,
            },
            crudOperation: "create",
            isBodyWeight: false,
            hasWarmup: false,
            numberOfSets: 3,
          },
        ],
      },
      {
        name: "workout for weight",
        notes: "A workout for testing purposes.",
        crudOperation: "create",
        ownerId: testUserId,
        workoutExercises: [
          {
            order: 1,
            notes: "First exercise 3",
            exerciseData: {
              type: testStrengthExercises["strength is compounded"].type!,
              id: testStrengthExercises["strength is compounded"].id!,
            },
            crudOperation: "create",
            isBodyWeight: false,
            hasWarmup: false,
            numberOfSets: 3,
            maxNumberOfReps: 10,
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
      testWorkouts[workoutData.name as TWorkoutNames] = workoutData;
    }

    const newProgram: IProgramEditDTO = {
      name: "test program 1",
      notes: "A program for testing purposes.",
      startDate: "2025-08-01",
      endDate: "2025-10-31",
      ownerId: testUserId,
      isActive: true,
      programWorkouts: [
        {
          daysOfWeek: ["monday", "friday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts["workout for default get"].id,
          },
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
        {
          daysOfWeek: ["sunday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts["workout for reps"].id,
          },
          workoutLevel: "beginner",
          workoutGoal: "hypertrophy",
        },
        {
          daysOfWeek: ["tuesday"],
          crudOperation: "create",
          workout: {
            id: testWorkouts["workout for weight"].id,
          },
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

  describe("GET /api/v1/workout-start/:workoutId", () => {
    it("should GET the default workout start", async () => {
      const res = await request(app)
        .get(`${baseUrl}/${testWorkouts["workout for default get"].id}`)
        .set("Cookie", `token=${authToken}`);
      expect(res.status).toBe(200);
      const userWorkout: IUserWorkoutEditDTO = res.body.data;
      const { userWorkoutExercises } = userWorkout;
      const is8Reps = userWorkoutExercises?.every((uwe) =>
        uwe.userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          ?.every((uss) => uss.goalSet?.reps === 8)
      );
      expect(is8Reps).toBe(true);

      const is0Weight = userWorkoutExercises?.every((uwe) =>
        uwe.userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .every((uss) => uss.goalSet?.weight === 0.5)
      );
      expect(is0Weight).toBe(true);

      expect(
        userWorkoutExercises?.some((uwe) =>
          uwe.userStrengthSets?.some((uss) => uss.isWarmup)
        )
      ).toBe(true);
    });

    it(
      "should GET the planed workout start with increased reps",
      async () => {
        //Get default workout start
        const workoutStartDefaultRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for reps"].id}`)
          .set("Cookie", `token=${authToken}`);

        const workoutStartDefault = workoutStartDefaultRes.body
          .data as IUserWorkoutEditDTO;
        const workoutStartDefaultEdit: IUserWorkoutEditDTO = {
          ...workoutStartDefault,
          userWorkoutExercises: workoutStartDefault?.userWorkoutExercises?.map(
            (uwe) => {
              return {
                ...uwe,
                workoutExerciseId: uwe.workoutExerciseId,
                userStrengthSets: uwe.userStrengthSets
                  ?.filter((uss) => !uss.isWarmup)
                  .sort((a, b) => (a.order! < b.order! ? -1 : 1))
                  .map((uss, idx) => {
                    return {
                      ...uss,
                      crudOperation: "create",
                      reps: 10 - idx,
                      weight: 5.5,
                      isCompleted: true,
                    };
                  }),
              };
            }
          ),
        };

        //Create a new workout-start with data
        await request(app)
          .post(userWorkoutEditBaseUrl)
          .set("Cookie", `token=${authToken}`)
          .send(workoutStartDefaultEdit);

        //Get the workout start with previous data first check of increase reps
        const updatedWorkoutStartRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for reps"].id}`)
          .set("Cookie", `token=${authToken}`);

        expect(updatedWorkoutStartRes.status).toBe(200);
        expect(updatedWorkoutStartRes.body.message).toMatch(
          "Workout start was successfully planed"
        );
        debugger;

        const updatedWorkoutStart = updatedWorkoutStartRes.body
          .data as IUserWorkoutEditDTO;

        updatedWorkoutStart?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .forEach((uss, idx) => expect(uss.goalSet?.reps).toBe(11 - idx));

        const workoutStartPlannedEdit: IUserWorkoutEditDTO = {
          ...updatedWorkoutStart,
          userWorkoutExercises: updatedWorkoutStart?.userWorkoutExercises?.map(
            (uwe) => {
              return {
                ...uwe,
                workoutExerciseId: uwe.workoutExerciseId,
                userStrengthSets: uwe.userStrengthSets
                  ?.filter((uss) => !uss.isWarmup)
                  .sort((a, b) => (a.order! < b.order! ? -1 : 1))
                  .map((uss, idx) => {
                    return {
                      ...uss,
                      crudOperation: "create",
                      reps: uss?.goalSet?.reps ?? 0,
                      weight: 5.5,
                      isCompleted: true,
                    };
                  }),
              };
            }
          ),
        };

        await request(app)
          .post(userWorkoutEditBaseUrl)
          .set("Cookie", `token=${authToken}`)
          .send(workoutStartPlannedEdit);

        const updatedWorkoutStartPlannedRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for reps"].id}`)
          .set("Cookie", `token=${authToken}`);

        const updatedWorkoutStartPlanned = updatedWorkoutStartPlannedRes.body
          .data as IUserWorkoutEditDTO;

        updatedWorkoutStartPlanned?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .forEach((uss, idx) => expect(uss.goalSet?.reps).toBe(12 - idx));

        const workoutStart2ndPlannedEdit: IUserWorkoutEditDTO = {
          ...updatedWorkoutStartPlanned,
          userWorkoutExercises:
            updatedWorkoutStartPlanned?.userWorkoutExercises?.map((uwe) => {
              return {
                ...uwe,
                workoutExerciseId: uwe.workoutExerciseId,
                userStrengthSets: uwe.userStrengthSets
                  ?.filter((uss) => !uss.isWarmup)
                  .sort((a, b) => (a.order! < b.order! ? -1 : 1))
                  .map((uss, idx) => {
                    return {
                      ...uss,
                      crudOperation: "create",
                      reps: 15 - (idx > 1 ? 1 : 0),
                      weight: 5.5,
                      isCompleted: true,
                    };
                  }),
              };
            }),
        };

        await request(app)
          .post(userWorkoutEditBaseUrl)
          .set("Cookie", `token=${authToken}`)
          .send(workoutStart2ndPlannedEdit);

        const updatedWorkoutStart2ndPlannedRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for reps"].id}`)
          .set("Cookie", `token=${authToken}`);

        const updatedWorkoutStart2ndPlanned = updatedWorkoutStart2ndPlannedRes
          .body.data as IUserWorkoutEditDTO;

        updatedWorkoutStart2ndPlanned?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .forEach((uss, idx) => expect(uss.goalSet?.reps).toBe(15));
      },
      60 * 60 * 1000
    );

    it(
      "should GET the planed workout start with increased weight",
      async () => {
        //Get default workout start

        const x = await logStrengthIncrease(
          baseUrl,
          testWorkouts["workout for weight"].id!,
          authToken,
          userWorkoutEditBaseUrl,
          5
        );
        //Get the workout start with previous data first check of increase reps
        const updatedWorkoutStartRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for weight"].id}`)
          .set("Cookie", `token=${authToken}`);

        expect(updatedWorkoutStartRes.status).toBe(200);
        expect(updatedWorkoutStartRes.body.message).toMatch(
          "Workout start was successfully planed"
        );

        const updatedWorkoutStart = updatedWorkoutStartRes.body
          .data as IUserWorkoutEditDTO;

        updatedWorkoutStart?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .forEach((uss) => expect(uss.goalSet?.weight).toBe(5.5));
        //END OF FIRST PART

        const y = await logStrengthIncrease(
          baseUrl,
          testWorkouts["workout for weight"].id!,
          authToken,
          userWorkoutEditBaseUrl,
          5.5
        );
        debugger;

        const updatedWorkoutStartPlannedRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for weight"].id}`)
          .set("Cookie", `token=${authToken}`);

        const updatedWorkoutStartPlanned = updatedWorkoutStartPlannedRes.body
          .data as IUserWorkoutEditDTO;

        updatedWorkoutStartPlanned?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .forEach((uss, idx) => expect(uss.goalSet?.weight).toBe(6));

        //END OF SECOND PART

        await logStrengthIncrease(
          baseUrl,
          testWorkouts["workout for weight"].id!,
          authToken,
          userWorkoutEditBaseUrl,
          7
        );

        const updatedWorkoutStart2ndPlannedRes = await request(app)
          .get(`${baseUrl}/${testWorkouts["workout for weight"].id}`)
          .set("Cookie", `token=${authToken}`);

        const updatedWorkoutStart2ndPlanned = updatedWorkoutStart2ndPlannedRes
          .body.data as IUserWorkoutEditDTO;

        updatedWorkoutStart2ndPlanned?.userWorkoutExercises?.[0].userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .forEach((uss, idx) => expect(uss.goalSet?.weight).toBe(7.5));
      },
      60 * 60 * 1000
    );
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

    if (testWorkouts) {
      for (const workout of Object.values(testWorkouts)) {
        await request(app)
          .delete(`/api/v1/workouts/${workout.id}`)
          .set("Cookie", `token=${authToken}`)
          .catch((err) => {
            console.error(err);
          });
      }
    }

    if (testStrengthExercises) {
      for (const exercise of Object.values(testStrengthExercises)) {
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
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const logStrengthIncrease = async (
  baseUrl: string,
  workoutId: string,
  authToken: string,
  userWorkoutEditBaseUrl: string,
  weight: number
) => {
  const results: IUserWorkoutEditDTO[] = [];

  for (let i = 0; i < 3; i++) {
    const res = await logStrengthIncreaseItem(
      baseUrl,
      workoutId,
      authToken,
      userWorkoutEditBaseUrl,
      weight
    );
    results.push(res);
    await sleep(100);
  }

  return results;
};

const logStrengthIncreaseItem = async (
  baseUrl: string,
  workoutId: string,
  authToken: string,
  userWorkoutEditBaseUrl: string,
  weight: number
): Promise<IUserWorkoutEditDTO> => {
  const userWorkout: IUserWorkoutEditDTO = await request(app)
    .get(`${baseUrl}/${workoutId}`)
    .set("Cookie", `token=${authToken}`)
    .then((res) => res.body.data);

  const updatedUserWorkout: IUserWorkoutEditDTO = {
    ...userWorkout,
    userWorkoutExercises: userWorkout?.userWorkoutExercises?.map((uwe) => {
      return {
        ...uwe,
        workoutExerciseId: uwe.workoutExerciseId,
        userStrengthSets: uwe.userStrengthSets
          ?.filter((uss) => !uss.isWarmup)
          .sort((a, b) => (a.order! < b.order! ? -1 : 1))
          .map((uss, idx) => {
            return {
              ...uss,
              crudOperation: "create",
              reps: 10,
              weight,
              isCompleted: true,
            };
          }),
      };
    }),
  };

  return await request(app)
    .post(userWorkoutEditBaseUrl)
    .set("Cookie", `token=${authToken}`)
    .send(updatedUserWorkout)
    .then((res) => res.body.data);
};
