import toTitle  from "../../utils/toTitle";

export default function Tag({ item }: { item?: string }) {
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow
         bg-main-black text-main-orange shadow-black"
      key={item}
    >
      {toTitle(item ?? "Unknown")}
    </li>
  );
}
