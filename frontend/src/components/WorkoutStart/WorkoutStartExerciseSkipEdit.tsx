import { useRef } from "react";

import Button from "../UI/Button";
import Label from "../UI/Form/Label";
import TextArea from "../UI/Form/TextArea";

import type { IModelProps } from "../UI/GenericModel";
import type { IHandleUserSetSkipProps } from "../../models/workoutStart.model";

interface IWorkoutStartExerciseSkipEditProps
  extends IModelProps<HTMLDivElement> {
  handleUserSetSkip: ({
    userWorkoutExerciseId,
    userSetId,
    skippedReason,
  }: IHandleUserSetSkipProps) => void;
  skippedReason?: string | null;
  userSetId?: string;
  userWorkoutExerciseId?: string;
}
export default function WorkoutStartExerciseSkipEdit({
  handleUserSetSkip,
  skippedReason,
  userSetId,
  userWorkoutExerciseId,
  ...modelProps
}: IWorkoutStartExerciseSkipEditProps) {
  const { setIsOpen, modelRef } = modelProps;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const textAreaId = "skippedReason-" + userSetId;

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!setIsOpen) {
      console.warn("setIsOpen is not defined, skipping close action");
      return;
    }
    setIsOpen(false);
  };

  const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { current } = textAreaRef;

    if (!current || !userWorkoutExerciseId || !userSetId) {
      console.warn("Skipped user exercise textarea props not defined"); //INFO Debugging
      return;
    }

    const value = current.value;

    handleUserSetSkip({
      userWorkoutExerciseId,
      skippedReason: value,
      userSetId,
    });

    if (!setIsOpen) {
      console.warn("setIsOpen is not defined, skipping close action");
      return;
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={modelRef}
      className="bg-black-500 p-4 grid gap-4 rounded w-[calc(100%-1rem)]
                   max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border"
    >
      <TextArea
        ref={textAreaRef}
        defaultValue={skippedReason ?? ""}
        name={textAreaId}
        id={textAreaId}
        rows={3}
        placeholder=""
        className="w-full h-full block peer outline-offset-0 pl-2 peer resize-none font-extralight text-xl pt-2"
        divStyle="border-1 relative rounded h-full  "
      >
        <Label
          labelPosition="textArea"
          isMoveUpEffect={true}
          htmlFor={textAreaId}
        >
          Reason for Skipping
        </Label>
      </TextArea>
      <div className="inline-flex  justify-between w-full">
        <Button
          buttonStyle="model"
          className="text-black px-2 "
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          buttonStyle="model"
          className="text-black px-2"
          onClick={onSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
