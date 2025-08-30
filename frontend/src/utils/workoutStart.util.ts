import type { IWorkoutDTO } from "../../../shared/models/workout.model";
import type {
  IUserWorkoutDTO,
  IUserWorkoutEditDTO,
  IUserWorkoutExercisesEditDTO,
} from "../../../shared/models/userWorkout";
import { appUtil } from "./app.util";
import { userSetsUtil } from "./userSets.util";

export const workoutStartUtil = {
  workoutDTOToWorkoutStartDTO: (
    workoutDTO?: IWorkoutDTO | null,
    programId?: string,
    lastUserWorkout?: IUserWorkoutDTO | null,
    ownerId?: string 
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
      ownerId: ownerId ,
      userWorkoutExercises: (workoutDTO?.workoutExercises ?? [])?.map((we) => {
        const item: IUserWorkoutExercisesEditDTO = {
          id: we.id,
          order: we.order,
          notes: we.notes,
          exercise: we.exercise,
          workoutExerciseId: we.id!,
        };
        const type = we.exercise?.type;

        if (type === "strength") {
          const lastUserSet = lastUserWorkout?.userWorkoutExercises?.find(
            (lastWe) => {
              return lastWe.exercise?.id === we.exercise?.id;
            }
          )?.userStrengthSets;
          item.coreStrengthSet = we.coreStrengthSet;
          item.userStrengthSets = userSetsUtil.createUserStrengthSets(
            we.coreStrengthSet!,
            lastUserSet
          );
        } else if (type === "cardio") {
          const lastUserSet = lastUserWorkout?.userWorkoutExercises?.find(
            (lastWe) => lastWe.exercise?.id === we.exercise?.id
          )?.userCardioSets;
          item.coreCardioSet = we.coreCardioSet;
          item.userCardioSets = userSetsUtil.createUserCardioSets(
            1,
            lastUserSet
          );
        }
        return item;
      }),
      lastUserWorkout: lastUserWorkout ?? null,
    };
  },
};
