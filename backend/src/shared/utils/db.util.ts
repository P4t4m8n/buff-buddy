import { IBaseFilter } from "../../../../shared/models/app.model";
import { IGetMetaData } from "../../../../shared/models/metaData.model";

const cleanData = <T extends object>(obj: T): Partial<T> => {
  const cleaned: Partial<T> = {};
  (Object.keys(obj) as Array<keyof T>).forEach((key) => {
    const value = obj[key];
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof value !== "string" &&
      !(value instanceof Date)
    ) {
      const cleanedNested = cleanData(value);
      if (Object.keys(cleanedNested).length > 0) {
        cleaned[key] = cleanedNested as T[keyof T];
      }
    } else if (value !== undefined && value !== "" && value !== null) {
      cleaned[key] = value;
    }
  });
  return cleaned;
};
const buildMetaData = ({
  count,
  take,
  skip,
}: {
  count: number;
  take?: number;
  skip?: number;
}): IGetMetaData => ({
  total: count,
  totalPages: Math.ceil(count / (take ?? 10)),
  currentPage: skip ?? 0,
  perPage: take ?? 10,
});
const buildSkipTakeClause = (filter: IBaseFilter) => {
  const take = filter.take ? parseInt(filter.take.toString()) : 10;
  const skip = (filter?.skip ?? 0) * take;
  return {
    take,
    skip,
  };
};
export const dbUtil = {
  cleanData,
  buildMetaData,
  buildSkipTakeClause,
};
