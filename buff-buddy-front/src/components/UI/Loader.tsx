export type TLoaderTypes = "default" | "spinner" | "screen";

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
      return <div className="loader-screen">Loading...</div>;
    default:
      return null
  }
};
