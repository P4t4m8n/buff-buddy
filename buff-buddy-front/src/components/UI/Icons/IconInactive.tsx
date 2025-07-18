export default function IconInactive({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <g id="inactive">
        <path d="M13.6,23.9c-7.8,1-14.5-5.6-13.5-13.5c0.7-5.3,5-9.7,10.3-10.3c7.8-1,14.5,5.6,13.5,13.5C23.2,18.9,18.9,23.2,13.6,23.9z M13.7,2.1C6.9,1,1,6.9,2.1,13.7c0.7,4.1,4,7.5,8.2,8.2C17.1,23,23,17.1,21.9,10.3C21.2,6.2,17.8,2.8,13.7,2.1z"></path>
        <polyline points="5.6,4.2 19.8,18.3 18.4,19.8 4.2,5.6 "></polyline>
      </g>{" "}
    </svg>
  );
}
