import type { ISelectItemComponentProps } from "../../../../models/select.model";
import type { IExerciseDTO } from "../../../../../../shared/models/exercise.model";
import Button from "../../../UI/Button";
import { toTitle } from "../../../../utils/toTitle";
import IconPlus from "../../../UI/Icons/IconPlus";

interface IWorkoutExerciseEditExerciseSelectProps
  extends ISelectItemComponentProps<IExerciseDTO> {}
export default function WorkoutExerciseEditExerciseSelect({
  item,
  onClick,
}: IWorkoutExerciseEditExerciseSelectProps) {
  return (
    <li className="w-full h-full">
      <Button
        onClick={(e) => onClick(e, item)}
        className="w-full h-full flex cursor-pointer items-center justify-between"
      >
        <span className="">{toTitle(item?.name)}</span>
        <IconPlus className=" h-6 aspect-square stroke-main-orange" />
      </Button>
    </li>
  );
}
