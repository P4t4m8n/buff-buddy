//Lib
import { useMemo } from "react";
//Hooks
import { useDebounceValue } from "../../hooks/shared/useDebounce";
import { useFoodItemsQuery } from "../../hooks/features/foodItem/useFoodItemsQuery";
import { useSearchParams } from "react-router";
//Components
import FoodItemPreview from "./FoodItemPreview";
import FoodItemFilter from "./FoodItemFilter";
//UI
import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";
import Pagination from "../UI/Pagination";
//Types
import type {
  IFoodItemDTO,
  IFoodItemFilter,
} from "../../../../shared/models/foodItem.model";

import { INITIAL_FILTERS } from "../../consts/filters.consts";
interface IFoodItemsIndexProps {
  onSelectFoodItem?: (e: React.MouseEvent, foodItem: IFoodItemDTO) => void;
}
export default function FoodItemsList({
  onSelectFoodItem,
}: IFoodItemsIndexProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = useMemo(() => {
    const result: Record<string, any> = {
      ...INITIAL_FILTERS.INITIAL_FOOD_ITEM_FILTER,
    };
    Object.keys(INITIAL_FILTERS.INITIAL_FOOD_ITEM_FILTER).forEach((key) => {
      const value =
        searchParams.get(key) ??
        INITIAL_FILTERS.INITIAL_FOOD_ITEM_FILTER[key as keyof IFoodItemFilter];

      result[key] = typeof value === "number" ? +value : value;
    });
    return result as IFoodItemFilter;
  }, [searchParams]);
  const debouncedFilter = useDebounceValue({ value: filter, delay: 500 });

  const { data, isLoading } = useFoodItemsQuery(debouncedFilter!);
  const { meta, data: foodItemsData } = data ?? {};

  const foodItems = foodItemsData;
  const onBarcodeSet = (barcode?: string | null) => {
    setSearchParams(
      {
        ...(filter as unknown as Record<string, string>),
        barcode: barcode ?? "",
      },
      { replace: true }
    );
  };
  const getBarcodeError = (_: string) => {};

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    let newVal: boolean | string | number | null;
    switch (type) {
      case "checkbox":
        newVal = checked;
        break;
      case "number":
        newVal = parseFloat(value);
        break;
      default:
        newVal = value;
        break;
    }

    setSearchParams(
      {
        ...(filter as unknown as Record<string, string>),
        [name]: newVal as string,
      },
      { replace: false }
    );
  };

  const onPaginate = (page: number) => {
    const newParams: Record<string, string> = {
      ...(filter as unknown as Record<string, string>),
      skip: page.toString(),
    };

    setSearchParams(newParams, { replace: true });
  };

  return (
    <>
      <FoodItemFilter
        getBarcodeError={getBarcodeError}
        onChange={onChange}
        onBarcodeSet={onBarcodeSet}
        filter={filter}
      />

      {isLoading ? (
        <Loader loaderType="screen" isFullScreen={false} />
      ) : (
        <>
          <GenericList
            items={[...(foodItems ?? [])]}
            ItemComponent={FoodItemPreview}
            itemComponentProps={{ onSelectFoodItem }}
            getKey={(item) => item?.id ?? ""}
            ulStyle="gap-4 h-full overflow-y-auto p-desktop w-full 
                     grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] grid-rows-[repeat(auto-fill,8rem)]
                    "
          />
          <Pagination meta={meta} onPaginate={onPaginate} />
        </>
      )}
    </>
  );
}
