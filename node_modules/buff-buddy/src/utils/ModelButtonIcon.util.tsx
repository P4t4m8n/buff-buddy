import IconCreate from "../components/UI/Icons/IconCreate";
import IconDetails from "../components/UI/Icons/IconDetails";
import IconEdit from "../components/UI/Icons/IconEdit";
import IconTrash from "../components/UI/Icons/IconTrash";

export type TModelButtonIconMode = "create" | "edit" | "details" | "delete";

export const ModelButtonIcon = (mode?: TModelButtonIconMode) => {
  switch (mode) {
    case "create":
      return (
        <IconCreate
          className="fill-none stroke-amber h-full aspect-square
             group-hover:stroke-main-black transition-all duration-300"
        />
      );
    case "edit":
      return (
        <IconEdit
          className="fill-none stroke-amber h-full aspect-square
             group-hover:stroke-main-black transition-all duration-300"
        />
      );
    case "details":
      return (
        <IconDetails
          className="fill-amber stroke-amber h-full aspect-square
             group-hover:stroke-main-black group-hover:fill-amber transition-all duration-300"
        />
      );
    case "delete":
      return (
        <IconTrash
          className="fill-amber stroke-none h-full aspect-square
               group-hover:fill-main-black transition-all duration-300"
        />
      );

    default:
      return null;
  }
};
