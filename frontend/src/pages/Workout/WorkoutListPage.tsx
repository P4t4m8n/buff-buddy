//Components
import WorkoutList from "../../components/Workout/WorkoutList";
import { WORKOUT_ROUTES } from "../../consts/routes.const";
import PageHeader from "../../components/UI/PageHeader";

export default function WorkoutListPage() {
  return (
    <div className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <PageHeader
        pageName="workout"
        editLink={WORKOUT_ROUTES.WORKOUT_EDIT_ROUTE}
      />

      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
        <WorkoutList actionType="workoutList" />
      </div>
    </div>
  );
}
