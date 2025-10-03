import { useParams } from "react-router";

import PageHeader from "../../components/UI/PageHeader";

import WorkoutStart from "../../components/WorkoutStart/WorkoutStart";

export default function WorkoutStartPage() {
  const { workoutId } = useParams<{
    programId?: string;
    workoutId?: string;
  }>();

  return (
    <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <PageHeader pageName="Workout start" />
      <WorkoutStart workoutId={workoutId} />
    </section>
  );
}
