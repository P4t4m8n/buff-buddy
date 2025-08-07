import { twMerge } from "tailwind-merge";
import { useModel } from "../../hooks/shared/useModel";

import WorkoutStartExerciseItemNotes from "./WorkoutStartExerciseItemNotes";
import WorkoutStartExerciseCoreSet from "./WorkoutStartExerciseCoreSet";
import WorkoutStartUserStrengthSets from "./WorkoutStartExerciseStrength/WorkoutStartUserStrengthSets";
import WorkoutStartUserCardioSets from "./WorkoutStartExerciseCardio/WorkoutStartUserCardioSets";

import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";
import WorkoutStartExerciseVideo from "./WorkoutStartExerciseVideo";
import GenericList from "../UI/GenericList";

import type { IUserWorkoutEditExercisesDTO } from "../../../../shared/models/userWorkout";
import type { IUserCardioSetEditDTO } from "../../../../shared/models/cardioSet.model";
import type { IUserStrengthSetEditDTO } from "../../../../shared/models/strengthSet.model";

interface IWorkoutStartExerciseItemProps {
  item: IUserWorkoutEditExercisesDTO;
  handleUserStrengthSetsChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleUserCardioSetsChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  completeAllExerciseSets: (id: string) => void;
}

export default function WorkoutStartExerciseItem({
  item: workoutStart,
  handleUserStrengthSetsChange,
  handleUserCardioSetsChange,
  logUserSet,
  completeAllExerciseSets,
}: IWorkoutStartExerciseItemProps) {
  const [isOpen, , , handleModel] = useModel();
  const {
    id,
    exercise,
    coreStrengthSet,
    userStrengthSets,
    coreCardioSet,
    userCardioSets,
    notes,
  } = workoutStart;
  const { youtubeUrl, name: exerciseName, type } = exercise ?? {};

  let exerciseConfig;

  if (type === "strength") {
    exerciseConfig = {
      numberOfSets: coreStrengthSet?.numberOfSets,
      userSetListComponent: WorkoutStartUserStrengthSets,
      userSetListProps: { handleUserStrengthSetsChange, logUserSet },
      userSetListData: userStrengthSets,
      isFinished: userStrengthSets?.every((set) => set?.isCompleted),
      coreSetItems: [
        {
          name: "Goal Reps",
          value: coreStrengthSet?.reps || "",
        },
        {
          name: "Goal Weight per Set",
          value: coreStrengthSet?.isBodyWeight
            ? "BW"
            : coreStrengthSet?.weight ?? "",
        },
        {
          name: "Rest Time",
          value: coreStrengthSet?.restTime || "",
        },
      ],
    };
  } else if (type === "cardio") {
    exerciseConfig = {
      numberOfSets: 1, //INFO: Cardio is typically one long set
      userSetListComponent: WorkoutStartUserCardioSets,
      userSetListProps: { handleUserCardioSetsChange, logUserSet },
      userSetListData: userCardioSets,
      isFinished: userCardioSets?.every((set) => set?.isCompleted),
      coreSetItems: [
        { name: "Work Time", value: coreCardioSet?.workTime || "" },
        { name: "Warmup Time", value: coreCardioSet?.warmupTime || "" },
        { name: "Calorie Target", value: coreCardioSet?.calorieTarget || "" },
        { name: "Distance", value: coreCardioSet?.distance || "" },
        { name: "Avg Speed", value: coreCardioSet?.avgSpeed || "" },
        { name: "Avg Heart Rate", value: coreCardioSet?.avgHeartRate || "" },
      ],
    };
  } else {
    return null;
  }

  const liStyle = twMerge(
    "border rounded gap-4 px-mobile transition-all duration-300 w-full relative",
    exerciseConfig.isFinished ? "border-green-500" : "",
    isOpen ? "h-fit bg-main-orange z-10" : "h-20 min-h-20 overflow-hidden"
  );

  const divClass = twMerge(
    "gap-2 justify-items-center w-full transition-all duration-500 relative",
    isOpen ? "flex flex-col opacity-100 h-fit pb-4" : "opacity-0 h-auto"
  );

  return (
    <li className={liStyle}>
      <Button
        onClick={handleModel}
        className={`w-full flex items-center h-16 transition-all duration-300 ${
          isOpen ? "border-b pb-2" : ""
        }`}
      >
        <span className="inline-flex flex-col text-start">
          <h4>{exerciseName}</h4>
          <p>Sets: {exerciseConfig.numberOfSets}</p>
        </span>
        <IconArrow
          className={`w-8 aspect-square ml-auto ${
            isOpen ? "rotate-180" : ""
          } transition-all duration-300`}
        />
      </Button>

      <div className={divClass}>
        <WorkoutStartExerciseVideo youtubeUrl={youtubeUrl} />

        {notes && <WorkoutStartExerciseItemNotes notes={notes} />}

        {/*//INFO: Render core set component based on exercise type*/}
        <WorkoutStartExerciseCoreSet items={exerciseConfig.coreSetItems} />

        {/*//INFO: Render user sets list based on exercise type*/}
        <GenericList<
          IUserCardioSetEditDTO | IUserStrengthSetEditDTO,
          typeof exerciseConfig.userSetListProps
        >
          items={exerciseConfig.userSetListData ?? []}
          ItemComponent={exerciseConfig.userSetListComponent}
          itemComponentProps={exerciseConfig.userSetListProps}
          getKey={(item) => item.id!}
          ulStyle="h-full flex flex-col gap-2"
        />

        <div className="flex w-full gap-8">
          <Button
            className="text-amber hover:text-black w-full
             opacity-50 cursor-not-allowed"
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
