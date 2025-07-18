/* eslint-disable @typescript-eslint/no-unused-vars */
// import type { TDayOfWeek } from "../models/UI.model";
import type { IExerciseDTO } from "../../../shared/models/exercise.model";
// import type { IProgramDTO } from "../../../shared/models/program.model";
// import type { IProgramExerciseDTO } from "../models/programExercise.model";
import type {

  // IWorkoutExerciseDTO,
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../shared/models/workout.model";
import { appUtil } from "./app.util";
// import { userSetsUtil } from "./userSets.util";

export const workoutUtils = {
  getProgramWorkoutByDay: (
    // program: IProgramDTO,
    // day: TDayOfWeek
  ): void => {
    // const workoutExercises = program.workouts
    //   ?.filter((exercise: IProgramExerciseDTO) =>
    //     exercise.daysOfWeek?.includes(day)
    //   )
    //   .map(
    //     (exercise: IProgramExerciseDTO): IWorkoutExerciseDTO => ({
    //       id: appUtil.getTempId(),
    //       exercise: exercise.exercise!,
    //       coreSets: exercise.coreSets.map((coreSet) => ({
    //         coreSet,
    //         userSet: userSetsUtil.getEmpty(coreSet.isBodyWeight, coreSet.id),
    //       })),
    //     })
    //   );

    // return {
    //   id: appUtil.getTempId(),
    //   program: program,
    //   dayOfWeek: day,
    //   workoutExercises: workoutExercises || [],
    // };
  },

  // getWorkoutProperty: <T>(
  //   workout: IOldWorkOut,
  //   property: keyof IExerciseDTO
  // ): T[] => {
  //   return (workout.workoutExercises || [])
  //     .map((exercise) =>
  //       exercise?.exercise ? (exercise.exercise[property] as T[]) : undefined
  //     )
  //     .flat()
  //     .filter((group): group is T => group !== undefined)
  //     .filter((group, index, self) => self.indexOf(group) === index);
  // },
  // dtoToEditDtoOld: (dto: IOldWorkOut): IIOldWorkOutEditDTO => {
  //   return {
  //     id: dto.id,
  //     programId: dto.program.id,
  //     date: new Date(),
  //     workoutSets: (dto?.workoutExercises || [])
  //       .map((exercise) => {
  //         return (exercise.coreSets ?? []).map(({ coreSet, userSet }) => ({
  //           ...userSet,
  //           coreSetId: coreSet.id!,
  //         }));
  //       })
  //       .flat(),
  //   };
  // },

  dtoToEditDto: (dto: IWorkoutDTO): IWorkoutEditDTO => {
    return {
      id: dto.id,
      programId: dto.program?.id,

      userId: dto.user?.id,
      notes: dto.notes,
      workoutExercises: (dto.workoutExercises || []).map((exercise) => ({
        id: exercise.id,
        exerciseId: exercise?.exercise?.id,
        sets: (exercise?.coreSets || []).map(({ coreSet, userSet }) => ({
          ...userSet,
          coreSetId: coreSet.id!,
        })),
      })),
    };
  },
  editDtoToDto: (dto: IWorkoutEditDTO): IWorkoutDTO => {
    return {
      id: dto.id,
    };
  },
  getEmpty: (): IWorkoutEditDTO => {
    return {
      id: appUtil.getTempId(),
      programId: null,
      dateCompleted: null,
      userId: null,
      notes: "",
      workoutExercises: [],
    };
  },
};
