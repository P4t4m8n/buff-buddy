import WorkoutList from "../../components/Workout/WorkoutList";
import LinkComponent from "../../components/UI/Link";
import BackButton from "../../components/UI/BackButton";

export default function WorkoutListPage() {
  return (
    <div className="h-main w-full grid-stack z-10 bg-black-900 grid grid-rows-[3.5rem_calc(100%-3.5rem)] ">
      <header className="inline-flex items-center gap-4 border-b  border-b-main-orange/25 px-desktop py-2  col-span-full ">
        <BackButton />
        <h2 className="text-2xl font-bold col-span-full text-center ">
          Workouts
        </h2>
        <LinkComponent
          to="/workouts/edit"
          className="bg-main-orange border border-black-300 text-black-900 rounded flex-center px-2 h-full ml-auto"
        >
          <p>Create Workout</p>
        </LinkComponent>
      </header>
      <div className="grid grid-rows-[auto_1fr] h-full md:grid-rows-1 md:grid-cols-[auto_1fr] relative">
        <WorkoutList actionType="workoutList" />
      </div>
    </div>
  );
}
