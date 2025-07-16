const moveUpEffect = `absolute bg-inherit rounded z-10 transition-all duration-300 block text-gray-500 pl-2
                     peer-focus:top-0 peer-focus:text-xs peer-focus:px-3 peer-focus:text-black peer-focus:font-semibold 
                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-3
                     peer-[:not(:placeholder-shown)]:text-black peer-[:not(:placeholder-shown)]:bg-inherit peer-[:not(:placeholder-shown)]:font-semibold `;

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  isMoveUpEffect?: boolean;
  labelPosition?: "input" | "textArea";
}

const labelPositionClasses = {
  input: " top-1/2 left-2 -translate-y-1/2",
  textArea: " top-4 left-2 -translate-y-1/2",
};
//TODO??BUG?? label when click not propagate to the input to start the animation
export default function Label({
  isMoveUpEffect,
  labelPosition,
  children,
  ...props
}: Props) {
  const style = isMoveUpEffect
    ? moveUpEffect + labelPositionClasses[labelPosition || "input"]
    : props.className;

  return (
    <label {...props} className={style}>
      {children && children}
    </label>
  );
}
