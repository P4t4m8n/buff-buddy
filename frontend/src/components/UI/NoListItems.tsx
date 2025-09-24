interface INoListItemsProps {
  heading: string;
  paragraph: string;
}
export default function NoListItems({ heading, paragraph }: INoListItemsProps) {
  return (
    <span className="flex flex-col items-center justify-center h-full">
      <h3 className="text-2xl font-bold ">{heading}</h3>
      <p className="text-main-orange/90">{paragraph}</p>
    </span>
  );
}
