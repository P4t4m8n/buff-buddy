
export default function IconHome({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g>
        {/* <defs>
            <style>
                .cls-1 {
                    fill: none;
                    stroke: #020202;
                    stroke-miterlimit: 10;
                    stroke-width: 1.83px;
                }
            </style>
        </defs> */}
        <polyline points="1 12 12 2.83 23 12"></polyline>
        <polyline points="19.33 9.25 19.33 21.17 14.75 21.17 14.75 13.83 9.25 13.83 9.25 21.17 4.67 21.17 4.67 9.25"></polyline>
      </g>
    </svg>
  );
}
