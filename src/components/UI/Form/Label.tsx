const moveUpEffect = `absolute top-1/2 left-2 -translate-y-1/2 bg-inherit rounded z-10 transition-all duration-300 block
                     peer-focus:top-0 peer-focus:text-xs peer-focus:px-3 peer-focus:text-white peer-focus:font-semibold 
                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:px-3
                     peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:font-semibold`;

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  isMoveUpEffect?: boolean;
}

export default function Label({ isMoveUpEffect, children, ...props }: Props) {
  const style = isMoveUpEffect ? moveUpEffect : props.className;
  return (
    <label {...props} className={style}>
      {children && children}
    </label>
  );
}
