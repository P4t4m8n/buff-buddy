import ExerciseAttributes from "./ExerciseTagPanel/ExerciseTagPanel";

import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { toTitle } from "../../utils/toTitle";
import GenericDeleteButton from "../UI/GenericDeleteButton";
import { useContext } from "react";
import { IsDeletingContext } from "../../hooks/context/IsDeletingContext";
import LinkComponent from "../UI/Link";
interface ExercisePreviewProps {
  item: IExerciseDTO;
  deleteItem: (id?: string) => Promise<void>;
}
export default function ExercisePreview({
  item: exercise,
  deleteItem,
}: ExercisePreviewProps) {
  const { muscles, id, name, equipment } = exercise;
  const isDeleting = useContext(IsDeletingContext);

  return (
    <li
      key={id}
      className="border rounded p-2 shadow break-inside-avoid 
       flex flex-col gap-2 h-fit"
    >
      <h3 className=" truncate">{toTitle(name)}</h3>
      <ExerciseAttributes muscles={muscles} equipment={equipment} />
      <nav className="flex gap-3 ">
        <LinkComponent
          to={`/exercises/${id}`}
          mode="details"
          linkStyle="model"
          className="w-fit mr-auto"
        />

        <LinkComponent
          to={`/exercises/edit/${id}`}
          mode="edit"
          linkStyle="model"
          className="w-fit"
        />
        <GenericDeleteButton
          itemId={id!}
          isDeleting={!!isDeleting}
          deleteAction={deleteItem}
        />
      </nav>
    </li>
  );
}
