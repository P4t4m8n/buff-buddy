interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  const style = props.className + " cursor-pointer";
  return <button {...props} className={style}>{children}</button>;
}
