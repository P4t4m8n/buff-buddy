export const appUtil = {
  getTempId: (prefix = "temp") => {
    return `${prefix}/${Math.random().toString(36).substring(2, 15)}`;
  },
};
