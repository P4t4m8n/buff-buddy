import { useNavigate, useParams } from "react-router";
import Button from "../../components/UI/Button";
import GenericSaveButton from "../../components/UI/GenericSaveButton";
import type { IWorkoutStartDTO } from "../../../../shared/models/workoutStart.model";
import React, { useEffect } from "react";
import { useWorkoutStore } from "../../store/workout.store";
import { workoutStartUtil } from "../../utils/workoutStart.util";
import Loader from "../../components/UI/Loader";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import type { IDateRange } from "../../models/calendar.model";
import { useFormErrors } from "../../hooks/shared/useFormErrors";
import WorkoutStartExerciseList from "../../components/WorkoutStart/WorkoutStartExerciseList";

export default function WorkoutStartPage() {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const [workoutStart, setWorkoutStart] =
    React.useState<IWorkoutStartDTO | null>(null);
  const { errors } = useFormErrors<IWorkoutStartDTO>();
  console.log("🚀 ~ WorkoutStartPage ~ workoutStart:", workoutStart);

  const getById = useWorkoutStore((state) => state.getById);

  const isLoadingId = useWorkoutStore((state) => state.isLoadingId === id);

  useEffect(() => {
    getById(id).then((w) => {
      if (!w) {
        console.error("Workout not found");
        return;
      }
      const workout = workoutStartUtil.workoutDTOToWorkoutStartDTO(w);
      setWorkoutStart(workout);
    });
  }, [id, getById]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();
    } catch (error) {
      console.error("Error submitting workout start:", error);
    }
  };

  const handleDateSelect = ({ start }: IDateRange) => {
    setWorkoutStart((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        dateCompleted: start,
      };
    });
  };

  if (isLoadingId) {
    return <Loader />;
  }

  const { workoutExercises, workout } = workoutStart ?? {};
  const { name } = workout ?? {};

  return (
    <form
      onSubmit={onSubmit}
      className="absolute inset-0 h-full bg-main-orange p-mobile"
    >
      <h2>{name}</h2>
      <DateInput
        handleDateSelect={handleDateSelect}
        selectedRange={{ start: workoutStart?.dateCompleted }}
        className=" "
        initialMode="single"
        errorRange={{
          startDate: errors?.dateCompleted,
        }}
      />
      <WorkoutStartExerciseList workoutExercises={workoutExercises ?? []} />
      <div>
        <Button buttonStyle="save" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <GenericSaveButton
          itemId={id}
          useStore={useWorkoutStore}
          type="submit"
        />
      </div>
    </form>
  );
}
