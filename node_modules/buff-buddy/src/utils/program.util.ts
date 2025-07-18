import type {
  IProgramDTO,
  IProgramEditDTO,
} from "../../../shared/models/program.model";

export const programUtils = {
  isProgramActive: ({ startDate, endDate }: Partial<IProgramDTO>) => {
    const today = new Date();

    return (
      startDate &&
      new Date(startDate) <= today &&
      endDate &&
      new Date(endDate) >= today
    );
  },
  filterActivePrograms: (programs: IProgramDTO[]) => {
    return programs.filter(({ startDate, endDate }) =>
      programUtils.isProgramActive({ startDate, endDate })
    );
  },
  dtoToEditDto: (dto: IProgramDTO): IProgramEditDTO => {
    return {
      id: dto.id,
      name: dto.name || "",
      notes: dto.notes || "",
      startDate: dto.startDate ? new Date(dto.startDate) : null,
      endDate: dto.endDate ? new Date(dto.endDate) : null,
      isActive: dto.isActive,
      workouts:
        dto.workouts?.map((workout) => ({
          ...workout,
          daysOfWeek: workout.daysOfWeek || [],
          workoutExercises:
            workout.workoutExercises?.map((ex) => ({
              ...ex,
              notes: ex.notes === null ? undefined : ex.notes,
            })) || [],
        })) || [],
    };
  },
  getEmpty(): IProgramEditDTO {
    return {
      id: "",
      name: "",
      notes: "",
      startDate: null,
      endDate: null,
      isActive: false,
      workouts: [],
    };
  },
};
