import { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { useExerciseInfoStore } from "../../../store/exerciseInfo.store";
import {
  ExerciseInfoCategory,
  type TExerciseInfoCategory,
} from "../../../models/exerciseInfo.model";
import ExerciseInfoItem from "./ExerciseInfoItem";
import { toTitle } from "../../../utils/toTitle";
import ExerciseInfoEdit from "./ExerciseInfoEdit";
import Table from "../../UI/Table";

export default function ExerciseInfoIndex() {
  const { type } = useParams();

  const category = ExerciseInfoCategory.includes(type as TExerciseInfoCategory)
    ? (type as TExerciseInfoCategory)
    : undefined;

  const exerciseInfos = useExerciseInfoStore((state) =>
    state.getCategory(category!)
  );

  const loadCategory = useExerciseInfoStore((state) => state.loadCategory);
  const deleteItem = useExerciseInfoStore((state) => state.deleteItem);

  useEffect(() => {
    if (category) {
      loadCategory(category);
    }
  }, [category]);

  const onDelete = useCallback(async (id?: string) => {
    try {
      await delay();
      if (!id) {
        console.warn("No ID provided for deletion.");
        return;
      }
      if (!category) {
        console.warn("No category provided for deletion.");
        return;
      }
      await deleteItem(category, id);
    } catch (error) {
      console.error("Error deleting exercise info:", error);
    }
  }, []);

  const delay = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const tableHeaders = ["Image", "Name", "Actions"];
  const gridCols = "[4rem_1fr_8rem]";
  return (
    <main className="h-[calc(100%-2rem)] inline-flex flex-col gap-4 w-full ">
      <header className="px-4 grid gap-4">
        <h2 className="">{toTitle(category)}</h2>
        <ExerciseInfoEdit category={category} />
      </header>
      <Table
        header={tableHeaders}
        gridCols={gridCols}
        items={exerciseInfos}
        ItemComponent={ExerciseInfoItem}
        onDelete={onDelete}
      />
    </main>
  );
}
