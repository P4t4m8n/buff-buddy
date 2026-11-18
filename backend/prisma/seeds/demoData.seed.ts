import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";

interface SeedSet {
  reps?: number;
  weight?: number;
  order: number;
  isCompleted: boolean;
  isBodyWeight?: boolean;
  isMuscleFailure?: boolean;
  isJointPain?: boolean;
  skippedReason?: string;
}

interface SeedCardioSet {
  workTime?: number;
  avgHeartRate?: number;
  avgSpeed?: number;
  distance?: number;
  caloriesBurned?: number;
  order: number;
  isCompleted: boolean;
}

interface SeedExerciseSets {
  exerciseName: string;
  sets: SeedSet[];
}

interface SeedCardioExerciseSets {
  exerciseName: string;
  sets: SeedCardioSet[];
}

interface SeedSession {
  workoutName: string;
  programName: string;
  dateCompleted: string;
  strengthSets?: SeedExerciseSets[];
  cardioSets?: SeedCardioExerciseSets[];
}

interface SeedWorkoutExercise {
  order: number;
  exerciseName: string;
  notes?: string;
  hasWarmup?: boolean;
  isBodyWeight?: boolean;
  numberOfSets?: number;
  maxNumberOfReps?: number;
  isDropSet?: boolean;
  isMyoReps?: boolean;
  restTime?: number;
}

interface SeedWorkout {
  name: string;
  notes?: string;
  isTemplate?: boolean;
  workoutExercises: SeedWorkoutExercise[];
}

interface SeedProgramWorkout {
  workoutName: string;
  daysOfWeek: string[];
  workoutLevel: string;
  workoutGoal: string;
}

interface SeedProgram {
  name: string;
  notes?: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  programWorkouts: SeedProgramWorkout[];
}

interface SeedUserData {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  workouts: SeedWorkout[];
  programs: SeedProgram[];
  userWorkouts: {
    sessions: SeedSession[];
  }[];
}

async function seedDemoData() {
  console.log("🌱 Starting demo data seed...\n");

  const raw = fs.readFileSync(
    path.join(__dirname, "jsons", "demoData.seed.json"),
    "utf-8"
  );
  const allUsers: SeedUserData[] = JSON.parse(raw);

  // Build exercise name -> id map from DB (shared across users)
  console.log("🔍 Loading exercises from DB...");
  const exercises = await prisma.exercise.findMany({
    select: { id: true, name: true },
  });
  const exerciseMap = new Map(exercises.map((e) => [e.name, e.id]));
  console.log(`  Found ${exercises.length} exercises\n`);

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

  for (const data of allUsers) {
    await seedUser(data, exerciseMap, saltRounds);
  }

  console.log("🎉 Demo data seed complete!");
}

