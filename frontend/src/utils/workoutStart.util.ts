import type { IWorkoutDTO } from "../../../shared/models/workout.model";
import type { IWorkoutStartDTO } from "../../../shared/models/workoutStart.model";
import { userSetsUtil } from "./userSets.util";

export const workoutStartUtil = {
  workoutDTOToWorkoutStartDTO: (workoutDTO: IWorkoutDTO): IWorkoutStartDTO => {
    return {
      dateCompleted: null,
      workout: {
        id: workoutDTO.id,
        name: workoutDTO.name,
        notes: workoutDTO.notes,
        program: workoutDTO.program,
        owner: workoutDTO.owner,
      },
      owner: null,
      workoutExercises: (workoutDTO.workoutExercises ?? [])?.map((we) => ({
        order: we.order,
        notes: we.notes,
        exercise: we.exercise,
        coreSets: we.coreSets,
        userSets: Array.from({ length: we.coreSets?.numberOfSets ?? 1 }).map(
          () => userSetsUtil.getEmpty(we.coreSets?.isBodyWeight)
        ),
      })),
    };
  },
};
