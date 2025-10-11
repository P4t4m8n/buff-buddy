import IconArrow from "../components/UI/Icons/IconArrow";
import IconDiet from "../components/UI/Icons/IconDiet";
import IconProgram from "../components/UI/Icons/IconProgram";
import { IconSettings } from "../components/UI/Icons/IconSettings";
import IconSubscription from "../components/UI/Icons/IconSubscription";
import IconWorkout from "../components/UI/Icons/IconWorkout";
import type { IIconProps } from "../models/UI.model";

export const ICONS_NAMES = [
  "workout",
  "exercise",
  "program",
  "diet",
  "user",
  "arrow",
  "setting",
  "subscription",
] as const;

export type TIconName = (typeof ICONS_NAMES)[number];

export const getIcon = ({
  iconName,
  className,
}: { iconName: TIconName } & IIconProps) => {
  switch (iconName) {
    case "workout":
      return <IconWorkout className={className} />;
    case "program":
      return <IconProgram className={className} />;
    case "diet":
      return <IconDiet className={className} />;
    case "setting":
      return <IconSettings className={className} />;
    case "subscription":
      return <IconSubscription className={className} />;
    case "arrow":
      return <IconArrow className={className} />;
    default:
      return null;
  }
};
