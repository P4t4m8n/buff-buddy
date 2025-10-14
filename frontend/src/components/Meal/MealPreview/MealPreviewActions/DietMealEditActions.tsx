import type { IMealPreviewProps } from "../../../../models/meal.model";
import Button from "../../../UI/Button";

export default function DietMealEditActions(props: Partial<IMealPreviewProps>) {
  const { selectItem, item } = props;
  const isCopy = true;

  if (!selectItem) return null;

  return (
    <div className="flex gap-2">
      <Button buttonStyle="save" onClick={(e) => selectItem(e, item, isCopy)}>
        Select
      </Button>
    </div>
  );
}
