export const toDisplayDates = (
  startDate?: Date | string | null,
  endDate?: Date | string | null
): string => {
  if (!startDate) {
    return "Select date" + (endDate ? " range" : "");
  }

  const formatDate = (date: Date | string | null): string => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }

  return `${formatDate(startDate)} - Select end date`;
};
