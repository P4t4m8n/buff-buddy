import type { IUserSetEditDTO } from "../../../../shared/models/set.model";
import type { TValidationError } from "../../models/errors.model";
import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import WorkoutStartUserSetsLast from "./WorkoutStartUserSetsLast";

interface INumberInput {
  name: string;
  value: string | number;
  label: string;
  isError: boolean;
}
interface IWorkoutExerciseUserSetProps {
  item: IUserSetEditDTO;
  errors?: TValidationError<IUserSetEditDTO>;
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
}
export default function WorkoutStartUserSets({
  item: userSet,
  handleUserSetsChange,
  logUserSet,
  errors,
}: IWorkoutExerciseUserSetProps) {
  const inputStyle = `bg-amber rounded w-8 aspect-square  text-center border outline-none`;
  const divStyle = "inline-flex flex-row-reverse gap-1 items-center";

  const {
    id,
    reps,
    lastReps,
    lastWeight,
    lastIsJointPain,
    lastIsMuscleFailure,
    weight,
    isCompleted,
    isJointPain,
    isMuscleFailure,
    isBodyWeight,
    isWarmup,
  } = userSet;

  const numberInputs = [
    {
      name: `reps-${id}`,
      value: reps || "",
      label: "Reps",
      isError: !!errors?.reps,
    },
    {
      name: `weight-${id}`,
      value: isBodyWeight ? "BW" : weight ?? "",
      label: "Weight",
      isError: !!errors?.weight,
    },
  ];

  const checkboxInputs = [
    {
      name: `isJointPain-${id}`,
      value: isJointPain,
      label: "Joint Pain",
    },
    {
      name: `isMuscleFailure-${id}`,
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
      <Input
        key={input.name}
        name={input.name}
        type="number"
        value={input.value}
        divStyle={divStyle + " col-span-2"}
        className={inputStyle + " " + (input?.isError ? "border-red-500" : "")}
        min={1}
        step={"any"}
        onChange={handleUserSetsChange}
      >
        <Label className="" htmlFor={input.name}>
          {input.label}:
        </Label>
      </Input>
    );
  };

  return (
    <div className="grid grid-cols-4 gap-x-2 grid-rows-[repeat(3,auto)] gap-y-3 justify-items-center content-between  not-last:border-b-2 pb-2 items-center ">
      <WorkoutStartUserSetsLast
        isWarmup={isWarmup}
        lastMuscleFailure={lastIsMuscleFailure}
        lastJointPain={lastIsJointPain}
        lastReps={lastReps}
        lastWeight={lastWeight}
      />
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
          onChange={handleUserSetsChange}
        >
          <Label htmlFor={input.name}>{input.label}</Label>
        </Input>
      ))}
      <Button
        className="text-amber hover:text-black w-full col-span-2 opacity-50 cursor-not-allowed"
        buttonStyle="model"
        disabled={true}
        type="button"
      >
        ***Skip***
      </Button>

      <Button
        className={`text-amber hover:text-black col-span-2 w-full ${
          isCompleted ? "bg-main-green" : ""
        }`}
        buttonStyle="model"
        onClick={() => logUserSet(id)}
        type="button"
      >
        {isCompleted ? "Update" : "Complete"}
      </Button>
    </div>
  );
}
