import { Outlet } from "react-router";

interface IPageProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  isOutlet?: boolean;
}
export default function PageList({ children, header, isOutlet }: IPageProps) {
  return (
    <main className="grid">
      <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 relative grid-stack ">
        {header}

        <div className="grid grid-rows-[3rem_calc(100%-8rem)_3rem] md:grid-rows-[1fr_3rem] md:grid-cols-[auto_1fr] relative gap-y-4">
          {children}
        </div>
      </section>
      {isOutlet ? <Outlet /> : null}
    </main>
  );
}
