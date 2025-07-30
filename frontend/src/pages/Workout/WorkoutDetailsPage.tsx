import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useWorkoutStore } from "../../store/workout.store";
import Loader from "../../components/UI/Loader";
import ItemNotFound from "../../components/UI/ItemNotFound";
import type { IWorkoutDTO } from "../../../../shared/models/workout.model";
import Button from "../../components/UI/Button";

//TODO??Implement  workout details
export default function WorkoutDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [workoutToView, setWorkoutToView] = React.useState<IWorkoutDTO | null>(
    null
  );
  const getWorkoutById = useWorkoutStore((state) => state.getById);
  const isLoadingId = useWorkoutStore((state) => state.isLoadingId === id);

  useEffect(() => {
    getWorkoutById(id).then((w) => {
      setWorkoutToView(w);
    });
  }, [id, getWorkoutById]);

  if (isLoadingId) {
    return <Loader />;
  }

  if (!workoutToView) {
    return <ItemNotFound itemName="Workout" />;
  }

  return (
    <div className="absolute inset-0 h-full bg-main-orange p-mobile">
      <h2>WorkoutDetails -TBA</h2>
      <p>{id}</p>
      <p>{workoutToView.name}</p>
      <Button buttonStyle="save" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}
