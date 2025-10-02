//Lib
import { useParams } from "react-router";
//Components
import WorkoutDetails from "../../components/Workout/WorkoutDetails";

export default function WorkoutDetailsPage() {
  const { workoutId } = useParams<{ workoutId?: string }>();

  return <WorkoutDetails workoutId={workoutId} />;
}
