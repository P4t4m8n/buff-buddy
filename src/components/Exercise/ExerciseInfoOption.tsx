import type { IExerciseInfoDTO } from "../../models/exerciseInfo.model";

interface ExerciseInfoOptionProps {
  option: IExerciseInfoDTO;
}
export default function ExerciseInfoOption({
  option,
}: ExerciseInfoOptionProps) {
  const { name, image } = option;
  return (
    <div className="flex w-full h-8">
      <img src={image?.imgUrl} className=" h-8 aspect-square object-fill" />
      <h4>{name}</h4>
    </div>
  );
}
