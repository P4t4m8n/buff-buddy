import { twMerge } from "tailwind-merge";
import { useModel } from "../../hooks/shared/useModel";
import type { IWorkoutStartExerciseItemProps } from "../../models/workoutStart.model";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";
import WorkoutStartExerciseItemNotes from "./WorkoutStartExerciseItemNotes";
import WorkoutStartExerciseVideo from "./WorkoutStartExerciseVideo";
import WorkoutStartExerciseCoreSets from "./WorkoutStartExerciseCoreSets";
import WorkoutStartUserSetList from "./WorkoutStartUserSetList";

export default function WorkoutStartExerciseStrength(
  props: IWorkoutStartExerciseItemProps
) {
  const {
    item: workoutStart,
    handleUserSetsChange,
    logUserSet,
    completeAllExerciseSets,
  } = props;
  const [isOpen, , , handleModel] = useModel();

  const { id, exercise, coreStrengthSet, userStrengthSets, notes } =
    workoutStart;

  const { youtubeUrl } = exercise ?? {};

  const isOpenClass = isOpen
    ? " flex flex-col opacity-100 h-fit pb-4"
    : " opacity-0 h-auto";
  const divClass = twMerge(
    isOpenClass,
    "gap-2 justify-items-center w-full transition-all duration-500 relative"
  );
  const noteComponent = notes ? (
    <WorkoutStartExerciseItemNotes notes={notes} />
  ) : null;

  const isFinished = userStrengthSets?.reduce((acc, set) => {
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
          <p>Sets: {coreStrengthSet?.numberOfSets}</p>
        </span>
        <IconArrow
          className={`w-8 aspect-square ml-auto ${
            isOpen ? "rotate-180" : ""
          }  transition-all duration-300`}
        />
      </Button>

      <div className={divClass}>
        <WorkoutStartExerciseVideo youtubeUrl={youtubeUrl} />
        {noteComponent}
        <WorkoutStartExerciseCoreSets coreSet={coreStrengthSet} />
        <WorkoutStartUserSetList
          userSets={userStrengthSets!}
          handleUserSetsChange={handleUserSetsChange}
          logUserSet={logUserSet}
        />

        <div className="flex w-full gap-8">
          <Button
            className="text-amber hover:text-black w-full opacity-50 cursor-not-allowed"
            buttonStyle="model"
            disabled={true}
            type="button"
          >
            ***Skip***
          </Button>
          <Button
            className="text-amber hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={() => completeAllExerciseSets(id!)}
          >
            Complete All Sets
          </Button>
          <Button
            className="text-amber hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={handleModel}
          >
            Close
          </Button>
        </div>
      </div>
    </li>
  );
}
