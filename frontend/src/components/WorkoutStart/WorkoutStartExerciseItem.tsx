import { memo } from "react";
import { twMerge } from "tailwind-merge";

import { useModel } from "../../hooks/shared/useModel";

import WorkoutStartExerciseItemNotes from "./WorkoutStartExerciseItemNotes";
import WorkoutStartUserStrengthSets from "./WorkoutStartExerciseStrength/WorkoutStartUserStrengthSets";
import WorkoutStartUserCardioSets from "./WorkoutStartExerciseCardio/WorkoutStartUserCardioSets";
import WorkoutStartExerciseVideo from "./WorkoutStartExerciseVideo";
import WorkoutStartExerciseSkipEdit from "./WorkoutStartExerciseSkipEdit";

import GenericModel from "../UI/GenericModel";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";
import GenericList from "../UI/GenericList";

import type { IUserCardioSetEditDTO } from "../../../../shared/models/userCardioSet.model";
import type { IUserStrengthSetEditDTO } from "../../../../shared/models/userStrengthSet.model";
import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";
import type { TValidationError } from "../../models/errors.model";
import type { IWorkoutStartExerciseItemProps } from "../../models/workoutStart.model";

function WorkoutStartExerciseItem(props: IWorkoutStartExerciseItemProps) {
  const { isOpen, handleModel } = useModel();

  const { item, completeAllExerciseSets, skipAllExerciseSets, ...restProps } =
    props;

  const { userWorkoutExercise, errors } = item;
  const {
    id: userWorkoutExerciseId,
    exercise,
    notes,
    skippedReason,
  } = userWorkoutExercise;
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

        <GenericList<IUserCardioSetEditDTO | IUserStrengthSetEditDTO, any>
          items={exerciseConfig?.userSetListData ?? []}
          ItemComponent={exerciseConfig.userSetListComponent}
          itemComponentProps={{
            ...restProps,
            userWorkoutExerciseId,
            errors:
              errors?.userStrengthSets as TValidationError<IUserStrengthSetEditDTO>,
          }}
          getKey={(item) => item.id!}
          ulStyle="h-full flex flex-col gap-2"
        />

        <div className="flex w-full gap-8 text-black">
          <GenericModel
            Model={WorkoutStartExerciseSkipEdit}
            modelProps={{
              skippedReason,
              handleUserSetSkip: skipAllExerciseSets,
              userWorkoutExerciseId,
            }}
            buttonProps={{
              className:
                "text-black hover:text-black w-full col-span-2  text-black",
              buttonStyle: "model",
              type: "button",
              children: "Skip",
            }}
          />

          <Button
            className="text-amber hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={() => completeAllExerciseSets(userWorkoutExerciseId!)}
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

export default memo(
  WorkoutStartExerciseItem
) as typeof WorkoutStartExerciseItem;

const getExerciseConfig = (
  type: ExerciseType,
  props: IWorkoutStartExerciseItemProps
) => {
  const { item } = props;

  const { userWorkoutExercise } = item ?? {};
  const { userStrengthSets, userCardioSets } = userWorkoutExercise ?? {};
  switch (type) {
    case "strength":
      return {
        numberOfSets: userStrengthSets?.length,
        userSetListComponent: WorkoutStartUserStrengthSets,
        userSetListData: userStrengthSets,
        isFinished: userStrengthSets?.every((set) => set?.isCompleted),
      };
    case "cardio":
      return {
        numberOfSets: 1, //INFO: Cardio is typically one long set
        userSetListComponent: WorkoutStartUserCardioSets,

        userSetListData: userCardioSets,
        isFinished: userCardioSets?.every((set) => set?.isCompleted),
      };
    default:
      return null;
  }
};
