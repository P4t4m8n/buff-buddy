import { useEffect, useState } from "react";
import type {
  IFoodItemDto,
  IFoodItemFilter,
} from "../../../../shared/models/foodItem.model";
import useFoodItemsQuery from "../../hooks/queryHooks/useFoodItemsQuery";
import GenericList from "../UI/GenericList";
import FoodItemPreview from "./FoodItemPreview";
import { formUtil } from "../../utils/form.util";
import { useDebounceValue } from "../../hooks/shared/useDebounce";
import Loader from "../UI/loader/Loader";
import { useFoodItemMutationKeyStore } from "../../store/foodItemMutationKey.store";
import FoodItemFilter from "./FoodItemFilter";
import GenericModel from "../UI/GenericModel";
import FoodItemEdit from "./FoodItemEdit/FoodItemEdit";

const INITIAL_FILTER = {
  skip: 0,
  take: 10,
  barcode: "",
  name: "",
};

interface IFoodItemsIndexProps {
  onSelectFoodItem?: (e: React.MouseEvent, foodItem: IFoodItemDto) => void;
}
//TODO: Add fetching error handling
export default function FoodItemsIndex({
  onSelectFoodItem,
}: IFoodItemsIndexProps) {
  const [filter, setFilter] = useState<IFoodItemFilter | null>(INITIAL_FILTER);
  const debouncedFilter = useDebounceValue({ value: filter, delay: 500 });

  const { data, isLoading } = useFoodItemsQuery(debouncedFilter!);
  const setMutationKey = useFoodItemMutationKeyStore(
    (store) => store.setMutationKey
  );

  useEffect(() => {
    setMutationKey(["foodItems", debouncedFilter]);
  }, [debouncedFilter]);

  const onBarcodeSet = (barcode?: string | null) => {
    setFilter((prev) => ({ ...prev, barcode }));
  };

  const getBarcodeError = (_: string) => {};

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formUtil.handleInputChange<IFoodItemFilter>(e, setFilter);
  };

  return (
    <div className="h-full grid grid-rows-[auto_auto_1fr] gap-y-4">
      <FoodItemFilter
        getBarcodeError={getBarcodeError}
        onChange={onChange}
        onBarcodeSet={onBarcodeSet}
        filter={filter}
      />
      <div className="flex items-center gap-4">
        <p>didn't find one? add</p>
        <GenericModel
          isOverlay={true}
          Model={FoodItemEdit}
          mode="create"
          buttonProps={{
            buttonStyle: "model",
            className: " h-6 aspect-square fill-black stroke-black",
          }}
        />
      </div>

      {isLoading ? (
        <Loader loaderType="screen" isFullScreen={false} />
      ) : (
        <GenericList
          items={[...(data ?? [])]}
          ItemComponent={FoodItemPreview}
          itemComponentProps={{ onSelectFoodItem }}
          getKey={(item) => item?.id ?? ""}
          ulStyle="flex flex-col gap-4 overflow-y-auto "
        />
      )}
    </div>
  );
}
