
import FormButton from "./Form/FormButton";
import IconTrash from "./Icons/IconTrash";

interface DeleteBtnProps {
  deleteAction: () => Promise<void>;
  children?: React.ReactNode;
}

export default function DeleteBtn({
  deleteAction,
  children = <IconTrash className="" />,
}: DeleteBtnProps) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteAction();
  };

  return (
    <form onSubmit={onSubmit} className="">
      <FormButton
        className="bg-main-black rounded w-14 h-14 block hover:bg-amber transition-all 
            duration-300 group border-2 border-transparent hover:border-main-black cursor-pointer"
        type="submit"
      >
        {children}
      </FormButton>
    </form>
  );
}
