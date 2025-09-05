import { memo } from "react";

import BarcodeScannerModel from "../BarcodeScanner/BarcodeScannerModel";
import Input from "../UI/Form/Input";
import InputWithError from "../UI/Form/InputWithError";

import type { IFoodItemFilter } from "../../../../shared/models/foodItem.model";

interface IFoodItemFilterProps {
  filter?: IFoodItemFilter | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBarcodeSet: (barcode?: string | null) => void;
  getBarcodeError: (error: string) => void;
}
function FoodItemFilterMemo({
  filter,
  onChange,
  onBarcodeSet,
  getBarcodeError,
}: IFoodItemFilterProps) {
  const { barcode, name } = filter ?? {};

  return (
    <form className="border border-main-orange p-4 grid gap-2 ">
      <h2>Search for items</h2>
      <InputWithError
        inputProps={{
          value: name ?? "",
          type: "text",
          name: "name",
          id: "name-foodItem-filter",
          placeholder: "",
          onChange,
          className: "h-10 pl-2",
        }}
        labelProps={{
          htmlFor: "name-foodItem-filter",
          children: "Meal Name",
          isMoveUpEffect: true,
        }}
        divStyle="h-fit w-full "
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
  );
}

export default memo(FoodItemFilterMemo) as typeof FoodItemFilterMemo;
