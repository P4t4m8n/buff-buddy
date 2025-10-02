//Utils
import type { JSX } from "react";
import { toTitle } from "../../utils/toTitle";
//UI
import BackButton from "./BackButton";
import Button from "./Button";
import IconArrow from "./Icons/IconArrow";
import LinkComponent from "./Link";

interface IListPageHeaderProps {
  pageName?: "workouts" | "exercises" | "programs" | string;
  EditModel?: JSX.Element;
  editLink?: string;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function PageHeader({
  handleModel,
  ...rest
}: IListPageHeaderProps) {
  return (
    <header className="inline-flex items-center gap-4 border-b  border-b-main-orange/25 px-desktop py-2 col-span-full ">
      {RenderBackButton(handleModel)}
      <h2 className="text-2xl font-bold col-span-full text-center ">
        {toTitle(rest.pageName)}
      </h2>
      {RenderEditButton(rest)}
    </header>
  );
}

const RenderBackButton = (
  handleModel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => {
  return handleModel ? (
    <Button
      className="border-main-orange border rounded-full w-8 aspect-auto -rotate-90"
      onClick={handleModel}
    >
      <IconArrow className="w-full aspect-square fill-main-orange" />
    </Button>
  ) : (
    <BackButton />
  );
};

const RenderEditButton = ({
  pageName,
  editLink,
  EditModel,
}: Partial<IListPageHeaderProps>) => {
  if (editLink) {
    return (
      <LinkComponent
        to={editLink}
        className="bg-main-orange border border-black-300 text-black-900 rounded flex-center px-2 h-full ml-auto"
      >
        <p>Create {toTitle(pageName)}</p>
      </LinkComponent>
    );
  }

  if (EditModel) {
    return EditModel;
  }

  return null;
};
