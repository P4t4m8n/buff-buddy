import type { IWorkoutDTO } from "../../../shared/models/workout.model";
import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
} from "../../../shared/models/userWorkout";
import { appUtil } from "./app.util";
import { userSetsUtil } from "./userSets.util";

export const workoutStartUtil = {
  workoutDTOToWorkoutStartDTO: (
    workoutDTO?: IWorkoutDTO | null,
    programId?: string,
    lastUserWorkout?: IUserWorkoutDTO | null
  ): IUserWorkoutEditDTO => {
    return {
      id: appUtil.getTempId(),
      dateCompleted: new Date(),
      programId,
      workoutId: workoutDTO?.id,
      workout: {
        id: workoutDTO?.id,
        name: workoutDTO?.name,
        notes: workoutDTO?.notes,
        owner: workoutDTO?.owner,
      },
      workoutExercises: (workoutDTO?.workoutExercises ?? [])?.map((we) => ({
        id: we.id,
        order: we.order,
        notes: we.notes,
        exercise: we.exercise,
        workoutExerciseId: we.id!,
        coreSet: we.coreSet,
        userSets: userSetsUtil.createUserSets(
          we.coreSet?.numberOfSets,
          we.coreSet?.isBodyWeight,
          we.coreSet?.hasWarmup,
          we.coreSet?.weight,
          lastUserWorkout?.workoutExercises.find((ex) => ex.exercise?.id === we.exercise?.id)
            ?.userSets
        ),
      })),
      lastUserWorkout: lastUserWorkout ?? null,
    };
  },
};
