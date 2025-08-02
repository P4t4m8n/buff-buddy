import GenericList from "./GenericList";

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
      return <div className="loader-spinner">Loading...</div>;
    case "screen":
      return (
        <div
          className="flex justify-center items-center h-screen overflow-hidden bg-gradient-to-br from-main-orange/90 
                     to-red-orange/85"
        >
          <div className="loader relative w-full -rotate-[35deg]">
            <div className="box relative -left-58 flex justify-center items-center w-[calc(100%+400px)]">
              <div className="cube w-48 aspect-square bg-red-orange"></div>
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
    <li className=" h-fit animate-pulse  flex flex-col gap-2 p-4 rounded bg-main-orange/70 border border-black/50">
      <span className="h-6 w-2/3 rounded bg-secondary-orange/70 "></span>
      <span className="h-10 rounded bg-secondary-orange/70"></span>
      <span className="h-10 rounded bg-secondary-orange/70"></span>
      <span className="h-10 flex gap-3">
        <span className=" h-10 w-24 mr-auto bg-secondary-orange/70 "></span>
        <span className=" h-10 w-20 rounded bg-secondary-orange/70 "></span>
        <span className=" h-10 w-20 rounded bg-secondary-orange/70 "></span>
      </span>
    </li>
  );
};
