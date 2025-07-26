interface ItemNotFoundProps {
  itemName?: string;
}
export default function ItemNotFound({ itemName = "Item" }: ItemNotFoundProps) {
  const itemNotFoundMessage = `${itemName} not found`;
  return <div>{itemNotFoundMessage}</div>;
}
