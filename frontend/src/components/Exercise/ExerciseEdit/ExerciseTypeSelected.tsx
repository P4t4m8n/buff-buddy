import { twMerge } from "tailwind-merge";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import { toTitle } from "../../../utils/toTitle";

interface IExerciseTypeSelectedProps {
  type?: ExerciseType | null;
}
export default function ExerciseTypeSelected({
  type,
}: IExerciseTypeSelectedProps) {
  const text = type ? toTitle(type) : "Select a Type";
  const style = twMerge(type ? "text-main-orange" : "text-gray-500", "text-sm");
  return <span className={style}>{text}</span>;
}
