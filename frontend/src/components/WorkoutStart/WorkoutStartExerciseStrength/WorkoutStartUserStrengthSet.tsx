import GenericModel from "../../UI/GenericModel";

import type { IUserStrengthSetEditDTO } from "../../../../../shared/models/userStrengthSet.model";
import type { TWorkoutStartUserSetsProps } from "../../../models/workoutStart.model";
import WorkoutStartUserStrengthSetLog, {
  type IWorkoutStartUserStrengthSetLogProps,
} from "./WorkoutStartUserStrengthSetLog";
import IconCheckMark from "../../UI/Icons/IconCheckMark";
import IconInactive from "../../UI/Icons/IconInactive";
import IconSkip from "../../UI/Icons/IconSkip";

export default function WorkoutStartUserStrengthSet({
  item: userSet,
  errors: serverErrors,
}: TWorkoutStartUserSetsProps<IUserStrengthSetEditDTO>) {
  const { isWarmup, goalSet, isCompleted, skippedReason } = userSet ?? {};

  if (isCompleted) {
  }
  const { reps: goalReps, weight: goalWeight } = goalSet ?? {};

  return (
    <li className="flex justify-between h-16 items-center">
      <h4>{isWarmup ? "Warmup" : "Work Set"}:</h4>
      <div className="flex  gap-4">
        <span className="flex flex-col items-center">
          <h5 className="text-sm">Reps</h5>
          <p className="border rounded  w-9 aspect-square flex-center">
            {goalReps}
          </p>
        </span>
        <span className="flex flex-col items-center">
          <h5 className="text-sm">Weight</h5>
          <p className="border rounded  w-9  aspect-square flex-center">
            {goalWeight || "BW"}
          </p>
        </span>
        <div className="grid justify-items-center text-sm ">
          <h5>Status</h5>
          {skippedReason ? (
            <IconSkip className="w-6 aspect-square fill-warning-yellow" />
          ) : isCompleted ? (
            <IconCheckMark className="w-6 aspect-square fill-success-green" />
          ) : (
            <IconInactive className="w-6 aspect-square fill-error-red" />
          )}
        </div>
      </div>
      {isWarmup ? (
        <div className="w-16"></div>
      ) : (
        <GenericModel<HTMLDivElement, IWorkoutStartUserStrengthSetLogProps>
          buttonProps={{
            buttonStyle: "save",
            children: "Log",
            className: " h-full",
          }}
          isOverlay={true}
          Model={WorkoutStartUserStrengthSetLog}
          modelProps={{ serverErrors, userStrengthSet: userSet }}
        />
      )}
    </li>
  );
}
