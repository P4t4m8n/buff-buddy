import GenericModel from "../../../UI/GenericModel";
import IconCheckMark from "../../../UI/Icons/IconCheckMark";
import IconInactive from "../../../UI/Icons/IconInactive";
import WorkoutStartExerciseSkipDetailsModel from "../WorkoutStartExerciseSkipDetailsModel";
import type { IUserStrengthLastSet } from "../../../../../../shared/models/userStrengthSet.model";

interface IWorkoutStartUserSetsLastProps extends IUserStrengthLastSet {
  isWarmup?: boolean | null;
}
export default function WorkoutStartUserStrengthSetsLast({
  lastReps,
  lastWeight,
  lastIsMuscleFailure,
  lastIsJointPain,
  lastSkippedReason,
  isWarmup,
}: IWorkoutStartUserSetsLastProps) {
  if (!lastReps && !lastSkippedReason) {
    return <p className=" text-center ">No previous set</p>;
  }
  if (isWarmup) {
    return <span className=" col-span-full ">Warmup Set</span>;
  }
  return (
    <div className="col-span-full grid grid-cols-subgrid test-color border-b border-dotted pb-2  gap-y-1 ">
      <h6 className="col-span-full text-center underline underline-offset-2">
        Previous workout set Reps:
      </h6>
      {lastSkippedReason ? (
        <GenericModel
          Model={WorkoutStartExerciseSkipDetailsModel}
          modelProps={{ lastSkippedReason }}
          isOverlay={true}
          buttonProps={{
            children: "Show Skipped Reason",
            type: "button",
            className:
              "col-span-2 text-center bg-main-orange text-black rounded h-fit",
          }}
        />
      ) : (
        <>
          <span className="flex flex-col gap-1 text-center ">
            <h5>Reps</h5>
            <p className=" leading-4">{lastReps}</p>
          </span>
          <span className="flex flex-col gap-1 text-center">
            <h5>Weight</h5>
            <p className=" leading-4">{lastWeight || "Body Weight"}</p>
          </span>
        </>
      )}
      <span className="flex flex-col items-center  gap-1 text-sm  ">
        <h5>Joint Pain</h5>
        {lastIsJointPain ? (
          <IconCheckMark className="w-4 aspect-square fill-success-green" />
        ) : (
          <IconInactive className="w-4 aspect-square fill-error-red" />
        )}
      </span>
      <span className="flex flex-col gap-1 items-center   text-sm">
        <h5 className="text-center">Failure</h5>
        {lastIsMuscleFailure ? (
          <IconCheckMark className="w-4 aspect-square fill-success-green" />
        ) : (
          <IconInactive className="w-4 aspect-square fill-error-red" />
        )}
      </span>
    </div>
  );
}
