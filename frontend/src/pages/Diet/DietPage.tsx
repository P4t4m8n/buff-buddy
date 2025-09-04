import LinkComponent from "../../components/UI/Link";

export default function DietPage() {
  return (
    <div className="h-main grid">
      <LinkComponent
        className="bg-main-orange w-fit py-2 px-2 rounded text-black self-center "
        to="/meals"
      >
        Meals List
      </LinkComponent>
    </div>
  );
}
