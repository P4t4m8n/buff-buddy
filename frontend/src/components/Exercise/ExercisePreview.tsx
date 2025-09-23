import { useExerciseStore } from "../../store/exercise.store";

import GenericDeleteButtonOld from "../UI/GenericDeleteButtonOld";
import ExerciseDetails from "./ExerciseDetails";
import ExerciseEdit from "./ExerciseEdit";
import ExerciseAttributes from "./ExerciseTagPanel/ExerciseTagPanel";
import GenericModel from "../UI/GenericModel";

import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { toTitle } from "../../utils/toTitle";
interface ExercisePreviewProps {
  item: IExerciseDTO;
  onDelete: (id?: string) => Promise<void>;
}
export default function ExercisePreview({
  item: exercise,
  onDelete,
}: ExercisePreviewProps) {
  const { muscles, id, name, equipment } = exercise;

  return (
    <li
      key={id}
      className="border rounded p-2 shadow break-inside-avoid 
       flex flex-col gap-2 h-fit"
    >
      <h3 className=" truncate">{toTitle(name)}</h3>
      <ExerciseAttributes muscles={muscles} equipment={equipment} />
      <div className="flex gap-3 ">
        {/* 
        //INFO: Exercise Details Model
         */}
        <GenericModel
          Model={ExerciseDetails}
          mode="details"
          modelProps={{ exercise }}
          buttonProps={{ className: " mr-auto", buttonStyle: "model" }}
        />

        {/*
        //INFO: Exercise Edit Model
         */}
        <GenericModel
          modelProps={{ exercise }}
          Model={ExerciseEdit}
          mode="edit"
          buttonProps={{
            buttonStyle: "model",
          }}
        />
        <GenericDeleteButtonOld
          itemId={id}
          useStore={useExerciseStore}
          deleteAction={onDelete}
        />
      </div>
    </li>
  );
}
