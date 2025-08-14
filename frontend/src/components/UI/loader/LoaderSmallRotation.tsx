import { twMerge } from "tailwind-merge";

export default function LoaderSmallRotation() {
  const after = `after:content-[''] after:absolute after:inset-0 after:rounded-[50%] after:border-[.25rem]
                 after:border-t-main-orange after:border-r-main-orange after:border-b-transparent after:border-l-main-orange
                 after:animate-rotation after:duration-1000 after:linear after:w-4 after:h-4 after:m-auto`;

  const span = `w-8 h-8 aspect-square rounded-[50%] inline-block relative border-[.25rem] border-t-white
                border-r-white border-b-transparent border-l-white animate-rotation duration-1000 linear`;

  const style = twMerge(span, after);
  return <span className={style}></span>;
}
