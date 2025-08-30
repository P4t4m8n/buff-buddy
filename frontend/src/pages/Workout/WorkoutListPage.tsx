import WorkoutList from "../../components/Workout/WorkoutList";
import LinkComponent from "../../components/UI/Link";
import BackButton from "../../components/UI/BackButton";

export default function WorkoutListPage() {
  return (
    <div className="h-main p-2 grid-stack z-10 bg-black-900">
      <header className="grid grid-cols-2 gap-2">
        <h2 className="text-xl font-bold col-span-full text-center ">
          Workout List
        </h2>
        <BackButton />
        <LinkComponent
          to="/workouts/edit"
          className="border border-main-orange rounded flex-center px-2"
        >
          <p>Create Workout</p>
        </LinkComponent>
      </header>
      <WorkoutList actionType="workoutList" />
    </div>
  );
}
