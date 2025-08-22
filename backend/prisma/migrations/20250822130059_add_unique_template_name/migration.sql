CREATE UNIQUE INDEX
IF NOT EXISTS uniq_workout_name_template
ON "Workout"
(name)
WHERE "isTemplate" = true AND name IS NOT NULL;