import { Fragment, useEffect, useState, type Dispatch } from "react";
import type {
  IWorkoutDTO,
  IWorkoutExerciseDTO,
} from "../../models/workout.model";
import Loader from "../UI/Loader";
import { toTitle } from "../../utils/toTitle";
import WorkoutExercise from "./WorkoutExercise/WorkoutExercise";
import { localStorageService } from "../../services/localStorage.service";
import Button from "../UI/Button";
import { workoutUtils } from "../../utils/workout.util";
import { workoutService } from "../../services/workout.service";

interface IWorkoutEditProps {
  workout: IWorkoutDTO;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function WorkoutEdit({ workout, setIsOpen }: IWorkoutEditProps) {
  const [workoutToEdit, setWorkoutToEdit] = useState<IWorkoutDTO | null>(null);

  useEffect(() => {
    setWorkoutToEdit(workout);
  }, [workout]);

  if (!workoutToEdit) {
    return <Loader />;
  }
  const { program, workoutExercises } = workout;
  const { notes, name } = program;

  const handleWorkoutExercise = (we: IWorkoutExerciseDTO) => {
    setWorkoutToEdit((prev) => {
      if (!prev) return null;

      const updatedExercises = (prev.workoutExercises ?? []).map((exercise) =>
        exercise.exercise.id === we.exercise.id ? we : exercise
      );

      const workout: IWorkoutDTO = {
        ...prev,
        workoutExercises: updatedExercises,
      };

      localStorageService.storeSessionData("workout", workout);

      return workout;
    });
  };

  const onSubmitWorkout = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // const isSetsComplete = workoutToEdit.workoutExercises?.reduce(
      //   (acc, we) => acc && we.sets?.every((set) => set.userSet?.isCompleted),
      //   true
      // );

      const editDto = workoutUtils.dtoToEditDto(workoutToEdit);
      await workoutService.save(editDto);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  return (
    <form
      onSubmit={onSubmitWorkout}
      className="fixed inset-0 h-main flex flex-col gap-4 bg-main-orange z-10 p-4"
    >
      <header className="flex flex-col justify-around h-32">
        <div className="border-b pb-2 inline-flex justify-between items-center">
          <h3 className="  text-2xl ">{toTitle(name)}</h3>
          <Button
            className=" text-amber hover:text-black h-auto  aspect-auto"
            buttonStyle="model"
            type="submit"
          >
            Complete Workout
          </Button>
        </div>
        <article className="inline-flex flex-col gap-2">
          {notes ? (
            <>
              <h5>Notes:</h5>
              <p className="border-dotted border-2 p-2 rounded">{notes}</p>
            </>
          ) : (
            <h5>No Notes</h5>
          )}
        </article>
      </header>
      <ul className="h-full gap-2 flex flex-col overflow-auto ">
        {workoutExercises?.map((workout) => (
          <Fragment key={workout.exercise.id}>
            <WorkoutExercise
              workoutExercise={workout}
              handleWorkoutExercise={handleWorkoutExercise}
            />
          </Fragment>
        ))}
      </ul>
    </form>
  );
}
