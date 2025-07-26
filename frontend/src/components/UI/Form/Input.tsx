
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  divStyle?: string;
  children?: React.ReactNode;
}

export default function Input({ divStyle, children, ...props }: Props) {
  
  return (
    <div className={divStyle + " relative group"}>
      <input {...props} />
      {children}
    </div>
  );
}
