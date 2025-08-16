import Button from "../../UI/Button";
import GenericModel, { type IModelProps } from "../../UI/GenericModel";
import IconCheckMark from "../../UI/Icons/IconCheckMark";
import IconInactive from "../../UI/Icons/IconInactive";

interface IWorkoutStartUserSetsLastProps {
  lastReps?: number | null;
  lastWeight?: number | null;
  lastMuscleFailure?: boolean | null;
  lastJointPain?: boolean | null;
  isWarmup?: boolean | null;
  lastSkippedReason?: string | null;
}
export default function WorkoutStartUserStrengthSetsLast({
  lastReps,
  lastWeight,
  lastMuscleFailure,
  lastJointPain,
  lastSkippedReason,
  isWarmup,
}: IWorkoutStartUserSetsLastProps) {
  console.log(
    "🚀 ~ WorkoutStartUserStrengthSetsLast ~ lastSkippedReason:",
    lastSkippedReason
  );
  if (isWarmup) {
    return <span className=" col-span-full ">Warmup Set</span>;
  }
  return (
    <div className="col-span-full grid grid-cols-subgrid test-color border-b border-dotted pb-2  gap-y-2 ">
      <h6 className="col-span-full text-center underline underline-offset-2">
        Previous workout set Reps:
      </h6>
      {lastSkippedReason ? (
        <GenericModel
          Model={LastSkippedModel}
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
          <span className="flex flex-col gap-1 text-center justify-between ">
            <h5>Reps</h5>
            <p className=" leading-4">{lastReps}</p>
          </span>
          <span className="flex flex-col gap-1 text-center justify-between">
            <h5>Weight</h5>
            <p className=" leading-4">{lastWeight}</p>
          </span>
        </>
      )}
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

interface ILastSkippedModelProps extends IModelProps<HTMLDivElement> {
  lastSkippedReason?: string | null;
}
const LastSkippedModel = ({
  lastSkippedReason,
  ...modelProps
}: ILastSkippedModelProps) => {
  const { modelRef, handleModel } = modelProps;
  return (
    <div ref={modelRef} className="p-4 bg-black-500 border rounded grid  gap-4">
      <h5 className="text-center text-xl">Skipped Set Reason:</h5>
      <p className="text-center p-2">{lastSkippedReason}</p>
      <Button
        buttonStyle="save"
        className=" place-self-center"
        type="button"
        onClick={handleModel}
      >
        Close
      </Button>
    </div>
  );
};
