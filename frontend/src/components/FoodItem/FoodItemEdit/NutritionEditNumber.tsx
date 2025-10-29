import NumberInputWIthError from "../../UI/Form/NumberInputWIthError";

interface INutritionEditNumberProps {
  item: [string, string | number | unknown];
  inputId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function NutritionEditNumber({
  item,
  inputId,
  onChange,
}: INutritionEditNumberProps) {
  const [name, value] = item;
  return (
    <li>
      <NumberInputWIthError
        key={name}
        onChange={onChange}
        name={name}
        inputId={inputId}
        value={(value as string) ?? 0}
        labelText={name}
      />
    </li>
  );
}
