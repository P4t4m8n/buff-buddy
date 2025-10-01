import Button from "./Button";
import Loader from "./loader/Loader";

interface GenericSaveButtonProps {
  isSaving: boolean;
  saveAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
}

//TODO??Add loading UI
export default function GenericSaveButton({
  isSaving,
  saveAction,
  type = "submit",
}: GenericSaveButtonProps) {
  return (
    <Button
      type={type}
      disabled={isSaving}
      onClick={saveAction}
      className={`bg-inherit border-1 flex-center  hover:bg-main-orange h-full w-full
                             hover:text-white rounded transition-all duration-300
                             hover:cursor-pointer  `}
    >
      {isSaving ? <Loader loaderType="spinner" /> : "Save"}
    </Button>
  );
}
