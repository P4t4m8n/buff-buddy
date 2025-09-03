import { useEffect, useState } from "react";
import type { IMealEditDTO } from "../../../../../shared/models/meal.model";

export const useMealEdit = (mealId?: string) => {
  const [mealToEdit, setMealToEdit] = useState<IMealEditDTO | null>(null);

  useEffect(() => {}, [mealId]);
  return { mealToEdit };
};
