import { toTitle } from "../../../utils/toTitle";
interface TExerciseType<T> {
  item: T;
}

export default function ExerciseTag({ item }: TExerciseType<string>) {
  return (
    <li
      className="text-sm text-black-300 bg-main-orange
                    w-fit px-2 py-1 rounded-4xl  whitespace-nowrap "
    >
      {toTitle(item)}
    </li>
  );
}
