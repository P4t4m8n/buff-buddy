interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
