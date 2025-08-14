import GenericList from "../GenericList";
import LoaderSmallRotation from "./LoaderSmallRotation";

export type TLoaderTypes = "default" | "spinner" | "screen" | "cards-pulse";

interface ILoaderProps {
  loaderType?: TLoaderTypes;
}

export default function Loader(props: ILoaderProps = {}) {
  return <GetLoader {...props} />;
}

const GetLoader = ({ loaderType = "default" }: ILoaderProps) => {
  switch (loaderType) {
    case "spinner":
      return <LoaderSmallRotation />;
    case "screen":
      return (
        <div
          className="flex justify-center items-center h-main overflow-hidden bg-gradient-to-br from-black-900
                     to-black-400"
        >
          <div className="loader relative w-full -rotate-[35deg]">
            <div className="box relative -left-58 flex justify-center items-center w-[calc(100%+400px)]">
              <div className="cube w-48 aspect-square bg-black-900"></div>
            </div>
          </div>
        </div>
      );
    case "cards-pulse":
      const array = Array.from({ length: 36 }, (_, i) => i);
      return (
        <GenericList
          items={array}
          ItemComponent={PulseItem}
          getKey={(item) => item}
          ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] 
                   h-main overflow-auto gap-4 p-mobile md:p-desktop"
        />
      );
    default:
      return null;
  }
};

const PulseItem = () => {
  return (
    <li className=" h-fit animate-pulse  flex flex-col gap-2 p-4 rounded border bg-black-500  border-main-orange">
      <span className="h-6 w-2/3 rounded bg-black-300 "></span>
      <span className="h-10 rounded bg-black-300"></span>
      <span className="h-10 rounded bg-black-300"></span>
      <span className="h-10 flex gap-3">
        <span className=" h-10 w-24 mr-auto bg-black-300 "></span>
        <span className=" h-10 w-20 rounded bg-black-300 "></span>
        <span className=" h-10 w-20 rounded bg-black-300 "></span>
      </span>
    </li>
  );
};
