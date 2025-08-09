
//TODO??Placeholder for future header content
export default function AuthPageHeader() {
  return (
    <header className="text-center grid gap-1 justify-items-center ">
      <div className=" bg-main-orange  rounded-full p-4 flex items-center justify-center shadow">
        <img className="w-36 aspect-square" src="assets/logo.svg"></img>
      </div>
      <h1 className="text-3xl font-bold text-white ">Buff Buddy</h1>
      <p className="text-white/80">Your fitness journey starts here</p>
    </header>
  );
}
