 const IconPlus = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g>
        <line
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="12"
          x2="12"
          y1="19"
          y2="5"
        ></line>
        <line
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="5"
          x2="19"
          y1="12"
          y2="12"
        ></line>
      </g>
    </svg>
  );
};

export default IconPlus;