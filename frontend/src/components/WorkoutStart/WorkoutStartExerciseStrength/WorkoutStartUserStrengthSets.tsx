import { twMerge } from "tailwind-merge";

import { useErrors } from "../../../hooks/shared/useErrors";
import { userStrengthSetsValidation } from "../../../../../shared/validations/userStrengthSet.validation";

import WorkoutStartUserStrengthSetsLast from "./WorkoutStartUserStrengthSetsLast";
import WorkoutStartExerciseSkipEdit from "../WorkoutStartExerciseSkipEdit";

import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import GenericModel from "../../UI/GenericModel";

import type { IUserStrengthSetEditDTO } from "../../../../../shared/models/userStrengthSet.model";
import type { TWorkoutStartUserSetsProps } from "../../../models/workoutStart.model";
import GenericList from "../../UI/GenericList";
import WorkoutStartUserStrengthSetsInput from "./WorkoutStartUserStrengthSetsInput";

export default function WorkoutStartUserStrengthSets({
  item: userSet,
  userWorkoutExerciseId,
  handleUserSetsChange,
  handleUserSet,
  handleUserSetSkip,
  errors: serverErrors,
}: TWorkoutStartUserSetsProps<IUserStrengthSetEditDTO>) {
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
    goalSet,
  } = userSet;

  const { errors, handleError, clearErrors } =
    useErrors<IUserStrengthSetEditDTO>();

  const combinedErrors = {
    ...serverErrors,
    ...errors,
  };

  const setType = "userStrengthSets";

  const numberInputs = [
    {
      name: `${setType}-reps-${userSetId}`,
      value: reps || "",
      label: "Reps",
      error: combinedErrors?.reps,
      goal: goalSet?.reps,
    },
    {
      name: `${setType}-weight-${userSetId}`,
      value: isBodyWeight ? "BW" : weight ?? "",
      label: "Weight",
      error: combinedErrors?.weight,
      goal: goalSet?.weight,
    },
  ];

  const checkboxInputs = [
    {
      name: `${setType}-isJointPain-${userSetId}`,
      value: isJointPain,
      label: "Joint Pain",
    },
    {
      name: `${setType}-isMuscleFailure-${userSetId}`,
      value: isMuscleFailure,
      label: "Muscle Failure",
    },
  ];

  const onComplete = () => {
    try {
      clearErrors();
      if (!skippedReason)
        userStrengthSetsValidation
          .createUserStrengthSetFactorySchema({ toSanitize: false })
          .parse(userSet);
      handleUserSet(userSetId, "strength");
    } catch (error) {
      handleError({ error });
    }
  };

  const completeButtonStyle = twMerge(
    "col-span-2 w-full text-black",
    isCompleted ? "bg-success-green" : ""
  );

  return (
    <div className="grid grid-cols-4 gap-x-2 grid-rows-[repeat(3,auto)] gap-y-3 justify-items-center content-between not-last:border-b-2 pb-2 ">
      <WorkoutStartUserStrengthSetsLast {...lastSet} isWarmup={isWarmup} />

      <GenericList
        items={numberInputs}
        ItemComponent={WorkoutStartUserStrengthSetsInput}
        getKey={(item) => item.name}
        itemComponentProps={{ handleUserSetsChange, userSetId }}
        ulStyle="flex w-full col-span-2"
      />
      {checkboxInputs.map((input) => (
        <Input
          key={input.name}
          name={input.name}
          id={input.name}
          type="checkbox"
          checked={!!input.value}
          divStyle=" flex flex-col-reverse gap-1 text-center h-full justify-end "
          className=" cursor-pointer "
          onChange={handleUserSetsChange}
        >
          <Label htmlFor={input.name}>{input.label}</Label>
        </Input>
      ))}

      {/*
       * INFO: Render skip edit model
       */}
      <GenericModel
        Model={WorkoutStartExerciseSkipEdit}
        modelProps={{
          skippedReason,
          handleUserSetSkip,
          userWorkoutExerciseId,
          userSetId,
        }}
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