async function seedUser(
  data: SeedUserData,
  exerciseMap: Map<string, string>,
  saltRounds: number
) {
  console.log(`\n${"═".repeat(50)}`);
  console.log(`👤 Seeding user: ${data.user.email}`);
  console.log(`${"═".repeat(50)}\n`);

  const passwordHash = await bcrypt.hash(data.user.password, saltRounds);

  const user = await prisma.user.upsert({
    where: { email: data.user.email },
    update: {},
    create: {
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      passwordHash,
    },
  });
  console.log(`  ✅ User: ${user.email} (id: ${user.id})`);
  console.log(`  🔑 Password: ${data.user.password}\n`);

  // Create workouts
  console.log("🏋️ Creating workouts...");
  const workoutMap = new Map<string, string>();
  const workoutExerciseMap = new Map<string, Map<string, string>>();

  for (const w of data.workouts) {
    const exerciseIds = w.workoutExercises.map((we) => {
      const id = exerciseMap.get(we.exerciseName);
      if (!id) throw new Error(`Exercise not found: "${we.exerciseName}"`);
      return id;
    });

    const workout = await prisma.workout.create({
      data: {
        name: w.name,
        notes: w.notes,
        isTemplate: w.isTemplate ?? false,
        owner: { connect: { id: user.id } },
        workoutExercises: {
          create: w.workoutExercises.map((we, i) => ({
            order: we.order,
            notes: we.notes,
            hasWarmup: we.hasWarmup ?? false,
            isBodyWeight: we.isBodyWeight ?? false,
            numberOfSets: we.numberOfSets,
            maxNumberOfReps: we.maxNumberOfReps,
            isDropSet: we.isDropSet ?? false,
            isMyoReps: we.isMyoReps ?? false,
            restTime: we.restTime ?? 60,
            exercise: { connect: { id: exerciseIds[i] } },
          })),
        },
      },
      include: {
        workoutExercises: {
          select: { id: true, exercise: { select: { name: true } } },
        },
      },
    });

    workoutMap.set(w.name, workout.id);

    const weMap = new Map<string, string>();
    for (const we of workout.workoutExercises) {
      weMap.set(we.exercise.name, we.id);
    }
    workoutExerciseMap.set(w.name, weMap);

    console.log(`  ✅ ${w.name} (${workout.workoutExercises.length} exercises)`);
  }
  console.log();

  // Create programs
  console.log("📋 Creating programs...");
  const programMap = new Map<string, string>();

  for (const p of data.programs) {
    const program = await prisma.program.create({
      data: {
        name: p.name,
        notes: p.notes,
        isActive: p.isActive,
        startDate: new Date(p.startDate),
        endDate: new Date(p.endDate),
        owner: { connect: { id: user.id } },
        programWorkouts: {
          create: p.programWorkouts.map((pw) => {
            const workoutId = workoutMap.get(pw.workoutName);
            if (!workoutId)
              throw new Error(`Workout not found: "${pw.workoutName}"`);
            return {
              daysOfWeek: pw.daysOfWeek as any,
              workoutLevel: pw.workoutLevel as any,
              workoutGoal: pw.workoutGoal as any,
              workout: { connect: { id: workoutId } },
            };
          }),
        },
      },
    });

    programMap.set(p.name, program.id);
    console.log(
      `  ✅ ${p.name} (${p.programWorkouts.length} workouts, active: ${p.isActive})`
    );
  }
  console.log();

  // Create user workout history
  console.log("📊 Creating workout history...");
  let sessionCount = 0;

  for (const uw of data.userWorkouts) {
    for (const session of uw.sessions) {
      const workoutId = workoutMap.get(session.workoutName);
      if (!workoutId)
        throw new Error(`Workout not found: "${session.workoutName}"`);

      const programId = programMap.get(session.programName);
      if (!programId)
        throw new Error(`Program not found: "${session.programName}"`);

      const weMap = workoutExerciseMap.get(session.workoutName);
      if (!weMap)
        throw new Error(
          `WorkoutExercise map not found for: "${session.workoutName}"`
        );

      const userWorkoutExercises: any[] = [];

      // Handle strength sets
      if (session.strengthSets) {
        for (const es of session.strengthSets) {
          const workoutExerciseId = weMap.get(es.exerciseName);
          if (!workoutExerciseId)
            throw new Error(
              `WorkoutExercise not found for exercise "${es.exerciseName}" in workout "${session.workoutName}"`
            );

          userWorkoutExercises.push({
            workoutExercise: { connect: { id: workoutExerciseId } },
            userStrengthSets: {
              create: es.sets.map((s) => ({
                reps: s.reps,
                weight: s.weight,
                order: s.order,
                isCompleted: s.isCompleted ?? true,
                isBodyWeight: s.isBodyWeight ?? false,
                isMuscleFailure: s.isMuscleFailure ?? false,
                isJointPain: s.isJointPain ?? false,
                skippedReason: s.skippedReason ?? null,
              })),
            },
          });
        }
      }

      // Handle cardio sets
      if (session.cardioSets) {
        for (const cs of session.cardioSets) {
          const workoutExerciseId = weMap.get(cs.exerciseName);
          if (!workoutExerciseId)
            throw new Error(
              `WorkoutExercise not found for exercise "${cs.exerciseName}" in workout "${session.workoutName}"`
            );

          userWorkoutExercises.push({
            workoutExercise: { connect: { id: workoutExerciseId } },
            userCardioSets: {
              create: cs.sets.map((s) => ({
                workTime: s.workTime,
                avgHeartRate: s.avgHeartRate,
                avgSpeed: s.avgSpeed,
                distance: s.distance,
                caloriesBurned: s.caloriesBurned,
                order: s.order,
                isCompleted: s.isCompleted ?? true,
              })),
            },
          });
        }
      }

      await prisma.userWorkout.create({
        data: {
          dateCompleted: new Date(session.dateCompleted),
          owner: { connect: { id: user.id } },
          workout: { connect: { id: workoutId } },
          program: { connect: { id: programId } },
          userWorkoutExercises: {
            create: userWorkoutExercises,
          },
        },
      });

      sessionCount++;
    }
  }

  console.log(`  ✅ Created ${sessionCount} workout sessions\n`);

  console.log("─".repeat(40));
  console.log(`  Email:    ${data.user.email}`);
  console.log(`  Password: ${data.user.password}`);
  console.log(`  Workouts: ${data.workouts.length}`);
  console.log(`  Programs: ${data.programs.length}`);
  console.log(`  History:  ${sessionCount} sessions`);
  console.log("─".repeat(40));
}

seedDemoData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
