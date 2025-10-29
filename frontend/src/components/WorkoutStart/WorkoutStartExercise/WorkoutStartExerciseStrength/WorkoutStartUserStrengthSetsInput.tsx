import NumberInputWIthError from "../../../UI/Form/NumberInputWIthError";

interface INumberInput {
  name: string;
  value: string | number;
  label: string;
  error?: string;
  goal?: number | string | null;
}

interface WorkoutStartUserStrengthSetsInputProps {
  item: INumberInput;
  handleUserSetsChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  userSetId?: string;
}

export default function WorkoutStartUserStrengthSetsInput({
  handleUserSetsChange,
  userSetId,
  item,
}: WorkoutStartUserStrengthSetsInputProps) {
  const divStyle =
    "inline-flex flex-col-reverse gap-1 items-center w-full  h-full justify-between text-center ";
  const inputStyle = `rounded w-input aspect-square  text-center border outline-none`;

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
        divStyle={divStyle + ""}
        className={inputStyle}
        min={1}
        onChange={handleUserSetsChange!}
        inputId={userSetId}
        error={input.error}
        labelText={input.label}
      />
    );
  };
  return (
    <li className="w-full flex flex-col">
      <span className="grid items-center justify-items-center">
        <h6>Goal {item.label}</h6>
        <p className="">{item.goal}</p>
      </span>
      {getNumberInput(item)}
    </li>
  );
}
