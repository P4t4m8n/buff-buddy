export const appUtil = {
  getTempId: (prefix = "temp", item?: any) => {
    if (item?.id) {
      return item.id;
    }
    return `${prefix}/${Math.random().toString(36).substring(2, 15)}`;
  },
};
