//Hooks
import { useWorkoutIdQuery } from "../../hooks/features/workout/useWorkoutIdQuery";
import  useItemDetails  from "../../hooks/shared/useItemDetails";
//UI
import BackButton from "../UI/BackButton";
import ItemNotFound from "../UI/ItemNotFound";
import Loader from "../UI/loader/Loader";

interface WorkoutDetailsProps {
  workoutId?: string;
}
//TODO: Implement  workout details
export default function WorkoutDetails({ workoutId }: WorkoutDetailsProps) {
  const { item: workout, isLoading } = useItemDetails({
    useIdQuery: useWorkoutIdQuery,
    itemId: workoutId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!workout) {
    return <ItemNotFound itemName="Workout" />;
  }

  return (
    <div className="absolute inset-0 h-full p-mobile">
      <h2>WorkoutDetails -TBA</h2>
      <p>{workoutId}</p>
      <p>{workout.name}</p>
      <BackButton />
    </div>
  );
}
