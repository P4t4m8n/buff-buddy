import { useNavigate, useParams } from "react-router";

import Loader from "../UI/Loader";
import WorkoutEditHeader from "./WorkoutEditHeader";

import { useWorkoutEdit } from "../../hooks/features/workout/useWorkoutEdit";
import WorkoutExerciseEditList from "./WorkoutExercise/WorkoutExerciseEdit/WorkoutExerciseEditList";
import type { IModelProps } from "../UI/GenericModel";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../../shared/models/workout.model";
import type { TErrors } from "../../models/errors.model";

interface WorkoutCreateProps extends IModelProps<HTMLFormElement> {
  workout?: IWorkoutDTO | IWorkoutEditDTO;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterSubmit?: (workout: IWorkoutDTO) => void;
}
//TODO?? Splint into two components for a page and model. move navigation logic into the component instead of the hook
export default function WorkoutEdit({
  workout,
  handleModel,
  afterSubmit,
  ...props
}: WorkoutCreateProps) {
  const { id } = useParams<{ id?: string }>();
  const { setIsOpen } = props;
  const navigate = setIsOpen ? null : useNavigate();

  const {
    workoutToEdit,
    isLoading,
    errors,
    handleWorkoutExercises,
    handleInputChange,
    onSubmit,
  } = useWorkoutEdit(workout, navigate, id, setIsOpen, afterSubmit);
  console.log("🚀 ~ WorkoutEdit ~ errors:", errors);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (handleModel) handleModel(e);
    else if (navigate) navigate(-1);
  };

  if (!workoutToEdit || isLoading) {
    return <Loader />;
  }

  const { notes, workoutExercises, name } = workoutToEdit;
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

  return (
    <form
      onSubmit={onSubmit}
      className="h-main p-1 py-2 grid grid-cols-1 grid-rows-[21rem_auto_calc(100%-22rem)]
                 gap-4 fixed inset-0 bg-black-500 w-full z-20"
    >
      <WorkoutEditHeader
        workoutId={workoutToEdit.id}
        name={name}
        nameError={errors?.name}
        notes={notes}
        handleInputChange={handleInputChange}
        onCancel={onCancel}
        workoutExerciseLength={(cleanedWorkoutExercises?.length || 0) + 1}
        handleWorkoutExercises={handleWorkoutExercises}
      />
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
