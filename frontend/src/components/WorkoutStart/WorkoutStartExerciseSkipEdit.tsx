
import Button from "../UI/Button";
import Label from "../UI/Form/Label";
import TextArea from "../UI/Form/TextArea";

import type { IModelProps } from "../UI/GenericModel";

interface IWorkoutStartExerciseSkipEditProps
  extends IModelProps<HTMLDivElement> {
  handleUserStrengthSetsChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  skippedReason?: string | null;
  userSetId?: string;
}
export default function WorkoutStartExerciseSkipEdit({
  handleUserStrengthSetsChange,
  skippedReason,
  userSetId,
  ...modelProps
}: IWorkoutStartExerciseSkipEditProps) {
  const { setIsOpen, modelRef } = modelProps;
  const textAreaId = "skippedReason-" + userSetId;

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const event = {
      target: {
        value: "",
        name: textAreaId,
        id: textAreaId,
      },
      preventDefault: e.preventDefault,
      stopPropagation: e.stopPropagation,
    } as React.ChangeEvent<HTMLTextAreaElement>;

    handleUserStrengthSetsChange && handleUserStrengthSetsChange(event);
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
        onChange={handleUserStrengthSetsChange}
        value={skippedReason ?? ""}
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
          onClick={() => {
            if (setIsOpen) setIsOpen(false);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
