
export default function IconExercise({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g>
        {/* <defs>
            <style>
                .cls-1 {
                    fill: none;
                    stroke: #020202;
                    stroke-miterlimit: 10;
                    stroke-width: 1.92px;
                }
            </style>
        </defs> */}
        <line className="cls-1" x1="0.5" y1="12" x2="2.42" y2="12"></line>
        <line
          className="cls-1"
          x1="6.25"
          y1="13.92"
          x2="17.75"
          y2="13.92"
        ></line>
        <line
          className="cls-1"
          x1="6.25"
          y1="10.08"
          x2="17.75"
          y2="10.08"
        ></line>
        <line className="cls-1" x1="21.58" y1="12" x2="23.5" y2="12"></line>
        <rect
          className="cls-1"
          x="2.42"
          y="5.29"
          width="4.79"
          height="13.42"
          rx="2.14"
        ></rect>
        <rect
          className="cls-1"
          x="16.79"
          y="5.29"
          width="4.79"
          height="13.42"
          rx="2.14"
        ></rect>
      </g>
    </svg>
  );
}
