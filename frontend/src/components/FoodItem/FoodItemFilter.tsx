import { memo, useMemo } from "react";

import BarcodeScannerModel from "../BarcodeScanner/BarcodeScannerModel";
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



  const foodNameInput = useMemo(
    () => ({ label: "Food Name", name: "name", value: name }),
    [name]
  );

  const barcodeInput = useMemo(
    () => ({ label: "Barcode or Name", name: "barcode", value: barcode }),
    [barcode]
  );

  return (
    <form
      className="border rounded border-main-orange p-4 grid gap-2
     w-[calc(100%-2rem)] max-w-[40rem] justify-items-center justify-self-center "
    >
      <h2>Search for items</h2>
      <InputWithError
        inputProps={{
          value: foodNameInput.value ?? "",
          type: "text",
          name: foodNameInput.name,
          id: "name-foodItem-filter",
          placeholder: "",
          onChange,
          className: "h-10 pl-2",
        }}
        labelProps={{
          htmlFor: "name-foodItem-filter",
          children: foodNameInput.label,
          isMoveUpEffect: true,
        }}
        divStyle="h-fit w-full "
      />
      <div className="border rounded flex items-center w-full p-1 gap-2 h-10 ">
        <BarcodeScannerModel
          getBarcode={onBarcodeSet}
          getBarcodeError={getBarcodeError}
        />

        <InputWithError
          inputProps={{
            value: barcodeInput.value ?? "",
            type: "text",
            name: barcodeInput.name,
            id: "name-foodItem-filter",
            placeholder: "",
            onChange,
            className: " w-full bg-black-300 h-full rounded border-0",
          }}
          labelProps={{
            htmlFor: "name-foodItem-filter",
            className: "hidden",
            isMoveUpEffect: false,
          }}
          divStyle="w-full h-full"
        />
      </div>
    </form>
  );
}

export default memo(FoodItemFilterMemo) as typeof FoodItemFilterMemo;
