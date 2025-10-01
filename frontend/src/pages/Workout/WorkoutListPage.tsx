import WorkoutList from "../../components/Workout/WorkoutList";
import LinkComponent from "../../components/UI/Link";
import BackButton from "../../components/UI/BackButton";

export default function WorkoutListPage() {
  return (
    <div className="h-main w-full  bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
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
      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
        <WorkoutList actionType="workoutList" />
      </div>
    </div>
  );
}
