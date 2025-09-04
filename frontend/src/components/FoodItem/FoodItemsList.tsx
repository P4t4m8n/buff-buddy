import { useState } from "react";
import type {
  IFoodItemDto,
  IFoodItemFilter,
} from "../../../../shared/models/foodItem.model";
import useFoodItemsQuery from "../../hooks/queryHooks/useFoodItemsQuery";
import GenericList from "../UI/GenericList";
import FoodItemPreview from "./FoodItemPreview";
import Input from "../UI/Form/Input";
import BarcodeScannerModel from "../BarcodeScanner/BarcodeScannerModel";
import InputWithError from "../UI/Form/InputWithError";
import { formUtils } from "../../utils/form.util";

const INITIAL_FILTER = {
  skip: 0,
  take: 10,
  barcode: "",
  name: "",
};

interface IFoodItemsListProps {
  onSelectFoodItem?: (e: React.MouseEvent, foodItem: IFoodItemDto) => void;
}
export default function FoodItemsList({
  onSelectFoodItem,
}: IFoodItemsListProps) {
  const [filter, setFilter] = useState<IFoodItemFilter | null>(INITIAL_FILTER);
  const { isPending, isError, data, error } = useFoodItemsQuery(filter!);
  console.log("🚀 ~ FoodItemsList ~ isPending:", isPending);
  console.log("🚀 ~ FoodItemsList ~ isError:", isError);
  console.log("🚀 ~ FoodItemsList ~ error:", error);

  const { barcode, name } = filter!;

  const onBarcodeSet = (barcode?: string | null) => {
    setFilter((prev) => ({ ...prev, barcode }));
  };

  const getBarcodeError = (error: string) => {
    console.log("🚀 ~ getBarcodeError ~ error:", error);
  };

  return (
    <div className="">
      <form className="border border-main-orange p-4 ">
        <h2>Search for items</h2>
        <InputWithError
          inputProps={{
            value: name ?? "",
            type: "text",
            name: "name",
            id: "name-foodItem-filter",
            placeholder: "",
            onChange: (e) =>
              formUtils.handleInputChange<IFoodItemFilter>(e, setFilter),
            className: "h-10 pl-2",
          }}
          labelProps={{
            htmlFor: "name-foodItem-filter",
            children: "Meal Name",
            isMoveUpEffect: true,
          }}
          divStyle="h-fit order-1 w-full col-span-2 lg:col-span-1 self-end"
        />
        <div className="border rounded flex items-center w-full p-1 gap-2 h-10 ">
          <BarcodeScannerModel
            getBarcode={onBarcodeSet}
            getBarcodeError={getBarcodeError}
          />
          <Input
            type="number"
            name="barcode"
            id={"barcode" + barcode}
            className=" w-full bg-black-300 h-full rounded"
            divStyle="w-full h-full"
            defaultValue={barcode ?? ""}
          ></Input>
        </div>
      </form>

      <GenericList
        items={data ?? []}
        ItemComponent={FoodItemPreview}
        itemComponentProps={{ onSelectFoodItem }}
        getKey={(item) => item?.id ?? ""}
      />
    </div>
  );
}
