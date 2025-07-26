import React from "react";

export default function IconProfile({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g>
        {/* <defs>
            <style>
                .cls-1 {
                    fill: none;
                    stroke: #020202;
                    stroke-miterlimit: 10;
                    stroke-width: 1.91px;
                }
            </style>
        </defs> */}
        <circle cx="12" cy="7.25" r="5.73"></circle>
        <path d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"></path>
      </g>
    </svg>
  );
}
