-- CreateEnum
CREATE TYPE "public"."ExerciseMuscle" AS ENUM ('chest', 'front_delts', 'side_delts', 'rear_delts', 'lats', 'traps', 'rhomboids', 'lower_back', 'biceps', 'triceps', 'forearms', 'abs', 'obliques', 'quads', 'hamstrings', 'glutes', 'calves', 'hip_flexors', 'adductors', 'abductors', 'rotator_cuff', 'serratus_anterior');

-- CreateEnum
CREATE TYPE "public"."ExerciseEquipment" AS ENUM ('barbell', 'dumbbell', 'kettlebell', 'weight_plates', 'ez_curl_bar', 'olympic_bar', 'trap_bar', 'medicine_ball', 'flat_bench', 'incline_bench', 'decline_bench', 'adjustable_bench', 'power_rack', 'squat_rack', 'smith_machine', 'preacher_bench', 'cable_machine', 'cable_crossover', 'lat_pulldown', 'low_row', 'cable_column', 'functional_trainer', 'treadmill', 'elliptical', 'stationary_bike', 'rowing_machine', 'stair_climber', 'stepper', 'spin_bike', 'air_bike', 'leg_press', 'hack_squat', 'leg_curl', 'leg_extension', 'calf_raise_machine', 'chest_press_machine', 'shoulder_press_machine', 'pec_deck', 'hip_abduction_machine', 'hip_adduction_machine', 'pull_up_bar', 'dip_station', 'assisted_pull_up_machine', 'captains_chair', 'trx_straps', 'resistance_bands', 'battle_ropes', 'suspension_trainer', 'stability_ball', 'foam_roller', 'yoga_mat', 'gymnastics_rings', 'plyometric_box', 'agility_ladder', 'speed_rope', 'weight_belt', 'lifting_straps', 'chalk', 'gloves', 'wrist_wraps', 'knee_sleeves');

-- CreateEnum
CREATE TYPE "public"."ExerciseType" AS ENUM ('strength', 'cardio', 'flexibility', 'miscellaneous');

