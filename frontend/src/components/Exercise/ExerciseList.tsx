import ExercisePreview from "./ExercisePreview";

import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";

import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import NoListItems from "../UI/NoListItems";

interface IExerciseListProps {
  filteredExercises?: IExerciseDTO[];
  isLoading: boolean;
  onDelete: (id?: string) => Promise<void>;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ExerciseList({
  filteredExercises,
  isLoading,
  onDelete,
  onSearch,
}: IExerciseListProps) {
  if (isLoading) {
    return <Loader loaderType="cards-pulse" />;
  }

  return (
    <GenericList
      items={filteredExercises ?? []}
      ItemComponent={ExercisePreview}
      itemComponentProps={{ onDelete }}
      NoItemsComponent={NoItemsComponent}
      getKey={(item) => item.id!}
      ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] 
           h-auto overflow-auto gap-4 p-mobile md:p-desktop"
    />
  );
}

const NoItemsComponent = () => {
  return (
    <NoListItems
      heading="No exercises found"
      paragraph="Create your first exercise to get started!"
    />
  );
};
