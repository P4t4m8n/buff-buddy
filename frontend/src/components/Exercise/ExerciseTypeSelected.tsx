import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";
import { toTitle } from "../../utils/toTitle";

interface IExerciseTypeSelectedProps {
  type?: ExerciseType | null;
}
export default function ExerciseTypeSelected({
  type,
}: IExerciseTypeSelectedProps) {
  const text = type ? toTitle(type) : "Select a Type";
  return <span className="pl-2 text-sm">{text}</span>;
}
