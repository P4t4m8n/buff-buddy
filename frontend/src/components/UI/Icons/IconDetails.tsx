export default function IconDetails({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className}>
      <g>
        <path
          d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6Zm0,22H4V8H32Z"
          className="clr-i-outline clr-i-outline-path-1"
        ></path>
        <path
          d="M9,14H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
          className="clr-i-outline clr-i-outline-path-2"
        ></path>
        <path
          d="M9,18H27a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
          className="clr-i-outline clr-i-outline-path-3"
        ></path>
        <path
          d="M9,22H19a1,1,0,0,0,0-2H9a1,1,0,0,0,0,2Z"
          className="clr-i-outline clr-i-outline-path-4"
        ></path>
      </g>
    </svg>
  );
}
