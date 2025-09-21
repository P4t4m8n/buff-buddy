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
export const dbUtil = {
  cleanData,
};
