import type { TDayOfWeek } from "../models/app.model";
import type { IExerciseDTO } from "../models/exercise.model";
import type { IProgramDTO } from "../models/program.model";
import type { IProgramExerciseDTO } from "../models/programExercise.model";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseDTO,
} from "../models/workout.model";
import { appUtil } from "./app.util";
import { userSetsUtil } from "./userSets.util";

export const workoutUtils = {
  getProgramWorkoutByDay: (
    program: IProgramDTO,
    day: TDayOfWeek
  ): IWorkoutDTO => {
    const workoutExercises = program.programExercises
      ?.filter((exercise: IProgramExerciseDTO) =>
        exercise.daysOfWeek?.includes(day)
      )
      .map(
        (exercise: IProgramExerciseDTO): IWorkoutExerciseDTO => ({
          id: appUtil.getTempId(),
          exercise: exercise.exercise!,
          sets: exercise.coreSets.map((coreSet) => ({
            coreSet,
            userSet: userSetsUtil.getEmpty(coreSet.isBodyWeight, coreSet.id),
          })),
        })
      );

    return {
      id: appUtil.getTempId(),
      program: program,
      dayOfWeek: day,
      workoutExercises: workoutExercises || [],
    };
  },

  getWorkoutProperty: <T>(
    workout: IWorkoutDTO,
    property: keyof IExerciseDTO
  ): T[] => {
    return (workout.workoutExercises || [])
      .map((exercise) => exercise.exercise[property] as T[])
      .flat()
      .filter((group, index, self) => self.indexOf(group) === index);
  },
  dtoToEditDto: (dto: IWorkoutDTO): IWorkoutEditDTO => {
    return {
      id: dto.id,
      programId: dto.program.id,
      date: new Date(),
      workoutSets: (dto?.workoutExercises || [])
        .map((exercise) => {
          return exercise.sets.map(({ coreSet, userSet }) => ({
            ...userSet,
            coreSetId: coreSet.id!,
          }));
        })
        .flat(),
    };
  },
};
