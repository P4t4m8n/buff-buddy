import type { IIconProps } from "../../../models/UI.model";

const IconSkip = ({ className }: IIconProps) => {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <g>
        <g>
          <g>
            <rect width="48" height="48" fill="none"></rect>
          </g>
          <g>
            <g>
              <circle cx="8" cy="37" r="6"></circle>
              <path d="M24,31a6,6,0,1,0,6,6A6,6,0,0,0,24,31Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,24,39Z"></path>
              <circle cx="40" cy="37" r="6"></circle>
              <path d="M37.4,19.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l4,3.9a1.9,1.9,0,0,0,2.8,0l4-3.9a2.3,2.3,0,0,0,.3-2.7,2,2,0,0,0-3.1-.2l-.6.6A18,18,0,0,0,6,21v2a2,2,0,0,0,4,0V21a14,14,0,0,1,28-.9Z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default IconSkip;
