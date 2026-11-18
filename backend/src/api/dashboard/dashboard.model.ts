import type { DaysOfWeek } from "../../../prisma/generated/prisma";

export interface IDashboardProgram {
  id: string;
  startDate: Date;
  endDate: Date;
  programWorkouts: {
    daysOfWeek: DaysOfWeek[];
    workout: { id: string; name: string | null };
  }[];
}

export interface IDashboardScheduledWorkout {
  programId: string;
  workoutId: string;
  workoutName: string | null;
}

export interface IDashboardUserWorkout {
  dateCompleted: Date;
  workoutId: string | null;
}

export interface IDashboardUserWorkoutDetails {
  dateCompleted: Date;
  userWorkoutExercises: {
    workoutExercise: {
      exercise: { id: string; name: string; muscles: { name: string }[] };
    };
    userStrengthSets: {
      reps: number | null;
      weight: number | null;
      isCompleted: boolean;
    }[];
  }[];
}
