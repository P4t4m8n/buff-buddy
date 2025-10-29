import { twMerge } from "tailwind-merge";
import type { IUserStrengthSetEditDTO } from "../../../../../../shared/models/userStrengthSet.model";
import { userStrengthSetsValidation } from "../../../../../../shared/validations/userStrengthSet.validation";
import { useWorkoutStartContext } from "../../../../hooks/features/workoutStart/useWorkoutStartContext";
import { useErrors } from "../../../../hooks/shared/useErrors";
import type { TValidationError } from "../../../../models/errors.model";
import type { IModelProps } from "../../../../models/model.model";
import Button from "../../../UI/Button";
import Input from "../../../UI/Form/Input";
import Label from "../../../UI/Form/Label";
import GenericList from "../../../UI/GenericList";
import GenericModel from "../../../UI/GenericModel";
import WorkoutStartExerciseSkipEdit from "../WorkoutStartExerciseSkipEdit";
import WorkoutStartUserStrengthSetsInput from "./WorkoutStartUserStrengthSetsInput";
import WorkoutStartUserStrengthSetsLast from "./WorkoutStartUserStrengthSetsLast";
import PageHeader from "../../../UI/PageHeader";

export interface IWorkoutStartUserStrengthSetLogProps
  extends IModelProps<HTMLDivElement> {
  userStrengthSet?: IUserStrengthSetEditDTO;
  serverErrors?: TValidationError<IUserStrengthSetEditDTO>;
}
export default function WorkoutStartUserStrengthSetLog({
  userStrengthSet,
  serverErrors,
  ...props
}: IWorkoutStartUserStrengthSetLogProps) {
  const context = useWorkoutStartContext().context;

  const { handleUserSet, handleUserSetsChange, handleUserSetSkip } =
    context ?? {};

  const { modelRef, handleModel } = props;

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
  } = userStrengthSet ?? {};

  // const { reps: goalReps, weight: goalWeight } = goalSet ?? {};

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
      error: errors?.reps,
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

  const onComplete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      clearErrors();
      if (!skippedReason)
        userStrengthSetsValidation
          .createFactorySchema({ toSanitize: false })
          .parse(userStrengthSet);
      handleUserSet(userSetId, "strength");
      if (handleModel) handleModel(e);
    } catch (error) {
      handleError({ error });
    }
  };

  const completeButtonStyle = twMerge(
    " w-full text-black",
    isCompleted ? "bg-success-green" : ""
  );

  return (
    <div
      ref={modelRef}
      className="fixed rounded border bg-black-700 z-50 w-small flex flex-col gap-4 pb-2"
    >
      <PageHeader pageName="log set" handleModel={handleModel} />
      <WorkoutStartUserStrengthSetsLast {...lastSet} isWarmup={isWarmup} />

      <GenericList
        items={numberInputs}
        ItemComponent={WorkoutStartUserStrengthSetsInput}
        getKey={(item) => item.name}
        itemComponentProps={{ userSetId, handleUserSetsChange }}
        ulStyle="flex w-full col-span-2"
      />
      <ul className="flex justify-around">
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
      </ul>

      <div className="flex justify-around gap-4 px-desktop">
        <GenericModel
          Model={WorkoutStartExerciseSkipEdit}
          modelProps={{
            skippedReason,
            userSetId,
            handleUserSetSkip,
            handleParentModel: handleModel,
          }}
          buttonProps={{
            className: "text-black hover:text-black w-full  text-black",
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
    </div>
  );
}
