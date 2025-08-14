import { useWorkoutStore } from "../../store/workout.store";
import WorkoutExerciseEdit from "./WorkoutExercise/WorkoutExerciseEdit/WorkoutExerciseEdit";
import WorkoutExerciseEditList from "./WorkoutExercise/WorkoutExerciseEdit/WorkoutExerciseEditList";

import Button from "../UI/Button";
import InputWithError from "../UI/Form/InputWithError";
import Label from "../UI/Form/Label";
import TextArea from "../UI/Form/TextArea";
import GenericModel from "../UI/GenericModel";
import GenericSaveButton from "../UI/GenericSaveButton";
import Loader from "../UI/loader/Loader";

import type {
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../../shared/models/workout.model";
import type { TErrors } from "../../models/errors.model";

interface IWorkoutEditProps {
  workoutToEdit?: IWorkoutEditDTO | null;
  isLoading?: boolean;
  errors: TErrors<IWorkoutEditDTO> | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function WorkoutEdit({
  workoutToEdit,
  isLoading,
  errors,
  onSubmit,
  handleInputChange,
  handleWorkoutExercises,
  onCancel,
}: IWorkoutEditProps) {
  if (!workoutToEdit || isLoading) {
    return <Loader loaderType="screen" />;
  }

  const { notes, workoutExercises, name, id: workoutToEditId } = workoutToEdit;
  const cleanedWorkoutExercises = workoutExercises
    ?.filter((ex) => ex.crudOperation !== "delete")
    .sort((a, b) => (a?.order || 0) - (b?.order || 0));

  const parseWorkoutExerciseError = (
    workoutExerciseErrors?: (TErrors<IWorkoutExerciseEditDTO> | string)[] | null
  ) => {
    if (!workoutExerciseErrors) return null;

    const flattenErrors = (obj: any, path: string = ""): string[] => {
      return Object.entries(obj).flatMap(([key, value]) => {
        const newPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          return `${newPath}: ${value}`;
        }
        if (typeof value === "object" && value !== null) {
          return flattenErrors(value, newPath);
        }
        return [];
      });
    };

    return workoutExerciseErrors.map((ex, idx) => {
      if (!ex) return null;

      if (typeof ex === "string") {
        return (
          <div key={idx} className="text-error-red text-sm px-2">
            {ex}
          </div>
        );
      }

      const messages = flattenErrors(ex);
      if (messages.length === 0) return null;

      return (
        <div key={idx} className="text-error-red text-sm px-2">
          <p>Error in exercise {idx + 1}:</p>
          <ul className="list-disc list-inside">
            {messages.map((msg, msgIdx) => (
              <li key={msgIdx}>{msg}</li>
            ))}
          </ul>
        </div>
      );
    });
  };

  const workoutExerciseLength = (cleanedWorkoutExercises?.length || 0) + 1;
  return (
    <form
      onSubmit={onSubmit}
      className="h-main p-1 py-2 grid grid-cols-1 grid-rows-[21rem_auto_calc(100%-22rem)]
                 gap-4 bg-black-500 w-full z-20"
    >
      <header className="flex flex-col gap-2 w-full">
        <h3 className="text-center text-2xl">Create Workout</h3>
        <InputWithError
          inputProps={{
            value: name || "",
            type: "text",
            name: "name",
            id: "name-" + workoutToEditId,
            placeholder: "",
            className: "h-10 pl-2",

            onChange: handleInputChange,
          }}
          labelProps={{
            labelPosition: "input",
            htmlFor: "name-" + workoutToEditId,
            children: "Workout Name",
            isMoveUpEffect: true,
          }}
          divStyle=" h-fit"
          error={errors?.name}
        />

        <TextArea
          value={notes || ""}
          name="notes"
          id={"notes-" + workoutToEditId}
          rows={3}
          placeholder=""
          className="w-full h-full block peer outline-offset-0 p-2 resize-none border-1 rounded  "
          divStyle="  h-auto col-span-full relative group "
          onChange={handleInputChange}
        >
          <Label
            labelPosition="textArea"
            isMoveUpEffect={true}
            htmlFor={"notes-" + workoutToEditId}
          >
            Notes
          </Label>
        </TextArea>

        <div className="grid grid-cols-2 h-10 justify-around">
          <GenericModel
            Model={WorkoutExerciseEdit}
            modelProps={{ handleWorkoutExercises, workoutExerciseLength }}
            mode="create"
            buttonProps={{ buttonStyle: "model", className: "lg:h-10" }}
          />

          <div className="grid grid-cols-[4rem_4rem] gap-2 place-self-end h-full ">
            <Button
              onClick={onCancel}
              buttonStyle="warning"
              className="h-full "
            >
              Cancel
            </Button>
            <GenericSaveButton
              useStore={useWorkoutStore}
              itemId={workoutToEditId}
            />
          </div>
        </div>
      </header>
      {errors?.workoutExercises &&
      typeof errors.workoutExercises === "string" ? (
        <span className="text-error-red text-sm px-2">
          {errors.workoutExercises}
        </span>
      ) : (
        <span className="text-error-red text-sm px-2">
          {Array.isArray(errors?.workoutExercises)
            ? parseWorkoutExerciseError(errors?.workoutExercises)
            : errors?.workoutExercises}
        </span>
      )}
      <WorkoutExerciseEditList
        workoutExercises={cleanedWorkoutExercises || []}
        handleWorkoutExercises={handleWorkoutExercises}
      />
    </form>
  );
}
