/*
  Warnings:

  - The values [body_weight,cable,none,resistance_band] on the enum `ExerciseEquipment` will be removed. If these variants are still used in the database, this will fail.
  - The values [back,core,neck,shoulders,shins,upper_back] on the enum `ExerciseMuscle` will be removed. If these variants are still used in the database, this will fail.
  - The values [balance] on the enum `ExerciseType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."MuscleGroup" AS ENUM ('CHEST', 'SHOULDERS', 'BACK', 'ARMS', 'CORE', 'LEGS', 'STABILIZERS');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ExerciseEquipment_new" AS ENUM ('barbell', 'dumbbell', 'kettlebell', 'weight_plates', 'ez_curl_bar', 'olympic_bar', 'trap_bar', 'medicine_ball', 'flat_bench', 'incline_bench', 'decline_bench', 'adjustable_bench', 'power_rack', 'squat_rack', 'smith_machine', 'preacher_bench', 'cable_machine', 'cable_crossover', 'lat_pulldown', 'low_row', 'cable_column', 'functional_trainer', 'treadmill', 'elliptical', 'stationary_bike', 'rowing_machine', 'stair_climber', 'stepper', 'spin_bike', 'air_bike', 'leg_press', 'hack_squat', 'leg_curl', 'leg_extension', 'calf_raise_machine', 'chest_press_machine', 'shoulder_press_machine', 'pec_deck', 'hip_abduction_machine', 'hip_adduction_machine', 'pull_up_bar', 'dip_station', 'assisted_pull_up_machine', 'captains_chair', 'trx_straps', 'resistance_bands', 'battle_ropes', 'suspension_trainer', 'stability_ball', 'foam_roller', 'yoga_mat', 'gymnastics_rings', 'plyometric_box', 'agility_ladder', 'speed_rope', 'weight_belt', 'lifting_straps', 'chalk', 'gloves', 'wrist_wraps', 'knee_sleeves');
ALTER TABLE "public"."Exercise" ALTER COLUMN "equipment" TYPE "public"."ExerciseEquipment_new"[] USING ("equipment"::text::"public"."ExerciseEquipment_new"[]);
ALTER TYPE "public"."ExerciseEquipment" RENAME TO "ExerciseEquipment_old";
ALTER TYPE "public"."ExerciseEquipment_new" RENAME TO "ExerciseEquipment";
DROP TYPE "public"."ExerciseEquipment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ExerciseMuscle_new" AS ENUM ('chest', 'front_delts', 'side_delts', 'rear_delts', 'lats', 'traps', 'rhomboids', 'lower_back', 'biceps', 'triceps', 'forearms', 'abs', 'obliques', 'quads', 'hamstrings', 'glutes', 'calves', 'hip_flexors', 'adductors', 'abductors', 'rotator_cuff', 'serratus_anterior');
ALTER TABLE "public"."Exercise" ALTER COLUMN "muscles" TYPE "public"."ExerciseMuscle_new"[] USING ("muscles"::text::"public"."ExerciseMuscle_new"[]);
ALTER TYPE "public"."ExerciseMuscle" RENAME TO "ExerciseMuscle_old";
ALTER TYPE "public"."ExerciseMuscle_new" RENAME TO "ExerciseMuscle";
DROP TYPE "public"."ExerciseMuscle_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ExerciseType_new" AS ENUM ('strength', 'cardio', 'flexibility', 'miscellaneous');
ALTER TABLE "public"."Exercise" ALTER COLUMN "types" TYPE "public"."ExerciseType_new"[] USING ("types"::text::"public"."ExerciseType_new"[]);
ALTER TYPE "public"."ExerciseType" RENAME TO "ExerciseType_old";
ALTER TYPE "public"."ExerciseType_new" RENAME TO "ExerciseType";
DROP TYPE "public"."ExerciseType_old";
COMMIT;
