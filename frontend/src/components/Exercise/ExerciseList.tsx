import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import GenericList from "../UI/GenericList";
import Loader from "../UI/Loader";
import ExercisePreview from "./ExercisePreview";

interface IExerciseListProps {
  filteredExercises: IExerciseDTO[];
  onDelete: (id?: string) => Promise<void>;
  isLoading: boolean;
}

export default function ExerciseList({
  filteredExercises,
  onDelete,
  isLoading,
}: IExerciseListProps) {
  if (isLoading) {
    return <Loader loaderType="cards-pulse" />;
  }

  return (
    <GenericList
      items={filteredExercises}
      ItemComponent={ExercisePreview}
      itemComponentProps={{ onDelete }}
      getKey={(item) => item.id!}
      ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] 
           h-auto overflow-auto gap-4 p-mobile md:p-desktop"
    />
  );
}
