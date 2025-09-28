import GenericList from "../GenericList";

interface ILoaderPulseItemsProps {
  itemName: "exercise" | "workout" | "program";
}

export default function LoaderPulseItems({ itemName }: ILoaderPulseItemsProps) {
  const array = Array.from({ length: 36 }, (_, i) => i);

  return (
    <GenericList
      items={array}
      ItemComponent={DynamicPulseItem}
      itemComponentProps={{ itemName }}
      getKey={(item) => item}
      ulStyle="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] 
                     h-main overflow-auto gap-4 p-mobile md:p-desktop"
    />
  );
}

const DynamicPulseItem = ({ itemName }: ILoaderPulseItemsProps) => {
  switch (itemName) {
    case "exercise":
      return <PulseExercise />;
    case "workout":
      return <PulseWorkout />;
    case "program":
      return <PulseProgram />;
    default:
      return <PulseItem />;
  }
};

const PulseExercise = () => {
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
const PulseWorkout = () => {
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
const PulseProgram = () => {
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
