import type { IModelProps } from "../../models/UI.model";

interface IExerciseEditModelProps extends IModelProps<HTMLFormElement> {
  exerciseId?: string;
}

export default function ExerciseEditModel({
  exerciseId,
  ...props
}: IExerciseEditModelProps) {
  const { setIsOpen, modelRef } = props;

  return <div>ExerciseEditModel</div>;
}
