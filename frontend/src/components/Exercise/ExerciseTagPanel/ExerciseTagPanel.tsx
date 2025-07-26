import GenericList from "../../UI/GenericList";
import ExerciseTagCategory from "./ExerciseTagCategory";
import type {
  TExerciseEquipment,
  TExerciseType,
  TExerciseMuscle,
} from "../../../../../shared/models/exercise.model";

interface ExerciseInfoListProps {
  equipment?: TExerciseEquipment[];

  types?: TExerciseType[];
  muscles?: TExerciseMuscle[];
}

export default function ExerciseAttributes({
  equipment,
  types,
  muscles,
}: ExerciseInfoListProps) {
  const items = [
    { label: "Equipment", items: equipment ?? [] },
    { label: "Types", items: types ?? [] },
    { label: "Muscles", items: muscles ?? [] },
  ];
  return (
    <GenericList
      items={items}
      ItemComponent={ExerciseTagCategory}
      getKey={(item) => item.label}
      ulStyle="grid gap-2"
      itemComponentProps={{ label: "" }}
    />
  );
}
