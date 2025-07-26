import type {
  TExerciseType,
  TExerciseEquipment,
  TExerciseMuscle,
} from "../../../../../shared/models/exercise.model";
import GenericList from "../../UI/GenericList";
import ExerciseTag from "./ExerciseTag";

interface IExerciseInfoItemListProps {
  item: {
    items: TExerciseType[] | TExerciseEquipment[] | TExerciseMuscle[];
    label: string;
  };
}
export default function ExerciseTagCategory({
  item,
}: IExerciseInfoItemListProps) {
  const { label, items } = item;
  return (
    <li className="inline-flex items-center gap-1 w-full overflow-auto h-12">
      <h4>{label}</h4>
      <GenericList
        items={items ?? []}
        ItemComponent={ExerciseTag}
        itemComponentProps={{}}
        ulStyle="inline-flex w-full overflow-auto gap-1 "
        getKey={(item) => item}
      />
    </li>
  );
}
