import { Link } from "react-router";
import { useProgramStore } from "../../../store/program.store";
import { calendarUtil } from "../../../utils/calendar.util";
import { toTitle } from "../../../utils/toTitle";
import { ModelButtonIcon } from "../../../utils/ModelButtonIcon.util";
import GenericDeleteButton from "../../UI/GenericDeleteButton";
import Button from "../../UI/Button";

import type { IProgramDTO } from "../../../../../shared/models/program.model";
import ActiveButtonIcon from "../../../utils/ActiveButtonIcon.util";
interface ProgramPreviewProps {
  item: IProgramDTO;
  onDeleteProgram?: (id?: string) => Promise<void>;
}
export default function ProgramPreview({
  item,
  onDeleteProgram,
}: ProgramPreviewProps) {
  const { name, startDate, endDate, id, isActive } = item;

  const dates = calendarUtil.getFormatDateRange(startDate, endDate);

  const isActiveIcon = ActiveButtonIcon({ isActive });

  return (
    <li
      className={`p-4 grid w-full gap-6 shadow-[0_0_1px_1px_rgba(0,0,0,.1)]
                  hover:shadow-[0_0_2px_2px_rgba(0,0,0,.3)] shadow-main-orange transition-all duration-300 
                  rounded items-center`}
    >
      <span className="flex items-center justify-between">
        <h4 className="truncate ">{toTitle(name)}</h4>
        <p className="">{isActiveIcon}</p>
      </span>
      <p className="">{dates}</p>

      <div className=" flex items-center gap-3 ">
        <Link to={`/programs/${id}`} className="mr-auto">
          <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
        </Link>
        <Link to={`/programs/edit/${id}`} className="">
          <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
        </Link>
        <GenericDeleteButton
          itemId={id}
          useStore={useProgramStore}
          deleteAction={onDeleteProgram!}
        />
      </div>
    </li>
  );
}
