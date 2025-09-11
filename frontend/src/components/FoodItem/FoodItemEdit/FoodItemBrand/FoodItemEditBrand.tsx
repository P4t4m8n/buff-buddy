import { toTitle } from "../../../../utils/toTitle";

import FoodItemEditBrandModel from "./FoodItemEditBrandModel";

import GenericModel from "../../../UI/GenericModel";
import IconChange from "../../../UI/Icons/IconChange";

import type { IFoodItemBrandEditDto } from "../../../../../../shared/models/foodItem.model";

interface IFoodItemEditBrandProps {
  brand?: IFoodItemBrandEditDto[];
  handleEditBrand: (name: string) => void;
}
export default function FoodItemEditBrand({
  brand,
  handleEditBrand,
}: IFoodItemEditBrandProps) {
  const activeBrand = brand?.filter(
    (b) => b.crudOperation !== "delete"
  )?.[0] ?? { name: "Unknown" };

  const { name } = activeBrand;
  const pTag = `${toTitle(name)} brand`;

  return (
    <div className="flex w-full gap-4 items-center">
      <div className="border border-main-orange h-10 pl-2 flex items-center rounded w-full">
        <p>{pTag}</p>
      </div>
      <GenericModel
        Model={FoodItemEditBrandModel}
        modelProps={{ handleEditBrand }}
        isOverlay={true}
        buttonProps={{
          children: <IconChange className="fill-main-orange " />,
          className: "w-10 h-10 border rounded",
        }}
      />
    </div>
  );
}
