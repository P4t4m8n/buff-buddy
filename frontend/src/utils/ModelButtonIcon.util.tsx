import IconCreate from "../components/UI/Icons/IconCreate";
import IconDetails from "../components/UI/Icons/IconDetails";
import IconEdit from "../components/UI/Icons/IconEdit";
import IconTrash from "../components/UI/Icons/IconTrash";

import type { TIconMode } from "../models/UI.model";

export const ModelButtonIcon = (mode?: TIconMode) => {
  const fillNone = `fill-none stroke-black-900  h-full aspect-square
             group-hover:stroke-main-orange transition-all duration-300`;
  const fillBlack = `fill-black-900 stroke-none  h-full aspect-square
             group-hover:fill-main-orange transition-all duration-300`;
  switch (mode) {
    case "create":
      return <IconCreate className={fillNone} />;
    case "edit":
      return <IconEdit className={fillNone} />;
    case "details":
      return <IconDetails className={fillBlack} />;
    case "delete":
      return <IconTrash className={fillBlack} />;

    default:
      return null;
  }
};
