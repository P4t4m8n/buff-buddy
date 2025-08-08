import { useNavigate, useParams } from "react-router";

import Loader from "../UI/Loader";
import WorkoutEditHeader from "./WorkoutEditHeader";

import { useWorkoutEdit } from "../../hooks/features/workout/useWorkoutEdit";
import WorkoutExerciseEditList from "./WorkoutExercise/WorkoutExerciseEdit/WorkoutExerciseEditList";
import type { IModelProps } from "../UI/GenericModel";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";

interface WorkoutCreateProps extends IModelProps<HTMLFormElement> {
  workout?: IWorkoutDTO | IWorkoutEditDTO;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterSubmit?: (workout: IWorkoutDTO) => void;
}

export default function WorkoutEdit({
  workout,
  handleModel,
  afterSubmit,
  ...props
}: WorkoutCreateProps) {
  const { id } = useParams<{ id?: string }>();
  const { setOpen } = props;
  const navigate = setOpen ? null : useNavigate();

  const {
    workoutToEdit,
    isLoading,
    errors,
    handleWorkoutExercises,
    handleInputChange,
    onSubmit,
  } = useWorkoutEdit(workout, navigate, id, setOpen, afterSubmit);

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

  return (
    <form
      onSubmit={onSubmit}
      className="h-main p-1 py-2 grid grid-cols-1 grid-rows-[21rem_calc(100%-22rem)]
                 gap-4 fixed inset-0 bg-black-500 w-full z-20"
    >
      <WorkoutEditHeader
        workoutId={workoutToEdit.id}
        name={name}
        notes={notes}
        handleInputChange={handleInputChange}
        onCancel={onCancel}
        workoutExerciseLength={(cleanedWorkoutExercises?.length || 0) + 1}
        handleWorkoutExercises={handleWorkoutExercises}
      />
      <WorkoutExerciseEditList
        workoutExercises={cleanedWorkoutExercises || []}
        handleWorkoutExercises={handleWorkoutExercises}
      />
    </form>
  );
}
