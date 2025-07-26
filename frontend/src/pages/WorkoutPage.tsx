import { useEffect } from "react";
import { useWorkoutStore } from "../store/workout.store";
import GenericDeleteButton from "../components/UI/GenericDeleteButton";

//TODO?? implement WorkoutPage
export default function WorkoutPage() {
  // const workouts = useWorkoutStore((state) => state.workouts);
  // const loadWorkouts = useWorkoutStore((state) => state.loadWorkouts);
  // const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);

  // const onDeleteWorkout = async (id?: string) => {
  //   if (id) {
  //     deleteWorkout(id);
  //   }
  // };

  // useEffect(() => {
  //   // loadWorkouts();
  // }, []);
  return (
    <section className="h-main">
      {/* <ul>
        {workouts.map((workout) => (
          <li key={workout.id}>
            <p>{workout.name}</p>
            <GenericDeleteButton
              itemId={workout.id}
              useStore={useWorkoutStore}
              deleteAction={onDeleteWorkout}
            />
          </li>
        ))}
      </ul> */}
    </section>
  );
}