-- CreateEnum
CREATE TYPE "public"."DaysOfWeek" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- CreateEnum
CREATE TYPE "public"."MealType" AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "googleId" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "imgUrl" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "type" "public"."ExerciseType" NOT NULL DEFAULT 'strength',
    "notes" TEXT,
    "equipment" "public"."ExerciseEquipment"[],
    "muscles" "public"."ExerciseMuscle"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSet" (
    "id" TEXT NOT NULL,
    "warmupTime" INTEGER,
    "avgHeartRate" INTEGER,
    "workoutExerciseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetCalorieTarget" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "calorieTarget" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetCalorieTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetDistance" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "distance" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetDistance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetAvgSpeed" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "avgSpeed" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetAvgSpeed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreCardioSetWorkoutTime" (
    "id" TEXT NOT NULL,
    "coreCardioSetId" TEXT NOT NULL,
    "workTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreCardioSetWorkoutTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserCardioSet" (
    "id" TEXT NOT NULL,
    "warmupTime" INTEGER DEFAULT 0,
    "workTime" INTEGER,
    "avgHeartRate" INTEGER,
    "avgSpeed" DOUBLE PRECISION,
    "distance" DOUBLE PRECISION,
    "order" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "caloriesBurned" INTEGER,
    "userWorkoutExerciseId" TEXT NOT NULL,
    "skippedReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCardioSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreStrengthSet" (
    "id" TEXT NOT NULL,
    "restTime" INTEGER NOT NULL DEFAULT 60,
    "numberOfSets" INTEGER NOT NULL DEFAULT 1,
    "hasWarmup" BOOLEAN NOT NULL DEFAULT false,
    "workoutExerciseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreStrengthSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreStrengthSetReps" (
    "id" TEXT NOT NULL,
    "coreStrengthSetId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreStrengthSetReps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreStrengthSetWeight" (
    "id" TEXT NOT NULL,
    "coreStrengthSetId" TEXT NOT NULL,
    "isBodyWeight" BOOLEAN NOT NULL DEFAULT false,
    "weight" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoreStrengthSetWeight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserStrengthSet" (
    "id" TEXT NOT NULL,
    "reps" INTEGER,
    "weight" DOUBLE PRECISION,
    "isBodyWeight" BOOLEAN NOT NULL DEFAULT false,
    "restTime" INTEGER NOT NULL DEFAULT 60,
    "order" INTEGER NOT NULL DEFAULT 1,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isWarmup" BOOLEAN NOT NULL DEFAULT false,
    "isMuscleFailure" BOOLEAN NOT NULL DEFAULT false,
    "isJointPain" BOOLEAN NOT NULL DEFAULT false,
    "skippedReason" TEXT,
    "userWorkoutExerciseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserStrengthSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProgramWorkout" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "daysOfWeek" "public"."DaysOfWeek"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT DEFAULT 'New Workout',
    "isTemplate" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WorkoutExercise" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "exerciseId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserWorkoutExercise" (
    "id" TEXT NOT NULL,
    "skippedReason" TEXT,
    "workoutExerciseId" TEXT NOT NULL,
    "userWorkoutId" TEXT NOT NULL,

    CONSTRAINT "UserWorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserWorkout" (
    "id" TEXT NOT NULL,
    "dateCompleted" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "programId" TEXT,
    "workoutId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItem" (
    "id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "servingSize" DOUBLE PRECISION,
    "calories" DOUBLE PRECISION,
    "proteins" DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "sugars" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "saturatedFat" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "salt" DOUBLE PRECISION,
    "cholesterol" DOUBLE PRECISION,
    "brandId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemLabel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemImg" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemBrand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodItemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodItemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "mealType" "public"."MealType" NOT NULL DEFAULT 'breakfast',
    "ownerId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MealFoodItem" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealFoodItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserMeal" (
    "id" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateConsumed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMeal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FoodItemToFoodItemCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodItemToFoodItemCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_FoodItemToFoodItemLabel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodItemToFoodItemLabel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "public"."User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "public"."Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoreCardioSet_workoutExerciseId_key" ON "public"."CoreCardioSet"("workoutExerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "CoreStrengthSet_workoutExerciseId_key" ON "public"."CoreStrengthSet"("workoutExerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramWorkout_programId_workoutId_key" ON "public"."ProgramWorkout"("programId", "workoutId");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_barcode_key" ON "public"."FoodItem"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItem_name_key" ON "public"."FoodItem"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemLabel_name_key" ON "public"."FoodItemLabel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemImg_url_key" ON "public"."FoodItemImg"("url");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemBrand_name_key" ON "public"."FoodItemBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FoodItemCategory_name_key" ON "public"."FoodItemCategory"("name");

-- CreateIndex
CREATE INDEX "_FoodItemToFoodItemCategory_B_index" ON "public"."_FoodItemToFoodItemCategory"("B");

-- CreateIndex
CREATE INDEX "_FoodItemToFoodItemLabel_B_index" ON "public"."_FoodItemToFoodItemLabel"("B");

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSet" ADD CONSTRAINT "CoreCardioSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "public"."WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetCalorieTarget" ADD CONSTRAINT "CoreCardioSetCalorieTarget_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetDistance" ADD CONSTRAINT "CoreCardioSetDistance_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetAvgSpeed" ADD CONSTRAINT "CoreCardioSetAvgSpeed_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreCardioSetWorkoutTime" ADD CONSTRAINT "CoreCardioSetWorkoutTime_coreCardioSetId_fkey" FOREIGN KEY ("coreCardioSetId") REFERENCES "public"."CoreCardioSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCardioSet" ADD CONSTRAINT "UserCardioSet_userWorkoutExerciseId_fkey" FOREIGN KEY ("userWorkoutExerciseId") REFERENCES "public"."UserWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreStrengthSet" ADD CONSTRAINT "CoreStrengthSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "public"."WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreStrengthSetReps" ADD CONSTRAINT "CoreStrengthSetReps_coreStrengthSetId_fkey" FOREIGN KEY ("coreStrengthSetId") REFERENCES "public"."CoreStrengthSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CoreStrengthSetWeight" ADD CONSTRAINT "CoreStrengthSetWeight_coreStrengthSetId_fkey" FOREIGN KEY ("coreStrengthSetId") REFERENCES "public"."CoreStrengthSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserStrengthSet" ADD CONSTRAINT "UserStrengthSet_userWorkoutExerciseId_fkey" FOREIGN KEY ("userWorkoutExerciseId") REFERENCES "public"."UserWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Program" ADD CONSTRAINT "Program_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProgramWorkout" ADD CONSTRAINT "ProgramWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "public"."Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProgramWorkout" ADD CONSTRAINT "ProgramWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Workout" ADD CONSTRAINT "Workout_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "public"."Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkoutExercise" ADD CONSTRAINT "UserWorkoutExercise_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "public"."WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkoutExercise" ADD CONSTRAINT "UserWorkoutExercise_userWorkoutId_fkey" FOREIGN KEY ("userWorkoutId") REFERENCES "public"."UserWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkout" ADD CONSTRAINT "UserWorkout_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkout" ADD CONSTRAINT "UserWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "public"."Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserWorkout" ADD CONSTRAINT "UserWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "public"."Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodItem" ADD CONSTRAINT "FoodItem_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."FoodItemBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodItemImg" ADD CONSTRAINT "FoodItemImg_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Meal" ADD CONSTRAINT "Meal_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealFoodItem" ADD CONSTRAINT "MealFoodItem_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "public"."Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealFoodItem" ADD CONSTRAINT "MealFoodItem_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserMeal" ADD CONSTRAINT "UserMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "public"."Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserMeal" ADD CONSTRAINT "UserMeal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemCategory" ADD CONSTRAINT "_FoodItemToFoodItemCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemCategory" ADD CONSTRAINT "_FoodItemToFoodItemCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FoodItemCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemLabel" ADD CONSTRAINT "_FoodItemToFoodItemLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."FoodItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodItemToFoodItemLabel" ADD CONSTRAINT "_FoodItemToFoodItemLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."FoodItemLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
