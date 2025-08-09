import Button from "../UI/Button";
import IconPlus from "../UI/Icons/IconPlus";

import type { ISelectItemComponentProps } from "../../models/select.model";
import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";

export default function ExerciseTypeSelectItem({
  item,
  onClick,
}: ISelectItemComponentProps<ExerciseType>) {
  return (
    <li className="w-full h-full">
      <Button
        onClick={(e) => onClick(e, item)}
        className="w-full h-full flex cursor-pointer items-center justify-between "
      >
        {item ? item : "No Type Selected"}
        <IconPlus className=" h-8 aspect-square stroke-main-black" />
      </Button>
    </li>
  );
}
