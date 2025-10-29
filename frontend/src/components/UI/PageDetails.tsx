import { useParams } from "react-router";
import { PageIdContext } from "../../hooks/context/PageIdContext";

interface IPageDetailsProps {
  header: React.ReactNode;
  children: React.ReactNode;
}
export default function PageDetails({ children, header }: IPageDetailsProps) {
  const { id } = useParams<{ id: string }>();
  return (
    <section className="h-main w-full bg-black-900 grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2 relative grid-stack z-10 ">
      {header}
      <PageIdContext value={id}>{children}</PageIdContext>
    </section>
  );
}
