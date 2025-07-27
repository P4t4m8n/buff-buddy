import type { IWorkoutDTO } from "../../../shared/models/workout.model";
import type { IUserWorkoutDTO } from "../../../shared/models/workoutStart.model";
import { appUtil } from "./app.util";
import { userSetsUtil } from "./userSets.util";

export const workoutStartUtil = {
  workoutDTOToWorkoutStartDTO: (
    workoutDTO: IWorkoutDTO,
    programId?: string
  ): IUserWorkoutDTO => {
    return {
      id: appUtil.getTempId(),
      dateCompleted: new Date(),
      programId,
      workout: {
        id: workoutDTO.id,
        name: workoutDTO.name,
        notes: workoutDTO.notes,
        program: workoutDTO.program,
        owner: workoutDTO.owner,
      },
      owner: null,
      workoutExercises: (workoutDTO.workoutExercises ?? [])?.map((we) => ({
        id: we.id,
        order: we.order,
        notes: we.notes,
        exercise: we.exercise,
        coreSet: we.coreSet,
        userSets: userSetsUtil.createUserSets(
          we.coreSet?.numberOfSets,
          we.coreSet?.isBodyWeight,
          we.coreSet?.hasWarmup,
          we.coreSet?.weight
        ),
      })),
    };
  },
};
