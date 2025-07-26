import type { Dispatch, MouseEvent } from "react";
import type { TDateInputMode } from "../../../../models/calendar.model";
import Button from "../../Button";

interface DateInputControlProps {
  mode: TDateInputMode;
  startDate?: Date | null;
  setMode: Dispatch<React.SetStateAction<TDateInputMode>>;
  clearSelection: (e:MouseEvent) => void;
}

export default function DateInputControl({
  mode,
  startDate,
  setMode,
  clearSelection,
}: DateInputControlProps) {
  return (
    <div className="flex items-center gap-2 ">
      <Button
        onClick={(e) => {
          e.preventDefault();
          setMode(mode === "single" ? "range" : "single");
        }}
        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
      >
        {mode === "single" ? "Single" : "Range"}
      </Button>

      {startDate ? (
        <Button
          onClick={clearSelection}
          className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
        >
          Clear
        </Button>
      ) : null}
    </div>
  );
}
