import GenericList from "../../UI/GenericList";
import ExerciseTagCategory from "./ExerciseTagCategory";
import type {
  TExerciseEquipment,
  TExerciseMuscle,
} from "../../../../../shared/models/exercise.model";

interface ExerciseInfoListProps {
  equipment?: TExerciseEquipment[];

  muscles?: TExerciseMuscle[];
}

export default function ExerciseAttributes({
  equipment,
  muscles,
}: ExerciseInfoListProps) {
  const items = [
    { label: "Equipment", items: equipment ?? [] },
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
