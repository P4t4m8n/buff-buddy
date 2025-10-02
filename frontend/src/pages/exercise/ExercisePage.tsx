//Core
import { Outlet } from "react-router";
//Components
import ExerciseList from "../../components/Exercise/ExerciseList";
import LinkComponent from "../../components/UI/Link";
import BackButton from "../../components/UI/BackButton";
//Types
import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import type { TExerciseActionRoute } from "../../models/exercise.model";

interface IExercisePageProps {
  selectExercise?: (exercise?: IExerciseDTO) => void;
  actionType?: TExerciseActionRoute;
}

export default function ExercisePage({
  selectExercise,
  actionType,
}: IExercisePageProps) {
  return (
    <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <header className="inline-flex items-center gap-4 border-b  border-b-main-orange/25 px-desktop py-2 col-span-full ">
        <BackButton />
        <h2 className="text-2xl font-bold col-span-full text-center ">
          Exercises
        </h2>
        <LinkComponent
          to="/exercises/edit"
          className="bg-main-orange border border-black-300 text-black-900 rounded flex-center px-2 h-full ml-auto"
        >
          <p>Create Exercise</p>
        </LinkComponent>
      </header>

      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
        <ExerciseList selectExercise={selectExercise} actionType={actionType} />
      </div>
      <Outlet />
    </section>
  );
}
