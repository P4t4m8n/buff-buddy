import { Outlet, redirect } from "react-router";

import { useAuthStore } from "../store/auth.store";

import { IMAGES } from "../../../shared/consts/images.const";

import PageHeader from "../components/UI/PageHeader";
import LinkComponent from "../components/UI/Link";
import GenericList from "../components/UI/GenericList";
import { getIcon, type TIconName } from "../utils/GetIcon";
import { toTitle } from "../utils/toTitle";
import type React from "react";
import Button from "../components/UI/Button";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const isLoading = useAuthStore((state) => state.isLoadingAuth);
  if (!user) redirect("/auth");

  const onSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
  };
  const { imgUrl, firstName, lastName, email } = user!;

  const img = imgUrl ?? IMAGES.USER_PLACEHOLDER_IMG;
  const profileInfoLinks = [
    { name: "workout", link: "workouts" },
    { name: "program", link: "/programs" },
    { name: "diet", link: "/diets" },
  ];
  const profileControlsLinks = [
    { name: "subscription", link: "/subscriptions" },
    { name: "setting", link: "/settings" },
  ];
  return (
    <section className="h-main w-full grid grid-rows-[3.5rem_7rem_11rem_auto] grid-cols-1 gap-y-4 pb-4">
      <PageHeader pageName={`${firstName} profile`} />
      <div className="grid grid-cols-[5rem_1fr] grid-rows-[auto] h-fit gap-x-4 px-6 pb-4 items-center">
        <img
          className="row-span-3 rounded-full w-full aspect-square"
          src={img}
        ></img>
        <p className="text-2xl">{`${lastName} ${firstName}`}</p>
        <p className="text-lg">{`${email}`}</p>
        <LinkComponent
          to="edit"
          linkStyle="save"
          className="w-fit flex-center px-1 text-sm h-fit mt-1"
        >
          Edit Profile
        </LinkComponent>
      </div>
      <GenericList
        items={profileInfoLinks}
        ItemComponent={ListLinkComponentWrapper}
        getKey={(item) => item.name}
        ulStyle="border-b flex flex-col mx-4 px-2 justify-centner gap-4 h-fit pb-4"
      />
      <GenericList
        items={profileControlsLinks}
        ItemComponent={ListLinkComponentWrapper}
        getKey={(item) => item.name}
        ulStyle="flex flex-col mx-4 px-2 justify-centner gap-4 h-fit pb-4"
      />
      <Button
        className="self-end border rounded py-1 mx-6"
        type="button"
        onClick={onSignOut}
      >
        Sign Out
      </Button>
      <Outlet />
    </section>
  );
}

const ListLinkComponentWrapper = ({
  item,
}: {
  item?: {
    name: string;
    link: string;
  };
}) => {
  const { name, link } = item!;
  const icon = getIcon({
    iconName: name as TIconName,
    className: "w-full  aspect-square stroke-main-orange fill-none  ",
  });
  return (
    <LinkComponent
      to={link}
      className=" text-lg grid grid-cols-[2.5rem_1fr_1.5rem] gap-8 items-center    "
    >
      {icon}
      <p>{toTitle(name + "s")}</p>
      {getIcon({
        iconName: "arrow",
        className:
          "w-full aspect-square rotate-90  stroke-none fill-main-orange ",
      })}
    </LinkComponent>
  );
};
