import type { IUserDTO } from "../../../../../shared/models/user.model";

interface IMealDetailsOwnerProps {
  owner?: IUserDTO | null;
}
export default function MealDetailsOwner({ owner }: IMealDetailsOwnerProps) {
  const img = owner?.imgUrl ?? "/images/avatar-default.png";
  return (
    <div className="grid grid-cols-[2rem_1fr] items-center gap-x-2 mt-4 p-1 bg-black-300 rounded col-span-2">
      <h4 className="col-span-2">Created By:</h4>
      <img className=" ml-4 rounded-full" src={img}></img>
      <p className=" ml-4">{owner?.firstName}</p>
    </div>
  );
}
