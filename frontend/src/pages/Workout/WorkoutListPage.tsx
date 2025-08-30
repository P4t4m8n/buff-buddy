import WorkoutList from "../../components/Workout/WorkoutList";
import { usePageBack } from "../../hooks/shared/usePageBack";
import Button from "../../components/UI/Button";
import IconArrow from "../../components/UI/Icons/IconArrow";
import LinkComponent from "../../components/UI/Link";

export default function WorkoutListPage() {
  const { onBack } = usePageBack();

  return (
    <div className="h-main p-2 grid-stack z-10 bg-black-900">
      <header className="grid grid-cols-2 gap-2">
        <h2 className="text-xl font-bold col-span-full text-center ">
          Workout List
        </h2>
        <Button
          className="border-main-orange border rounded-full w-10 aspect-auto -rotate-90"
          onClick={onBack}
        >
          <IconArrow className="w-full aspect-square fill-main-orange" />
        </Button>
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
