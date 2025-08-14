import IconCheckMark from "../../UI/Icons/IconCheckMark";
import IconInactive from "../../UI/Icons/IconInactive";

interface IWorkoutStartUserSetsLastProps {
  lastReps?: number | null;
  lastWeight?: number | null;
  lastMuscleFailure?: boolean | null;
  lastJointPain?: boolean | null;
  isWarmup?: boolean | null;
}
export default function WorkoutStartUserStrengthSetsLast({
  lastReps,
  lastWeight,
  lastMuscleFailure,
  lastJointPain,
  isWarmup,
}: IWorkoutStartUserSetsLastProps) {
  if (isWarmup) {
    return <span className=" col-span-full ">Warmup Set</span>;
  }
  return (
    <div className="col-span-full grid grid-cols-subgrid test-color border-b border-dotted pb-2  gap-y-2 ">
      <h6 className="col-span-full text-center underline underline-offset-2">
        Previous workout set Reps:
      </h6>
      <span className="flex flex-col gap-1 text-center justify-between ">
        <h5>Reps</h5>
        <p className=" leading-4">{lastReps}</p>
      </span>
      <span className="flex flex-col gap-1 text-center justify-between">
        <h5>Weight</h5>
        <p className=" leading-4">{lastWeight}</p>
      </span>
      <span className="flex flex-col items-center justify-between text-sm  ">
        <h5>Joint Pain</h5>
        {lastJointPain ? (
          <IconCheckMark className="w-4 aspect-square fill-success-green" />
        ) : (
          <IconInactive className="w-4 aspect-square fill-error-red" />
        )}
      </span>
      <span className="flex flex-col gap-1 items-center   text-sm">
        <h5 className="text-center">Muscle Failure</h5>
        {lastMuscleFailure ? (
          <IconCheckMark className="w-4 aspect-square fill-success-green" />
        ) : (
          <IconInactive className="w-4 aspect-square fill-error-red" />
        )}
      </span>
    </div>
  );
}
