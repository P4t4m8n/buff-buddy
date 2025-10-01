import { useWorkoutExerciseEdit } from "../../../../hooks/features/program/useWorkoutExerciseEdit";
import { useErrors } from "../../../../hooks/shared/useErrors";
import { workoutExerciseValidation } from "../../../../../../shared/validations/workoutExercise.validations";

import Button from "../../../UI/Button";
import Loader from "../../../UI/loader/Loader";

import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";
import type { IModelProps } from "../../../../models/UI.model";
import GenericModel from "../../../UI/GenericModel";
import ExerciseListModel from "../../../Exercise/ExerciseListModel";
import WorkoutExerciseEditExercisePreview from "./WorkoutExerciseEditExercisePreview";
import WorkoutExerciseEditInput from "./WorkoutExerciseEditInput";

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
    selectExercise,
    handleInputChange,
    workoutExerciseToEdit,
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

  const { exercise } = workoutExerciseToEdit;

  return (
    <div
      ref={modelRef}
      className={`flex flex-col w-[calc(100%-1rem)] max-w-96 grid-cols-1 px-4 bg-black-400 border
         rounded  gap-4`}
    >
      <WorkoutExerciseEditInput
        workoutExerciseToEdit={workoutExerciseToEdit}
        handleInputChange={handleInputChange}
        workoutExerciseErrors={workoutExerciseErrors}
      />

      {exercise ? (
        <WorkoutExerciseEditExercisePreview
          selectExercise={selectExercise}
          exercise={exercise}
        />
      ) : (
        <GenericModel
          Model={ExerciseListModel}
          modelProps={{ selectExercise }}
          buttonProps={{ children: "Select Exercise" }}
          isPortal={true}
        />
      )}

      <div className="col-span-full w-full flex justify-between pb-4 mt-auto">
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
