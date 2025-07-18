export const programSelect = {
  id: true,
  name: true,
  notes: true,
  isActive: true,
  startDate: true,
  endDate: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
  owner: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
  programWorkouts: {
    select: {
      daysOfWeek: true,
      workout: {
        select: {
          id: true,
          name: true,
          notes: true,
          workoutExercises: {
            select: {
              id: true,
              order: true,
              notes: true,
              exercise: {
                select: {
                  id: true,
                  name: true,
                  youtubeUrl: true,
                  types: true,
                  equipment: true,
                  muscles: true,
                },
              },
              coreSets: {
                select: {
                  id: true,
                  reps: true,
                  weight: true,
                  restTime: true,
                  isBodyWeight: true,
                  order: true,
                  isWarmup: true,
                  repsInReserve: true,
                  isHistory: true,
                },
              },
            },
          },
        },
      },
    },
  },
};
