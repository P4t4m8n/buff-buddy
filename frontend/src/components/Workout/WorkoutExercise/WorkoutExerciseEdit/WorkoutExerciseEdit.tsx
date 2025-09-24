import { useWorkoutExerciseEdit } from "../../../../hooks/features/program/useWorkoutExerciseEdit";
import { useErrors } from "../../../../hooks/shared/useErrors";
import { toTitle } from "../../../../utils/toTitle";
import { workoutExerciseValidation } from "../../../../../../shared/validations/workoutExercise.validations";

import WorkoutExerciseEditAddExercise from "./WorkoutExerciseEditAddExercise";
import WorkoutExerciseEditExerciseSelect from "./WorkoutExerciseEditExerciseSelect";

import SelectWithSearch from "../../../UI/Form/SelectWithSearch/SelectWithSearch";
import InputWithError from "../../../UI/Form/InputWithError";
import Label from "../../../UI/Form/Label";
import TextArea from "../../../UI/Form/TextArea";
import Button from "../../../UI/Button";
import Loader from "../../../UI/loader/Loader";

import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";
import type { IModelProps } from "../../../../models/UI.model";
import YoutubePlayer from "../../../UI/YoutubePlayer";

interface WorkoutExerciseEditProps extends IModelProps<HTMLDivElement> {
  workoutExercise?: IWorkoutExerciseEditDTO;
  workoutExerciseLength?: number;
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
}
export default function WorkoutExerciseEdit({
  workoutExercise,
  workoutExerciseLength,
  handleWorkoutExercises,
  ...props
}: WorkoutExerciseEditProps) {
  const {
    handleSelectExercise,
    handleInputChange,
    workoutExerciseToEdit,
    exercises,
    resetWorkoutExerciseToEdit,
  } = useWorkoutExerciseEdit(workoutExercise, workoutExerciseLength);

  const { errors: workoutExerciseErrors, handleError } =
    useErrors<IWorkoutExerciseEditDTO>();

  const { modelRef, setIsOpen } = props;

  const onUpsertWorkoutExercise = (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (!workoutExerciseToEdit) return;

      const weToUpsert: IWorkoutExerciseEditDTO = {
        ...workoutExerciseToEdit,
        crudOperation: !workoutExerciseToEdit?.id?.startsWith("temp")
          ? "update"
          : "create",
      };

      const { id } = weToUpsert;
      if (!id || id.startsWith("temp")) {
        workoutExerciseValidation
          .createFactorySchema({ toSanitize: false })
          .parse(weToUpsert);
      } else {
        workoutExerciseValidation
          .updateFactorySchema({ toSanitize: false })
          .parse(weToUpsert);
      }

      handleWorkoutExercises(weToUpsert);
      resetWorkoutExerciseToEdit();
      if (setIsOpen) setIsOpen(false);
    } catch (error) {
      handleError({ error });
    }
  };

  const onDeleteWorkoutExercise = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const peToRemove: IWorkoutExerciseEditDTO = {
      ...workoutExerciseToEdit!,
      crudOperation: "delete",
      order: null,
    };
    handleWorkoutExercises(peToRemove);
    if (setIsOpen) setIsOpen(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    resetWorkoutExerciseToEdit();
    if (setIsOpen) setIsOpen(false);
  };

  if (!workoutExerciseToEdit) return <Loader />;

  const {
    order,
    notes,
    exercise,
    isBodyWeight,
    hasWarmup,
    id: WorkoutExerciseId,
  } = workoutExerciseToEdit;

  return (
    <div
      ref={modelRef}
      className={`flex flex-col w-[calc(100%-1rem)] max-w-96 grid-cols-1  bg-black-400 border
         rounded  gap-4`}
    >
      <div className=" flex flex-col items gap-4 w-full justify-around px-4 pt-4">
        <InputWithError
          divStyle=" grid grid-cols-[auto_auto_1fr] justify-end gap-2 items-center"
          inputProps={{
            name: "order",
            type: "number",
            defaultValue:
              order && order >= 1 ? order : workoutExerciseLength ?? 1,
            className:
              "border w-[4ch] aspect-square rounded text-center order-2  ",
            min: 1,
            onChange: handleInputChange,
          }}
          labelProps={{
            labelPosition: "input",
            className: "order-1",
            htmlFor: "order",
            children: "Order:",
          }}
          error={workoutExerciseErrors?.order}
        />

        <TextArea
          defaultValue={notes ?? ""}
          name="notes"
          rows={3}
          placeholder=""
          className="w-full h-28 block peer outline-offset-0 p-2 resize-none border-1 rounded "
          divStyle="  h-auto col-span-full relative group "
          onChange={handleInputChange}
        >
          <Label labelPosition="textArea" isMoveUpEffect={true} htmlFor="note">
            Notes
          </Label>
          {workoutExerciseErrors?.notes ? (
            <Label htmlFor="order" className=" text-sm text-red-orange">
              {workoutExerciseErrors?.notes}
            </Label>
          ) : null}
        </TextArea>

        <SelectWithSearch
          options={exercises}
          SelectedComponent={
            exercise?.id ? toTitle(exercise?.name) : "Select an Exercise"
          }
          handleSelect={handleSelectExercise}
          parentModelRef={modelRef}
          AddComponent={WorkoutExerciseEditAddExercise}
          SelectItemComponent={WorkoutExerciseEditExerciseSelect}
          filterBy={(option) => option.name!}
          error={workoutExerciseErrors?.exerciseData}
        />
        <div className=" col-span-full grid grid-cols-2 gap-4">
          <InputWithError
            divStyle=""
            inputProps={{
              name: "hasWarmup",
              type: "checkbox",
              checked: !!hasWarmup,
              className: " ",
              id: "hasWarmUp-" + WorkoutExerciseId,
              onChange: handleInputChange,
            }}
            labelProps={{
              labelPosition: "input",
              className: "",
              htmlFor: "hasWarmup-" + WorkoutExerciseId,
              children: "Warm up?:",
            }}
            error={workoutExerciseErrors?.hasWarmup}
          />
          <InputWithError
            divStyle=""
            inputProps={{
              name: "isBodyWeight",
              type: "checkbox",
              checked: !!isBodyWeight,
              className: " ",
              id: "isBodyWeight-" + WorkoutExerciseId,
              onChange: handleInputChange,
            }}
            labelProps={{
              labelPosition: "input",
              className: "",
              htmlFor: "isBodyWeight-" + WorkoutExerciseId,
              children: "Body Wight?:",
            }}
            error={workoutExerciseErrors?.isBodyWeight}
          />
        </div>
      </div>
      {exercise ? (
        <div
          className="bg-black-500 border p-4 grid gap-4 rounded w-[calc(100%-1rem)]
      "
        >
          <h3>{toTitle(exercise.name)}</h3>
          <YoutubePlayer youtubeUrl={exercise.youtubeUrl!} />
          <p>{toTitle(exercise.muscles?.join(", "))}</p>
          <p>{toTitle(exercise.equipment?.join(", "))}</p>
          <p>{toTitle(exercise.type)}</p>
        </div>
      ) : null}

      <div className="col-span-full w-full flex justify-between px-4 pb-4 mt-auto">
        <Button buttonStyle="warning" onClick={onCancel}>
          Cancel
        </Button>
        <div className="inline-flex gap-2">
          <Button buttonStyle="warning" onClick={onDeleteWorkoutExercise}>
            Delete
          </Button>

          <Button
            type="button"
            buttonStyle="save"
            onClick={onUpsertWorkoutExercise}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
