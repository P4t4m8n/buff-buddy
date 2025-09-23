import { useNavigate, useParams } from "react-router";
import { useWorkoutStore } from "../../store/workout.store";
import Loader from "../../components/UI/loader/Loader";
import ItemNotFound from "../../components/UI/ItemNotFound";
import Button from "../../components/UI/Button";
import { useItemDetailsOld } from "../../hooks/shared/useItemDetailsOld";

//TODO??Implement  workout details
export default function WorkoutDetailsPage() {
  const { workoutId } = useParams<{ workoutId?: string }>();
  const navigate = useNavigate();

  const { itemToView: workoutToView, isLoadingId } = useItemDetailsOld({
    useStore: useWorkoutStore,
    id: workoutId,
  });

  if (isLoadingId) {
    return <Loader />;
  }

  if (!workoutToView) {
    return <ItemNotFound itemName="Workout" />;
  }

  return (
    <div className="absolute inset-0 h-full background  p-mobile">
      <h2>WorkoutDetails -TBA</h2>
      <p>{workoutId}</p>
      <p>{workoutToView.name}</p>
      <Button buttonStyle="save" onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}
