import ExerciseList from "./ExerciseList";
import type { IModelProps } from "../../models/UI.model";
import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import BackButton from "../UI/BackButton";
import GenericModel from "../UI/GenericModel";
import ExerciseEdit from "./ExerciseEdit";
import Button from "../UI/Button";
import IconArrow from "../UI/Icons/IconArrow";

interface IExerciseListModelProps extends IModelProps<HTMLFormElement> {
  selectExercise?: (exercise?: IExerciseDTO) => void;
}
export default function ExerciseListModel({
  selectExercise,
  ...props
}: IExerciseListModelProps) {
  const { setIsOpen, handleModel } = props;

  const onSelectExercise = (exercise?: IExerciseDTO) => {
    selectExercise!(exercise);
    setIsOpen!(false);
  };
  return (
    <section className="h-main z-50 fixed w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 ">
      <header className="inline-flex items-center gap-4 border-b  border-b-main-orange/25 px-desktop py-2  col-span-full ">
        <Button
          className="border-main-orange border rounded-full w-8 aspect-auto -rotate-90"
          onClick={handleModel}
        >
          <IconArrow className="w-full aspect-square fill-main-orange" />
        </Button>
        <h2 className="text-2xl font-bold col-span-full text-center ">
          Exercises
        </h2>
        <GenericModel
          Model={ExerciseEdit}
          isPortal={true}
          buttonProps={{
            className: "bg-main-orange border border-black-300 text-black-900 rounded flex-center px-2 h-full ml-auto",
          }}
        />
      </header>

      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
        <ExerciseList
          selectExercise={onSelectExercise}
          actionType="workoutEdit"
        />
      </div>
    </section>
  );
}
