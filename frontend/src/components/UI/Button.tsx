import { twMerge } from "tailwind-merge";

const BUTTON_STYLES = {
  model: `bg-main-black p-2 rounded aspect-square  transition-all grid items-center justify-center 
                     duration-300 group border-2 border-transparent
                    hover:bg-amber  hover:border-main-black h-10 lg:h-14 aspect-square `,
  warning: `w-16 border rounded hover:border-red-orange
                           cursor-pointer h-10
                           hover:text-red-orange transition-all duration-300`,
  save: `bg-inherit border-1 w-16 hover:bg-main-orange h-10
            hover:text-white rounded transition-all duration-300
            hover:cursor-pointer  `,
};

export type TButtonStyle = keyof typeof BUTTON_STYLES;

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  buttonStyle?: TButtonStyle | null;
}

export default function Button({
  children,
  buttonStyle,
  ...props
}: IButtonProps) {
  

  const _buttonStyle = buttonStyle ? BUTTON_STYLES[buttonStyle] : "";
  const style = twMerge(`cursor-pointer`, _buttonStyle, props.className);

  return (
    <button {...props} className={style + " "}>
      {children}
    </button>
  );
}
