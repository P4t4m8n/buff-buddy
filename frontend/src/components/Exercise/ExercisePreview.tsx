import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { toTitle } from "../../utils/toTitle";
import GenericDeleteButton from "../UI/GenericDeleteButton";
import { useContext } from "react";
import { IsDeletingContext } from "../../hooks/context/IsDeletingContext";
import LinkComponent from "../UI/Link";
import GenericCarousel from "../UI/GenericCarousel";
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
      className="border rounded p-2 shadow 
       flex flex-col gap-2 h-full justify-between "
    >
      <h3 className=" truncate underline">{toTitle(name)}</h3>
      <GenericCarousel
        items={muscles ?? []}
        props={{}}
        ItemComponent={ExerciseTag}
        getKey={(item) => item}
      />
      <GenericCarousel
        items={equipment ?? []}
        props={{}}
        ItemComponent={ExerciseTag}
        getKey={(item) => item}
      />
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

function ExerciseTag({ item }: { item?: string }) {
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow
       bg-main-black text-main-orange shadow-black"
      key={item}
    >
      {toTitle(item)}
    </li>
  );
}
