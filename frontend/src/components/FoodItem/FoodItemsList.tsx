import { useState } from "react";
import type { IFoodItemFilter } from "../../../../shared/models/foodItem.model";
import useFoodItemsQuery from "../../hooks/queryHooks/useFoodItemsQuery";
import GenericList from "../UI/GenericList";
import FoodItemPreview from "./FoodItemPreview";
import { createPortal } from "react-dom";
import Input from "../UI/Form/Input";
import BarcodeScannerButton from "../BarcodeScanner/BarcodeScannerButton";

const INITIAL_FILTER = {
  skip: 0,
  take: 10,
  barcode: "",
  name: "",
};
export default function FoodItemsList() {
  const [filter, setFilter] = useState<IFoodItemFilter>(INITIAL_FILTER);
  const { isPending, isError, data, error } = useFoodItemsQuery(filter);
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  const { barcode, name } = filter;

  const onBarcodeSet = (barcode?: string | null) => {
    setFilter((prev) => ({ ...prev, barcode }));
  };

  const getBarcodeError = (error: string) => {
    console.log("🚀 ~ getBarcodeError ~ error:", error);
  };

  return createPortal(
    <div className="h-main fixed inset-0 bg-black-900 z-50">
      <form className="border border-main-orange ">
        <Input
        className="border border-main-orange"
          name="name"
          id={"name" + barcode}
          defaultValue={name ?? ""}
        ></Input>
        <Input
          type="number"
          name="barcode"
          id={"barcode" + barcode}
          defaultValue={barcode ?? ""}
        ></Input>
        <BarcodeScannerButton
          getBarcode={onBarcodeSet}
          getBarcodeError={getBarcodeError}
        />
      </form>
      ,
      <GenericList
        items={data ?? []}
        ItemComponent={FoodItemPreview}
        getKey={(item) => item?.id ?? ""}
      />
    </div>,
    document.body,
    "meals-list"
  );
}
