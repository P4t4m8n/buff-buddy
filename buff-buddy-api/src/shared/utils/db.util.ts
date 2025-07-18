export const dbUtil = {
  //TS is FUN
  cleanData: <T extends object>(obj: T): Partial<T> => {
    const cleaned: Partial<T> = {};
    (Object.keys(obj) as Array<keyof T>).forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== "" && obj[key] !== null) {
        cleaned[key] = obj[key];
      }
    });
    return cleaned;
  },
};
