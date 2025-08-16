import WorkoutStartExerciseSkipEdit from "../WorkoutStartExerciseSkipEdit";
import WorkoutStartUserCardioLast from "./WorkoutStartUserCardioLast";

import Button from "../../UI/Button";
import NumberInputWIthError from "../../UI/Form/NumberInputWIthError";
import GenericModel from "../../UI/GenericModel";

import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IUserCardioSetEditDTO } from "../../../../../shared/models/cardioSet.model";
import type { TValidationError } from "../../../models/errors.model";

interface IWorkoutStartUserCardioSetsProps {
  item: IUserCardioSetEditDTO;
  errors?: TValidationError<IUserCardioSetEditDTO>;
  handleUserCardioSetsChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUserSet: (userSetId?: string, type?: ExerciseType) => void;
}
export default function WorkoutStartUserCardioSets({
  item: userSet,
  errors,
  handleUserCardioSetsChange,
  handleUserSet,
}: IWorkoutStartUserCardioSetsProps) {
  const {
    id: userSetId,
    workTime,
    distance,
    avgHeartRate,
    avgSpeed,
    caloriesBurned,
    isCompleted,
    lastSet,
    skippedReason,
  } = userSet;

  const numberInputs = [
    {
      name: `workTime-${userSetId}`,
      value: workTime || "",
      label: "Work Time",
      error: errors?.workTime,
    },
    {
      name: `distance-${userSetId}`,
      value: distance || "",
      label: "Distance",
      error: errors?.distance,
    },
    {
      name: `avgHeartRate-${userSetId}`,
      value: avgHeartRate || "",
      label: "Avg Heart Rate",
      error: errors?.avgHeartRate,
    },
    {
      name: `avgSpeed-${userSetId}`,
      value: avgSpeed || "",
      label: "Avg Speed",
      error: errors?.avgSpeed,
    },
    {
      name: `caloriesBurned-${userSetId}`,
      value: caloriesBurned || "",
      label: "Calories Burned",
      error: errors?.caloriesBurned,
    },
  ];

  const divStyle = "inline-flex flex-row-reverse gap-1 items-center";
  const inputStyle = `bg-amber rounded w-8 aspect-square  text-center border outline-none`;

  return (
    <div className="flex flex-col gap-4 items-center ">
      <WorkoutStartUserCardioLast lastSet={lastSet} />
      {numberInputs.map((input) => (
        <NumberInputWIthError
          key={input.name}
          name={input.name}
          value={input.value}
          divStyle={divStyle + " col-span-2"}
          className={inputStyle}
          min={1}
          onChange={handleUserCardioSetsChange!}
          inputId={userSetId}
          error={input.error}
          label={input.label}
        />
      ))}

      {/*
       * INFO: Render skip edit model
       */}
      <GenericModel
        Model={WorkoutStartExerciseSkipEdit}
        modelProps={{
          handleUserSetsChange: handleUserCardioSetsChange,
          skippedReason,
          userSetId,
        }}
        buttonProps={{
          className:
            "text-amber hover:text-black w-full col-span-2 opacity-50 cursor-not-allowed text-black",
          buttonStyle: "model",
          type: "button",
          children: "Skip",
        }}
      />

      <Button
        className={`text-amber hover:text-black col-span-2 w-full ${
          isCompleted ? "bg-main-green" : ""
        }`}
        buttonStyle="model"
        onClick={() => handleUserSet(userSetId, "cardio")}
        type="button"
      >
        {isCompleted ? "Update" : "Complete"}
      </Button>
    </div>
  );
}
