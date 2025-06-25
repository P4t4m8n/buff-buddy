/**
 * TextArea component that wraps a textarea element with an optional div style and children.
 *
 * @param {Props} props - The properties for the TextArea component.
 * @param {React.ReactNode} [props.children] - Optional children to be rendered inside the div.
 * @param {string} [props.divStyle] - Optional class name for the div wrapping the textarea.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - Additional props to be passed to the textarea element.
 * @returns {JSX.Element} The rendered TextArea component.
 */
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
  divStyle?: string;
}
export default function TextArea({ children, divStyle, ...props }: Props) {
  return (
    <div className={divStyle}>
      <textarea {...props} />
      {children ? children : null}
    </div>
  );
}
