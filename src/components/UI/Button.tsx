const BUTTON_STYLES = {
  model: `bg-main-black p-2 rounded aspect-square hover:bg-amber transition-all grid items-center justify-center 
                     duration-300 group border-2 border-transparent
                      hover:border-main-black h-10 lg:h-14 aspect-square `,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  buttonStyle?: keyof typeof BUTTON_STYLES;
}

export default function Button({
  children,
  buttonStyle,
  ...props
}: ButtonProps) {
  const _buttonStyle = buttonStyle ? BUTTON_STYLES[buttonStyle] : "";
  const style = ` ${props.className} cursor-pointer ${_buttonStyle}`;

  return (
    <button {...props} className={style + " "}>
      {children}
    </button>
  );
}
