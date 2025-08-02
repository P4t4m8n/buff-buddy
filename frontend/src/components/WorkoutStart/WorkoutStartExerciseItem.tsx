import { twMerge } from "tailwind-merge";
import { useModel } from "../../hooks/shared/useModel";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";

import WorkoutStartExerciseItemDetails from "./WorkoutStartExerciseItemDetails";
import type { IUserWorkoutExercisesDTO } from "../../../../shared/models/userWorkout";

interface IWorkoutStartExerciseItemProps {
  item: IUserWorkoutExercisesDTO;
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  completeAllExerciseSets: (id: string) => void;
}
export default function WorkoutStartExerciseItem({
  item: workoutStart,
  handleUserSetsChange,
  logUserSet,
  completeAllExerciseSets,
}: IWorkoutStartExerciseItemProps) {
  const [isOpen, , , handleModel] = useModel();

  const { exercise, coreSet, userSets } = workoutStart;

  const isFinished = userSets.reduce((acc, set) => {
    return acc && !!set?.isCompleted;
  }, true);

  const isFinishedStyle = isFinished ? "border-green-500" : "";
  const isOpenStyle = isOpen
    ? " h-fit  bg-main-orange z-10"
    : "h-20 min-h-20 overflow-hidden ";
  const liBaseStyle =
    "border rounded gap-4 px-mobile transition-all duration-300 w-full relative";

  const liStyle = twMerge(isFinishedStyle, isOpenStyle, liBaseStyle);
  return (
    <li className={liStyle}>
      <Button
        onClick={handleModel}
        className={`w-full flex items-center h-16 transition-all duration-300  ${
          isOpen ? "border-b pb-2" : ""
        }`}
      >
        <span className="inline-flex flex-col text-start">
          <h4>{exercise?.name}</h4>
          <p>Sets: {coreSet?.numberOfSets}</p>
        </span>
        <IconArrow
          className={`w-8 aspect-square ml-auto ${
            isOpen ? "rotate-180" : ""
          }  transition-all duration-300`}
        />
      </Button>

      <WorkoutStartExerciseItemDetails
        workoutStart={workoutStart}
        isOpen={isOpen}
        handleUserSetsChange={handleUserSetsChange}
        logUserSet={logUserSet}
        completeAllExerciseSets={completeAllExerciseSets}
        handleModel={handleModel}
      />
    </li>
  );
}
