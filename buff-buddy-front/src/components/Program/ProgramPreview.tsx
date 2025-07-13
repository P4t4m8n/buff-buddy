import { Link } from "react-router";
import type { IProgramDTO } from "../../models/program.model";
import IconEdit from "../UI/Icons/IconEdit";
import IconDetails from "../UI/Icons/IconDetails";
import Button from "../UI/Button";
import IconTrash from "../UI/Icons/IconTrash";
import { useProgramStore } from "../../store/program.store";
import { calendarUtil } from "../../utils/calendar.util";
import { toTitle } from "../../utils/toTitle";
import IconCheckMark from "../UI/Icons/IconCheckMark";
import IconInactive from "../UI/Icons/IconInactive";

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
  const isActiveIcon = isActive ? (
    <IconCheckMark className="border-2 border-green-600 rounded-full stroke-none fill-green-600 p-1  w-12 aspect-square" />
  ) : (
    <IconInactive className=" stroke-none fill-red-orange w-12 aspect-square" />
  );

  return (
    <li
      className={`p-4 grid ${gridCols} w-full gap-6 shadow-[0_0_1px_1px_rgba(0,0,0,.1)]
                  hover:shadow-[0_0_2px_2px_rgba(0,0,0,.3)] transition-all duration-300 
                  rounded items-center`}
    >
      <p className="truncate ">{toTitle(name)}</p>
      <p className="truncate hidden sm:inline">{dates}</p>
      <p className="truncate hidden sm:inline">{isActiveIcon}</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center min-h-full h-full gap-1 ">
        <Link
          to={`/programs/edit/${id}`}
          className="place-self-end lg:place-self-auto"
        >
          <Button buttonStyle="model">
            <IconEdit
              className="fill-none stroke-amber h-full aspect-square
            group-hover:stroke-main-black transition-all duration-300"
            />
          </Button>
        </Link>
        <Link
          to={`/programs/${id}`}
          className=" place-self-start lg:place-self-auto"
        >
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
