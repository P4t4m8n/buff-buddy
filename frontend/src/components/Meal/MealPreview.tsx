import { toTitle } from "../../utils/toTitle";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import Button from "../UI/Button";
import GenericTags from "../UI/GenericTags";
import LinkComponent from "../UI/Link";

import type { IMealDTO } from "../../../../shared/models/meal.model";

interface IMealPreviewProps {
  item: IMealDTO;
  onDelete: (e: React.MouseEvent, id?: string) => Promise<void>;
}
export default function MealPreview({
  item: meal,
  onDelete,
}: IMealPreviewProps) {
  const { name, mealType, mealFoodItems, images, id: mealId } = meal;

  const imgUrl =
    images?.filter((img) => img?.isPrimary)?.[0].url ??
    "/images/placeholder.webp";

  const labels = mealFoodItems.map((m) => m.foodItem?.labels)?.flat() ?? [];
  const categories = mealFoodItems.map((m) => m.foodItem?.categories).flat();
  return (
    <li className="border gap-x-4 gap-y-2 p-mobile rounded grid grid-cols-[5rem_calc(100%-6rem)] grid-rows-[1.5rem_1.5rem_2.5rem_2.5rem]">
      <img
        className=" row-span-full aspect-square rounded object-fill"
        src={imgUrl}
      />

      <h3>{toTitle(name)}</h3>

      <span>
        <p>Type: {mealType}</p>
      </span>

      <div className="inline-flex gap-4 items-center">
        <h5>Labels:</h5>
        <GenericTags
          items={labels}
          getTag={(item) => item?.name ?? ""}
          getKey={(item) => item?.name ?? ""}
        />
      </div>

      <div className="inline-flex gap-4 items-center">
        <h5>Categories:</h5>
        <GenericTags
          items={categories}
          getTag={(item) => item?.name ?? ""}
          getKey={(item) => item?.name ?? ""}
        />
      </div>

      <div className="inline-flex col-span-full gap-4">
        <Button
          buttonStyle="model"
          className="mr-auto"
          onClick={(e) => onDelete(e, mealId)}
        >
          {ModelButtonIcon("delete")}
        </Button>
        <LinkComponent
          to={`/meals/${mealId}`}
          className=""
          linkStyle="model"
          mode="details"
        />
        <LinkComponent
          to={`/meals/edit/${mealId}`}
          className=""
          mode="edit"
          linkStyle="model"
        />
      </div>
    </li>
  );
}
