import type { IUserCardioLastSet } from "../../../../../shared/models/cardioSet.model";
import GenericList from "../../UI/GenericList";

interface IWorkoutStartUserCardioLastProps {
  lastSet?: IUserCardioLastSet | null;
}
export default function WorkoutStartUserCardioLast({
  lastSet,
}: IWorkoutStartUserCardioLastProps) {
  const {
    lastSkippedReason,
    lastDistance,
    lastWorkTime,
    lastAvgHeartRate,
    lastAvgSpeed,
    lastCaloriesBurned,
  } = lastSet || {};
  console.log("🚀 ~ WorkoutStartUserCardioLast ~ lastSet:", lastSet);

  const items = [
    { label: "Last Skipped Reason", value: lastSkippedReason || "N/A" },
    {
      label: "Last Distance",
      value: lastDistance ? `${lastDistance} m` : "N/A",
    },
    {
      label: "Last Work Time",
      value: lastWorkTime ? `${lastWorkTime} s` : "N/A",
    },
    { label: "Last Avg Heart Rate", value: lastAvgHeartRate || "N/A" },
    { label: "Last Avg Speed", value: lastAvgSpeed || "N/A" },
    { label: "Last Calories Burned", value: lastCaloriesBurned || "N/A" },
  ];
  return (
    <div>
      <h6 className="col-span-full text-center underline underline-offset-2">
        Previous workout set:
      </h6>
      <GenericList
        items={items}
        ItemComponent={Item}
        getKey={(item) => item.label}
        ulStyle="flex"
      />
    </div>
  );
}

const Item = ({
  item,
}: {
  item: { label: string; value: string | number };
}) => {
  const { label, value } = item;
  return (
    <li className="flex flex-col items-center  ">
      <h5 className="text-sm text-gray-500">{label}</h5>
      <p className="text-lg font-semibold">{value}</p>
    </li>
  );
};
