import { Link } from "react-router";
import type { IProgramDTO } from "../../models/program.model";
import IconEdit from "../UI/Icons/IconEdit";
import IconDetails from "../UI/Icons/IconDetails";
import Button from "../UI/Button";
import IconTrash from "../UI/Icons/IconTrash";
import { useProgramStore } from "../../store/program.store";
import { calendarUtil } from "../../utils/calendar.util";

interface ProgramPreviewProps {
  item: IProgramDTO;
  gridCols: string;
  onDelete: (id?: string) => Promise<void>;
}
export default function ProgramPreview({
  item,
  gridCols,
  onDelete,
}: ProgramPreviewProps) {
  const { name, startDate, endDate, id, isActive } = item;
  const isLoading = useProgramStore((state) => state.isLoading);
  const dates = `${calendarUtil.formatDate(
    startDate
  )} - ${calendarUtil.formatDate(endDate)}`;
  const isActiveStr = isActive ? "Active" : "Inactive";
  return (
    <li
      className={`p-4 grid ${gridCols} w-full gap-6 shadow-[0_0_1px_1px_rgba(0,0,0,.1)]
                  hover:shadow-[0_0_2px_2px_rgba(0,0,0,.3)] transition-all duration-300 
                  rounded items-center`}
    >
      <p>{name}</p>
      <p>{dates}</p>
      <p>{isActiveStr}</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center min-h-full h-full gap-1 ">
        <Link to={`/programs/edit/${id}`}>
          <Button buttonStyle="model">
            <IconEdit
              className="fill-none stroke-amber h-full aspect-square
            group-hover:stroke-main-black transition-all duration-300"
            />
          </Button>
        </Link>
        <Link to={`/programs/${id}`}>
          <Button buttonStyle="model">
            <IconDetails
              className="fill-amber stroke-amber h-full aspect-square
            group-hover:stroke-main-black group-hover:fill-main-black transition-all duration-300"
            />
          </Button>
        </Link>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(id);
          }}
          buttonStyle="model"
          className=" col-span-2 lg:col-span-1"
          disabled={isLoading}
        >
          <IconTrash
            className="fill-amber stroke-none h-full aspect-square
                   group-hover:fill-main-black transition-all duration-300"
          />
        </Button>
      </div>
    </li>
  );
}
