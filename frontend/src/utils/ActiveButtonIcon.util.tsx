import IconCheckMark from "../components/UI/Icons/IconCheckMark";
import IconInactive from "../components/UI/Icons/IconInactive";

interface ActiveButtonIconProps {
  isActive: boolean;
}

export default function ActiveButtonIcon({ isActive }: ActiveButtonIconProps) {
  return isActive ? (
    <IconCheckMark
      className="border-2 border-green-600 rounded-full
     stroke-none fill-green-600 p-1 w-8 aspect-square"
    />
  ) : (
    <IconInactive
      className=" stroke-none fill-red-orange
     w-8 aspect-square"
    />
  );
}
