import ExerciseEdit from "../../../Exercise/ExerciseEdit";
import GenericModel from "../../../UI/GenericModel";
import {IconPlus} from "../../../UI/Icons/IconPlus";

interface WorkoutExerciseEditAddExerciseProps {
  parentRef?: React.RefObject<HTMLDivElement | null>;
  isPortal?: boolean;
}
export default function WorkoutExerciseEditAddExercise({
  parentRef,
  isPortal,
}: WorkoutExerciseEditAddExerciseProps) {
  return (
    <GenericModel
      Model={ExerciseEdit}
      isOverlay={true}
      parentRef={parentRef}
      isPortal={isPortal}
      buttonProps={{
        className:"w-full h-full flex cursor-pointer items-center justify-between bg-secondary-orange",
        children: (
          <>
            <p>Add Exercise </p>
            <IconPlus className=" h-8 aspect-square stroke-main-black " />
          </>
        ),
      }}
    />
  );
}
