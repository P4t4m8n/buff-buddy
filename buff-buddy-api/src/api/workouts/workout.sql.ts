import { SMALL_USER_SELECT } from "../users/users.sql";

export const WORKOUT_SELECT = {
  id: true,
  name: true,
  notes: true,
  user: {
    select: SMALL_USER_SELECT,
  },
  workoutExercises: {
    select: {
      id: true,
      order: true,
      notes: true,
      exercise: {
        select: {
          id: true,
          youtubeUrl: true,
          name: true,
          types: true,
          muscles: true,
          equipment: true,
        },
      },
      coreSets: {
        select: {
          id: true,
          reps: true,
          weight: true,
          isBodyWeight: true,
          repsInReserve: true,
          restTime: true,
          isWarmup: true,
          isHistory: true,
          order: true,
        },
      },
    },
  },
};
