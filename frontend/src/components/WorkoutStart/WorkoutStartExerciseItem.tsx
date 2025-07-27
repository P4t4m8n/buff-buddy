import { twMerge } from "tailwind-merge";
import type { IUserWorkoutExercisesDTO } from "../../../../shared/models/workoutStart.model";
import { useModel } from "../../hooks/shared/useModel";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";
import WorkoutStartExerciseVideo from "./WorkoutStartExerciseVideo";
import WorkoutStartUserSetList from "./WorkoutStartUserSetList";

import WorkoutStartExerciseItemNotes from "./WorkoutStartExerciseItemNotes";
import WorkoutStartExerciseCoreSets from "./WorkoutStartExerciseCoreSets";

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

  const { id, exercise, coreSet, notes, userSets } = workoutStart;
  const { youtubeUrl } = exercise ?? {};

  const isFinished = userSets.reduce((acc, set) => {
    return acc && !!set?.isCompleted;
  }, true);

  const isFinishedStyle = isFinished ? "border-green-500" : "";
  const isOpenStyle = isOpen
    ? "min-h-full h-full overflow-y-auto bg-main-orange z-10"
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

      <div
        className={`${
          isOpen ? " flex flex-col opacity-100 h-fit pb-4" : " opacity-0 h-auto"
        }
                      gap-2 justify-items-center w-full  
                       transition-all duration-500 relative`}
      >
        <WorkoutStartExerciseVideo youtubeUrl={youtubeUrl} />
        {notes ? <WorkoutStartExerciseItemNotes notes={notes} /> : null}
        <WorkoutStartExerciseCoreSets coreSet={coreSet} />
        <WorkoutStartUserSetList
          userSets={userSets}
          handleUserSetsChange={handleUserSetsChange}
          logUserSet={logUserSet}
        />

        <div className="flex w-full gap-8">
          <Button
            className="text-amber  hover:text-black w-full"
            buttonStyle="model"
            type="button"
          >
            Fill All Sets
          </Button>
          <Button
            className="text-amber  hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={() => completeAllExerciseSets(id!)}
          >
            Complete All Sets
          </Button>
        </div>
      </div>
    </li>
  );
}
