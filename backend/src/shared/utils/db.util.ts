export const dbUtil = {
  //TS is FUN
  cleanData: function <T extends object>(obj: T): Partial<T> {
    const cleaned: Partial<T> = {};
    (Object.keys(obj) as Array<keyof T>).forEach((key) => {
      const value = obj[key];
      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        const cleanedNested = this.cleanData(value);
        if (Object.keys(cleanedNested).length > 0) {
          cleaned[key] = cleanedNested as T[keyof T];
        }
      } else if (value !== undefined && value !== "" && value !== null) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  },
  isUpdate: true,
};
