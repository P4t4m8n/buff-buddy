import IconCreate from "../components/UI/Icons/IconCreate";
import IconDetails from "../components/UI/Icons/IconDetails";
import IconEdit from "../components/UI/Icons/IconEdit";

export const ModelButtonIcon = (mode?: "create" | "edit" | "details") => {
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
             group-hover:stroke-main-black group-hover:fill-main-black transition-all duration-300"
        />
      );

    default:
      return null;
  }
};
