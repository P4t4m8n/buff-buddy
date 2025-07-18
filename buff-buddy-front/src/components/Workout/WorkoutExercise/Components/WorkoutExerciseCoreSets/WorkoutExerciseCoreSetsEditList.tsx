import {
  Fragment,
  useEffect,
  useRef,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import WorkoutExerciseCoreSetsEdit from "./WorkoutExerciseCoreSetsEdit";
import Button from "../../../../UI/Button";
import type { ICoreSetEditDTO } from "../../../../../../../shared/models/set.model";
interface WorkoutExerciseCoreSetsEditListProps {
  coreSets?: ICoreSetEditDTO[];
  handleSets: (set?: ICoreSetEditDTO) => void;
  handleChange: (e: ChangeEvent) => void;
  errors?: Partial<Record<string, string>>[] | null;
}
export default function WorkoutExerciseCoreSetsEditList({
  coreSets,
  handleSets,
  handleChange,
  errors,
}: WorkoutExerciseCoreSetsEditListProps) {
  const lastSetRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (lastSetRef.current) {
      lastSetRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [coreSets?.length]);
  const onAddSet = (e: MouseEvent) => {
    e.preventDefault();
    handleSets();
  };

  const clearedCoreSets = coreSets
    ?.filter((set) => set.crudOperation !== "delete")
    .map((set) => {
      const error = errors?.find((err) => err.id === set.id);
      return error ? { ...set, error: error } : set;
    })
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

  return (
    <div className="w-full h-full grid gap-2 px-4 ">
      <h3 className="underline text-lg font-semibold px-4">Core Sets</h3>
      <ul className="overflow-auto grid gap-2 w-full h-72 ">
        {clearedCoreSets?.map((set, idx) => (
          <Fragment key={set.id}>
            <WorkoutExerciseCoreSetsEdit
              set={set}
              onHandleChange={handleChange}
              removeSet={handleSets}
              ref={idx === clearedCoreSets.length - 1 ? lastSetRef : undefined}
              errors={"error" in set ? set.error : undefined}
            />
          </Fragment>
        ))}
      </ul>
      <Button onClick={onAddSet} buttonStyle="save" className="w-full ">
        Add Set
      </Button>
    </div>
  );
}
