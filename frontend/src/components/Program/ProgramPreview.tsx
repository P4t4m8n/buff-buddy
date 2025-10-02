import { Link } from "react-router";

import { calendarUtil } from "../../utils/calendar.util";
import { toTitle } from "../../utils/toTitle";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import Button from "../UI/Button";
import GenericDeleteButton from "../UI/GenericDeleteButton";

import type { IProgramDTO } from "../../../../shared/models/program.model";
interface ProgramPreviewProps {
  item: IProgramDTO;
  deleteProgram: (programId?: string) => Promise<void>;
  isDeleting: boolean;
}
export default function ProgramPreview({
  item,
  deleteProgram,
  isDeleting,
}: ProgramPreviewProps) {
  const { name, startDate, endDate, id: programId, isActive } = item;

  const dates = calendarUtil.getFormatDateRange(startDate, endDate);

  const activeMarkup = isActive ? (
    <span className="text-success-green border rounded p-2">Active</span>
  ) : (
    <span className="text-error-red">Inactive</span>
  );

  return (
    <li
      className={`p-4 grid w-full gap-6 shadow-border  transition-all duration-300 
                  rounded items-center`}
    >
      <span className="flex items-center justify-between">
        <h4 className="truncate ">{toTitle(name)}</h4>
        {activeMarkup}
      </span>
      <p className="">{dates}</p>

      <div className=" flex items-center gap-3 ">
        <Link to={`/programs/${programId}`} className="mr-auto">
          <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
        </Link>
        <Link to={`/programs/edit/${programId}`} className="">
          <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
        </Link>
        <GenericDeleteButton
          itemId={programId ?? ""}
          deleteAction={deleteProgram!}
          isDeleting={isDeleting}
        />
      </div>
    </li>
  );
}
