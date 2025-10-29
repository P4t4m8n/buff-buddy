import { twMerge } from "tailwind-merge";

interface ILoaderSmallRotationProps {
  spinnerSize?: number;
}

export default function LoaderSmallRotation({
  spinnerSize = 2,
}: ILoaderSmallRotationProps) {
  const spinnerClasses = twMerge(`
    relative inline-block aspect-square rounded-[50%]
    border-[.25rem] border-t-white border-r-white border-b-transparent border-l-white
    animate-rotation duration-1000 linear
    w-[var(--spinner-size)] h-[var(--spinner-size)]

    after:content-[''] after:absolute after:inset-0 after:m-auto after:rounded-[50%]
    after:border-[.25rem] after:border-t-main-orange after:border-r-main-orange 
    after:border-b-transparent after:border-l-main-orange
    after:animate-rotation after:duration-1000 after:linear
    after:w-[var(--inner-spinner-size)] after:h-[var(--inner-spinner-size)]
  `);

  const dynamicStyles = {
    "--spinner-size": `${spinnerSize}rem`,
    "--inner-spinner-size": `${spinnerSize / 2}rem`,
  } as React.CSSProperties;

  return <span className={spinnerClasses} style={dynamicStyles}></span>;
}
