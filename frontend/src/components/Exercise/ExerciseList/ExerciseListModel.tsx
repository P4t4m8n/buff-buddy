//Components
import ExerciseList from "./ExerciseList";
import ExerciseEdit from ".././ExerciseEdit/ExerciseEdit";
//UI
import GenericModel from "../../UI/GenericModel";
import PageHeader from "../../UI/PageHeader";
//Types
import type { IModelProps } from "../../../models/model.model";
import type { IExerciseDTO } from "../../../../../shared/models/exercise.model";

interface IExerciseListModelProps extends IModelProps<HTMLDivElement> {
  selectExercise?: (exercise?: IExerciseDTO | null) => void;
}
export default function ExerciseListModel({
  selectExercise,
  ...props
}: IExerciseListModelProps) {
  const { setIsOpen, handleModel, modelRef } = props;

  const onSelectExercise = (exercise?: IExerciseDTO | null) => {
    selectExercise!(exercise);
    setIsOpen!(false);
  };
  return (
    <section
      ref={modelRef}
      className="h-main z-50 inset-0 fixed w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 "
    >
      <PageHeader
        pageName="exercise edit"
        handleModel={handleModel}
        EditModel={
          <GenericModel
            Model={ExerciseEdit}
            parentRef={modelRef}
            isPortal={true}
            isOverlay={true}
            buttonProps={{
              className:
                "bg-main-orange border border-black-300 text-black-900 rounded flex-center px-2 h-full w-fit ml-auto",
              children: "Create Exercise",
              buttonStyle: "save",
              type: "button",
            }}
          />
        }
      />

      <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4 ">
        <ExerciseList
          selectExercise={onSelectExercise}
          actionType="workoutExerciseEditList"
        />
      </div>
    </section>
  );
}
