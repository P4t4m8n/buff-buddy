import type { MouseEvent } from "react";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import TextArea from "../UI/Form/TextArea";
import Button from "../UI/Button";
import type { IWorkoutExerciseEditDTO } from "../../../../shared/models/workout.model";
import GenericSaveButton from "../UI/GenericSaveButton";
import { useWorkoutStore } from "../../store/workout.store";
import GenericModel from "../UI/GenericModel";
import WorkoutExerciseEdit from "./WorkoutExercise/WorkoutExerciseEdit/WorkoutExerciseEdit";

interface WorkoutEditHeaderProps {
  name?: string | null;
  notes?: string | null;
  workoutId?: string;
  workoutExerciseLength: number;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
}
export default function WorkoutEditHeader({
  name,
  notes,
  workoutId,
  workoutExerciseLength,
  handleInputChange,
  handleWorkoutExercises,
  onCancel,
}: WorkoutEditHeaderProps) {
  return (
    <header className="grid gap-2">
      <h3 className="text-center text-2xl">Create Workout</h3>
      <Input
        value={name || ""}
        type="text"
        name="name"
        id={"name-" + workoutId}
        placeholder=""
        onChange={handleInputChange}
        className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded
              `}
        divStyle=" h-fit"
      >
        <Label
          isMoveUpEffect={true}
          labelPosition="input"
          htmlFor={"name-" + workoutId}
        >
          Workout Name
        </Label>
      </Input>
      <TextArea
        value={notes || ""}
        name="notes"
        id={"notes-" + workoutId}
        rows={3}
        placeholder=""
        className="w-full h-full block peer outline-offset-0 p-2 resize-none border-1 rounded  "
        divStyle="  h-auto col-span-full relative group "
        onChange={handleInputChange}
      >
        <Label
          labelPosition="textArea"
          isMoveUpEffect={true}
          htmlFor={"notes-" + workoutId}
        >
          Notes
        </Label>
      </TextArea>

      <div className="flex w-full h-14">
        <GenericModel
          Model={WorkoutExerciseEdit}
          modelProps={{ handleWorkoutExercises, workoutExerciseLength }}
          mode="create"
          buttonProps={{ buttonStyle: "model", className: "" }}
        />

        <div className="inline-flex items-center gap-2 ml-auto">
          <Button onClick={onCancel} buttonStyle="warning" className="h-full">
            Cancel
          </Button>
          <GenericSaveButton useStore={useWorkoutStore} itemId={workoutId} />
        </div>
      </div>
    </header>
  );
}
