//Core
import { Outlet } from "react-router";
//Components
import ExerciseList from "../../components/Exercise/ExerciseList/ExerciseList";
import PageHeader from "../../components/UI/PageHeader";
//Consts
import { EXERCISE_ROUTES } from "../../consts/routes.const";
//Types
import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import type { TExerciseActionRoute } from "../../models/exercise.model";

interface IExercisePageProps {
  selectExercise?: (exercise?: IExerciseDTO | null) => void;
  actionType?: TExerciseActionRoute;
}

export default function ExercisePage({
  selectExercise,
  actionType,
}: IExercisePageProps) {
  return (
    <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <PageHeader
        pageName="exercises"
        editLink={EXERCISE_ROUTES.EXERCISE_EDIT_ROUTE}
      />

      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
        <ExerciseList selectExercise={selectExercise} actionType={actionType} />
      </div>
      <Outlet />
    </section>
  );
}
