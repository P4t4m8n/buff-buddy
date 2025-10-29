import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { useModel } from "../../../hooks/shared/useModel";

import WorkoutStartExerciseItemNotes from "./WorkoutStartExerciseItemNotes";
import WorkoutStartUserStrengthSet from "./WorkoutStartExerciseStrength/WorkoutStartUserStrengthSet";
import WorkoutStartUserCardioSets from "./WorkoutStartExerciseCardio/WorkoutStartUserCardioSets";
import WorkoutStartExerciseVideo from "./WorkoutStartExerciseVideo";

import GenericModel from "../../UI/GenericModel";
import Button from "../../UI/Button";
import IconArrow from "../../UI/Icons/IconArrow";
import GenericList from "../../UI/GenericList";

import type { IUserCardioSetEditDTO } from "../../../../../shared/models/userCardioSet.model";
import type { IUserStrengthSetEditDTO } from "../../../../../shared/models/userStrengthSet.model";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IWorkoutStartExerciseItemProps } from "../../../models/workoutStart.model";
import toTitle from "../../../utils/toTitle";
import { useWorkoutStartContext } from "../../../hooks/features/workoutStart/useWorkoutStartContext";
import type { IUserWorkoutExercisesEditDTO } from "../../../../../shared/models/userWorkout";
import IconCheckMark from "../../UI/Icons/IconCheckMark";
import IconInactive from "../../UI/Icons/IconInactive";
import WorkoutStartExerciseSkipEdit from "./WorkoutStartExerciseSkipEdit";

function WorkoutStartExercise({ item }: IWorkoutStartExerciseItemProps) {
  const { isOpen, handleModel } = useModel({});

  const context = useWorkoutStartContext().context;
  const { skipAllExerciseSets, completeAllExerciseSets } = context ?? {};

  const { userWorkoutExercise, errors } = item;
  const { id: userWorkoutExerciseId, exercise, notes } = userWorkoutExercise;

  const { youtubeUrl, name: exerciseName, type } = exercise ?? {};

  const getExerciseConfig = useCallback(
    (type: ExerciseType, userWorkoutExercise: IUserWorkoutExercisesEditDTO) => {
      const { userStrengthSets, userCardioSets } = userWorkoutExercise ?? {};

      switch (type) {
        case "strength":
          return {
            numberOfSets: userStrengthSets?.length,
            userSetListComponent: WorkoutStartUserStrengthSet,
            userSetListData: userStrengthSets?.sort(
              (a, b) => (a?.order || 0) - (b?.order || 0)
            ),
            isFinished: userStrengthSets
              ?.filter((set) => !set.isWarmup)
              .every((set) => set?.isCompleted),
            isSkipped: userStrengthSets?.every(
              (set) => set?.skippedReason?.length
            ),
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
    },
    []
  );

  const exerciseConfig = useMemo(
    () => getExerciseConfig(type ?? "strength", userWorkoutExercise),
    [type, userWorkoutExercise]
  );

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
    exerciseConfig?.isFinished ? "border-success-green" : "",
    exerciseConfig?.isSkipped ? "border-warning-yellow" : "",
    isError ? "border-error-red " : "",
    isOpen ? "h-fit  z-10" : "h-20 min-h-20 overflow-hidden"
  );

  const divClass = twMerge(
    "gap-2 justify-items-center w-full transition-all duration-500 relative",
    isOpen ? "flex flex-col opacity-100 h-fit pb-4" : "opacity-0 h-auto"
  );

  const modelButtonStyle = twMerge(
    "w-full flex items-center h-16 transition-all duration-300",
    isOpen ? "border-b " : "",
    isError ? "text-error-red " : ""
  );

  const iconArrowStyle = twMerge(
    "w-8 aspect-square ml-auto transition-all duration-300 stroke-none fill-main-orange",
    isOpen ? "rotate-180" : ""
  );

  //INFO:I think i found to worst way to clean duplications
  const skippedReason =
    Array.from(
      new Set([
        ...(exerciseConfig?.userSetListData?.map((set) => set.skippedReason) ??
          []),
      ])
    ).join(", ") ?? "";

  return (
    <li className={liStyle}>
      <Button onClick={handleModel} className={modelButtonStyle}>
        <div className="inline-flex flex-col text-start">
          <span className="inline-flex items-center gap-2">
            <h4>{toTitle(exerciseName)}</h4>
            {exerciseConfig?.isFinished ? (
              <IconCheckMark className="w-4 aspect-square fill-success-green" />
            ) : (
              <IconInactive className="w-4 aspect-square fill-error-red" />
            )}
          </span>
          <p>Sets: {exerciseConfig?.numberOfSets}</p>
        </div>

        <IconArrow className={iconArrowStyle} />
      </Button>

      <div className={divClass}>
        <WorkoutStartExerciseVideo youtubeUrl={youtubeUrl} />

        {notes && <WorkoutStartExerciseItemNotes notes={notes} />}

        <GenericList<IUserCardioSetEditDTO | IUserStrengthSetEditDTO, any>
          items={exerciseConfig?.userSetListData ?? []}
          ItemComponent={exerciseConfig.userSetListComponent}
          itemComponentProps={{
            errors: errors?.userStrengthSets || errors?.userCardioSets,
          }}
          getKey={(item) => item.id!}
          ulStyle="h-full flex flex-col gap-2"
        />

        <div className="flex w-full gap-8 text-black">
          <GenericModel
            Model={WorkoutStartExerciseSkipEdit}
            modelProps={{
              skippedReason,
              handleUserSetSkip: skipAllExerciseSets!,
              userSetId: userWorkoutExerciseId,
              handleParentModel: handleModel,
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
            onClick={() => completeAllExerciseSets!(userWorkoutExerciseId!)}
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

export default memo(WorkoutStartExercise);
