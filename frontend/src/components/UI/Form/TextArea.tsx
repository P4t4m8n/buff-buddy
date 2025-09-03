import { forwardRef } from "react";

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
const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ children, divStyle, ...props }, ref?) => (
    <div className={divStyle}>
      <textarea ref={ref} {...props} />
      {children ? children : null}
    </div>
  )
);

export default TextArea;
