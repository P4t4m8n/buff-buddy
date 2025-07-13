import IconLogo from "../UI/Icons/IconLogo";

export default function AuthPageHeader() {
  return (
    <header className="text-center grid gap-1 justify-items-center ">
      <div className=" bg-white rounded-full p-4 flex items-center justify-center shadow">
        <IconLogo className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold text-white ">Buff Buddy</h1>
      <p className="text-white/80">Your fitness journey starts here</p>
    </header>
  );
}
