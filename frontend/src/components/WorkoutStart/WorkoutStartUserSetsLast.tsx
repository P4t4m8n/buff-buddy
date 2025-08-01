import IconCheckMark from "../UI/Icons/IconCheckMark";
import IconInactive from "../UI/Icons/IconInactive";

interface IWorkoutStartUserSetsLastProps {
  lastReps?: number | null;
  lastWeight?: number | null;
  lastMuscleFailure?: boolean | null;
  lastJointPain?: boolean | null;
  isWarmup?: boolean | null;
}
export default function WorkoutStartUserSetsLast({
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
    <div className="col-span-full grid grid-cols-subgrid test-color border-b border-dotted pb-2 items-center gap-y-2 ">
      <h6 className="col-span-full text-center underline underline-offset-2">Previous workout set Reps:</h6>
      <span className="flex gap-1 items-center">
        <h5>Reps:</h5>
        <p>{lastReps}</p>
      </span>
      <span className="flex gap-1 items-center">
        <h5>Weight:</h5>
        <p>{lastWeight}</p>
      </span>
      <span className="flex flex-col items-center text-sm  ">
        <h5>Joint Pain</h5>
        {lastJointPain ? (
          <IconCheckMark className="w-4 aspect-square" />
        ) : (
          <IconInactive className="w-4 aspect-square" />
        )}
      </span>
      <span className="flex flex-col gap-1 items-center   text-sm">
        <h5 className="text-center">Muscle Failure</h5>
        {lastMuscleFailure ? (
          <IconCheckMark className="w-4 aspect-square" />
        ) : (
          <IconInactive className="w-4 aspect-square" />
        )}
      </span>
    </div>
  );
}
