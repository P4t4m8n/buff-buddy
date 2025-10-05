import { useModel } from "../../hooks/shared/useModel";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";

interface IWorkoutExerciseItemNotsProps {
  notes?: string | null;
}
export default function WorkoutStartExerciseItemNotes({
  notes,
}: IWorkoutExerciseItemNotsProps) {
  const { isOpen, handleModel } = useModel({});

  return (
    <Button
      onClick={handleModel}
      className={`w-full flex items-center h-16 transition-all duration-300  ${
        isOpen ? "border-b pb-2" : ""
      }`}
    >
      <span className="inline-flex flex-col text-start">
        <h4>{isOpen ? "Close Notes" : "Open Notes"}</h4>
      </span>
      <IconArrow
        className={`w-8 aspect-square ml-auto ${
          isOpen ? "rotate-180" : ""
        }  transition-all duration-300`}
      />
      {isOpen ? <p>{notes}</p> : null}
    </Button>
  );
}
