import WorkoutStartUserStrengthSetsLast from "./WorkoutStartUserStrengthSetsLast";

import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import NumberInputWIthError from "../../UI/Form/NumberInputWIthError";

import type { IUserStrengthSetEditDTO } from "../../../../../shared/models/strengthSet.model";
import type { TValidationError } from "../../../models/errors.model";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import { useErrors } from "../../../hooks/shared/useErrors";
import { CreateUserStrengthSetSchema } from "../../../validations/userStrengthSet.validation";
import { twMerge } from "tailwind-merge";
import GenericModel from "../../UI/GenericModel";
import WorkoutStartExerciseSkipEdit from "../WorkoutStartExerciseSkipEdit";
import { appUtil } from "../../../utils/app.util";

interface INumberInput {
  name: string;
  value: string | number;
  label: string;
  error?: string;
}
interface IWorkoutExerciseUserSetProps {
  item: IUserStrengthSetEditDTO;
  errors?: TValidationError<IUserStrengthSetEditDTO>;
  handleUserStrengthSetsChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUserSet: (userSetId?: string, type?: ExerciseType) => void;
}
export default function WorkoutStartUserStrengthSets({
  item: userSet,
  handleUserStrengthSetsChange,
  handleUserSet,
  errors: serverErrors,
}: IWorkoutExerciseUserSetProps) {
  const inputStyle = `rounded w-8 aspect-square  text-center border outline-none`;
  const divStyle = "inline-flex flex-col-reverse gap-1 items-center  h-full justify-between text-center";

  const {
    id: userSetId,
    reps,
    weight,
    isCompleted,
    isJointPain,
    isMuscleFailure,
    isBodyWeight,
    isWarmup,
    lastSet,
    skippedReason,
  } = userSet;

  const { errors, handleError, clearErrors } =
    useErrors<IUserStrengthSetEditDTO>();

  const combinedErrors = {
    ...serverErrors,
    ...errors,
  };
  console.log(
    "🚀 ~ WorkoutStartUserStrengthSets ~ combinedErrors:",
    combinedErrors
  );

  const numberInputs = [
    {
      name: `reps-${userSetId}`,
      value: reps || "",
      label: "Reps",
      error: combinedErrors?.reps,
    },
    {
      name: `weight-${userSetId}`,
      value: isBodyWeight ? "BW" : weight ?? "",
      label: "Weight",
      error: combinedErrors?.weight,
    },
  ];

  const checkboxInputs = [
    {
      name: `isJointPain-${userSetId}`,
      value: isJointPain,
      label: "Joint Pain",
    },
    {
      name: `isMuscleFailure-${userSetId}`,
      value: isMuscleFailure,
      label: "Muscle Failure",
    },
  ];

  const getNumberInput = (input: INumberInput) => {
    if (input.value === "BW") {
      return (
        <div key={input.label} className={divStyle}>
          <p className={inputStyle}>{input.value}</p>
          <h5>{input.label}</h5>
        </div>
      );
    }
    return (
      <NumberInputWIthError
        key={input.name}
        name={input.name}
        value={input.value}
        divStyle={divStyle + " col-span-2"}
        className={inputStyle}
        min={1}
        onChange={handleUserStrengthSetsChange!}
        inputId={userSetId}
        error={input.error}
        label={input.label}
      />
    );
  };

  const onComplete = () => {
    try {
      clearErrors();
      if (!skippedReason) CreateUserStrengthSetSchema.parse(userSet);
      handleUserSet(userSetId, "strength");
    } catch (error) {
      handleError({ error });
    }
  };

  const completeButtonStyleBase = "col-span-2 w-full text-black";

  const completeButtonStyleComplete = isCompleted ? "bg-success-green" : "";

  const completeButtonStyle = twMerge(
    completeButtonStyleBase,
    completeButtonStyleComplete
  );

  return (
    <div className="grid grid-cols-4 gap-x-2 grid-rows-[repeat(3,auto)] gap-y-3 justify-items-center content-between not-last:border-b-2 pb-2 items-center  ">
      <WorkoutStartUserStrengthSetsLast {...lastSet} isWarmup={isWarmup} />
      {numberInputs.map((input) => getNumberInput(input))}
      {checkboxInputs.map((input) => (
        <Input
          key={input.name}
          name={input.name}
          id={input.name}
          type="checkbox"
          checked={!!input.value}
          divStyle=" flex flex-col-reverse gap-1 justify-between text-center h-full col-span-2"
          className=" cursor-pointer "
          onChange={handleUserStrengthSetsChange}
        >
          <Label htmlFor={input.name}>{input.label}</Label>
        </Input>
      ))}

      {/*
       * INFO: Render skip edit model
       */}
      <GenericModel
        Model={WorkoutStartExerciseSkipEdit}
        modelProps={{ handleUserStrengthSetsChange, skippedReason, userSetId }}
        buttonProps={{
          className:
            "text-black hover:text-black w-full col-span-2  text-black",
          buttonStyle: "model",
          type: "button",
          children: "Skip",
        }}
      />

      <Button
        className={completeButtonStyle}
        buttonStyle="model"
        onClick={onComplete}
        type="button"
      >
        {isCompleted ? "Update" : "Complete"}
      </Button>
    </div>
  );
}
