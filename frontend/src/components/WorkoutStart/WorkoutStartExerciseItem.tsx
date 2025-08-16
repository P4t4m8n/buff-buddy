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

import type { IUserCardioSetEditDTO } from "../../../../shared/models/cardioSet.model";
import type { IUserStrengthSetEditDTO } from "../../../../shared/models/strengthSet.model";
import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";
import type { TValidationError } from "../../models/errors.model";
import type { IWorkoutStartExerciseItemProps } from "../../models/workoutStart.model";

export default function WorkoutStartExerciseItem(
  props: IWorkoutStartExerciseItemProps
) {
  const { isOpen, handleModel } = useModel();

  const { item, completeAllExerciseSets } = props;

  const { userWorkoutExercise, errors } = item;
  const { id, exercise, notes } = userWorkoutExercise;
  const { youtubeUrl, name: exerciseName, type } = exercise ?? {};

  const exerciseConfig = getExerciseConfig(type ?? "strength", props);

  if (!exerciseConfig) {
    return (
      <li className="border rounded gap-4 px-mobile transition-all duration-300 w-full relative h-20 min-h-20 overflow-hidden">
        <p className="text-error-red">Unsupported exercise type: {type}</p>
      </li>
    );
  }

  const isError = !!errors?.userStrengthSets || !!errors?.userCardioSets;

  const liStyle = twMerge(
    "border rounded gap-4 px-mobile transition-all duration-300 w-full relative",
    exerciseConfig?.isFinished ? "border-green-500" : "",
    isOpen ? "h-fit  z-10" : "h-20 min-h-20 overflow-hidden",
    isError ? "border-error-red " : ""
  );

  const divClass = twMerge(
    "gap-2 justify-items-center w-full transition-all duration-500 relative",
    isOpen ? "flex flex-col opacity-100 h-fit pb-4" : "opacity-0 h-auto"
  );

  const modelButtonStyle = twMerge(
    "w-full flex items-center h-16 transition-all duration-300",
    isOpen ? "border-b pb-2" : "",
    isError ? "text-error-red " : ""
  );

  const iconArrowStyle = twMerge(
    "w-8 aspect-square ml-auto transition-all duration-300 stroke-none fill-main-orange",
    isOpen ? "rotate-180" : ""
  );

  return (
    <li className={liStyle}>
      <Button onClick={handleModel} className={modelButtonStyle}>
        <span className="inline-flex flex-col text-start">
          <h4>{exerciseName}</h4>
          <p>Sets: {exerciseConfig?.numberOfSets}</p>
        </span>
        <IconArrow className={iconArrowStyle} />
      </Button>

      <div className={divClass}>
        <WorkoutStartExerciseVideo youtubeUrl={youtubeUrl} />

        {notes && <WorkoutStartExerciseItemNotes notes={notes} />}

        {/* 
         // ? INFO: Render core set component based on exercise type
        */}
        <WorkoutStartExerciseCoreSet items={exerciseConfig?.coreSetItems} />

        {/**
         // ? INFO Render user sets list based on exercise type
         */}
        <GenericList<
          IUserCardioSetEditDTO | IUserStrengthSetEditDTO,
          typeof exerciseConfig.userSetListProps
        >
          items={exerciseConfig?.userSetListData ?? []}
          ItemComponent={exerciseConfig.userSetListComponent}
          itemComponentProps={(item, index) => ({
            ...(exerciseConfig.userSetListProps as typeof exerciseConfig.userSetListProps),
            errors: (exerciseConfig.userSetListProps as any)?.errors?.[index],
          })}
          getKey={(item) => item.id!}
          ulStyle="h-full flex flex-col gap-2"
        />

        <div className="flex w-full gap-8 text-black">
          <Button
            className="opacity-50 cursor-not-allowed text-black "
            buttonStyle="model"
            disabled={true}
            type="button"
          >
            Skip Exercise
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

const getExerciseConfig = (
  type: ExerciseType,
  props: IWorkoutStartExerciseItemProps
) => {
  const {
    item,
    handleUserStrengthSetsChange,
    handleUserCardioSetsChange,
    handleUserSet,
  } = props;

  const { userWorkoutExercise, errors } = item ?? {};
  const { coreStrengthSet, userStrengthSets, coreCardioSet, userCardioSets } =
    userWorkoutExercise ?? {};
  switch (type) {
    case "strength":
      return {
        numberOfSets: coreStrengthSet?.numberOfSets,
        userSetListComponent: WorkoutStartUserStrengthSets,
        userSetListProps: {
          handleUserStrengthSetsChange,
          handleUserSet,
          errors:
            errors?.userStrengthSets as TValidationError<IUserStrengthSetEditDTO>,
        },
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
    case "cardio":
      return {
        numberOfSets: 1, //INFO: Cardio is typically one long set
        userSetListComponent: WorkoutStartUserCardioSets,
        userSetListProps: {
          handleUserCardioSetsChange,
          handleUserSet,
          errors:
            errors?.userCardioSets as TValidationError<IUserCardioSetEditDTO>,
        },
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
    default:
      return null;
  }
};
