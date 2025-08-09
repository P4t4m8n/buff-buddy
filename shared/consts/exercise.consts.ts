export const EXERCISE_INFO = ["types", "equipment", "muscles"] as const;

export const EXERCISE_MUSCLES = [
  // Chest
  "chest",

  // Shoulders
  "front_delts",
  "side_delts",
  "rear_delts",

  // Back
  "lats",
  "traps",
  "rhomboids",
  "lower_back",

  // Arms
  "biceps",
  "triceps",
  "forearms",

  // Core
  "abs",
  "obliques",

  // Legs
  "quads",
  "hamstrings",
  "glutes",
  "calves",
  "hip_flexors",
  "adductors",
  "abductors",

  // Stabilizers
  "rotator_cuff",
  "serratus_anterior",
] as const;

export const EXERCISE_EQUIPMENT = [
  // Free Weights
  "barbell",
  "dumbbell",
  "kettlebell",
  "weight_plates",
  "ez_curl_bar",
  "olympic_bar",
  "trap_bar",
  "medicine_ball",

  // Benches & Racks
  "flat_bench",
  "incline_bench",
  "decline_bench",
  "adjustable_bench",
  "power_rack",
  "squat_rack",
  "smith_machine",
  "preacher_bench",

  // Cable Machines
  "cable_machine",
  "cable_crossover",
  "lat_pulldown",
  "low_row",
  "cable_column",
  "functional_trainer",

  // Cardio Equipment
  "treadmill",
  "elliptical",
  "stationary_bike",
  "rowing_machine",
  "stair_climber",
  "stepper",
  "spin_bike",
  "air_bike",

  // Specialized Machines
  "leg_press",
  "hack_squat",
  "leg_curl",
  "leg_extension",
  "calf_raise_machine",
  "chest_press_machine",
  "shoulder_press_machine",
  "pec_deck",
  "hip_abduction_machine",
  "hip_adduction_machine",

  // Pull-up & Dip Equipment
  "pull_up_bar",
  "dip_station",
  "assisted_pull_up_machine",
  "captains_chair",

  // Functional Training
  "trx_straps",
  "resistance_bands",
  "battle_ropes",
  "suspension_trainer",
  "stability_ball",
  "foam_roller",
  "yoga_mat",

  // Bodyweight/Calisthenics
  "gymnastics_rings",
  "plyometric_box",
  "agility_ladder",
  "speed_rope",

  // Miscellaneous
  "weight_belt",
  "lifting_straps",
  "chalk",
  "gloves",
  "wrist_wraps",
  "knee_sleeves",
] as const;

export const EXERCISE_TYPES = [
  "strength",
  "cardio",
  "flexibility",
  "miscellaneous",
] as const;
