import { useState } from "react";
import type { IMealFoodItemEditDTO } from "../../../../shared/models/meal.model";
import { apiService } from "../../services/api.service";
import BarcodeScanner from "../Diet/BarcodeScanner";
import type { IModelProps } from "../UI/GenericModel";
import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";

interface IMealFoodItemsEditProps extends IModelProps<HTMLDivElement> {
  mealFoodItem?: IMealFoodItemEditDTO;
}
export default function MealFoodItemEditModel({
  mealFoodItem,
  ...props
}: IMealFoodItemsEditProps) {
  console.log("🚀 ~ MealFoodItemEditModel ~ mealFoodItem:", mealFoodItem);

  const [foodItem, setFoodITem] = useState<IFoodItemDto | null>(null);
  const [showScanner, setShowScanner] = useState(true);
  const [bc, sbc] = useState("");

  const getBarcode = async (barcode?: string | null) => {
    console.log("🚀 ~ getBarcode ~ barcode:", barcode);

    if (!barcode) return;
    sbc(barcode);
    try {
      const _foodItem = await apiService.get<IFoodItemDto>(
        `food-item/barcode/${barcode}`
      );
      setFoodITem(_foodItem);
      setShowScanner(false);
    } catch (error) {
      console.log("🚀 ~ getBarcode ~ error:", error);
    }
  };

  const getBarcodeError = (error?: string) => {
    console.log("🚀 ~ getBarcodeError ~ error:", error);
  };
  return (
    <div
      className="bg-black-500 p-4 grid gap-4 rounded w-[calc(100%-1rem)]
                   max-w-96 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border"
    >
      {showScanner && (
        <BarcodeScanner
          getBarcode={getBarcode}
          getBarcodeError={getBarcodeError}
        />
      )}
      {!showScanner && (
        <button onClick={() => setShowScanner(true)}>Reopen scanner</button>
      )}
      <span>{bc}</span>
      <div>{JSON.stringify(foodItem)}</div>
    </div>
  );
}
