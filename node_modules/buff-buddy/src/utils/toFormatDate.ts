export const toFormatDate = (date?: Date|null) => {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
