//INFO: The dashboard sends local day keys ("YYYY-MM-DD"), parse them as local dates
const parseDayKey = (dayKey: string): Date => {
  const [year, month, day] = dayKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatShortDate = (dayKey: string): string => {
  const date = parseDayKey(dayKey);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
};

const formatDayLabel = (dayKey: string, now: Date = new Date()): string => {
  const date = parseDayKey(dayKey);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const formatVolumeChange = (thisWeek: number, lastWeek: number): string => {
  if (!lastWeek) return "No volume last week";
  const change = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  const arrow = change >= 0 ? "▲" : "▼";
  return `${arrow} ${Math.abs(change)}% vs last week`;
};

export const dashboardUtil = {
  formatShortDate,
  formatDayLabel,
  formatVolumeChange,
};
