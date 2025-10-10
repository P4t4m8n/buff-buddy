//Lib
import { useMemo, useState } from "react";
//Components
import AuthPageHeader from "../components/Auth/AuthPageHeader";
import AuthForm from "../components/Auth/AuthForm";
import AuthPageFooter from "../components/Auth/AuthPageFooter";
//Const
import { GOOGLE_AUTH_URL } from "../consts/auth.const";
//UI
import IconGoogle from "../components/UI/Icons/IconGoogle";
import Button from "../components/UI/Button";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignUp((prev) => !prev);
  };

  const googleButtonAndSeparator = useMemo(
    () => (
      <>
        <a
          href={GOOGLE_AUTH_URL}
          className="flex items-center gap-2 justify-center border h-12 px-2 rounded-xl bg-black-800 text-main-orange/70 font-medium hover:bg-gray-50 transition-colors w-fit"
        >
          <IconGoogle className="h-6 aspect-square" />
          <p>Continue with Google</p>
        </a>
        <div className="relative w-full text-center z-0 ">
          <div className=" absolute -z-10 top-1/2 w-full border-t border-gray-400"></div>
          <span className=" text-main-orange/90 bg-black-500 z-20 px-2">
            Or continue with email
          </span>
        </div>
      </>
    ),
    []
  );


  return (
    <section className="h-screen grid items-center justify-items-center transition text-main-orange bg-black-900 p-desktop">
      <AuthPageHeader />

      <div className="bg-black-500 rounded border transition p-4 w-full max-w-[32rem] grid justify-items-center gap-4 self-start ">
        <div className="text-center grid gap-1">
          <h2 className="text-2xl font-bold ">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-main-orange/70 ">
            {isSignUp
              ? "Join the buff community today"
              : "Sign in to continue your journey"}
          </p>
        </div>

        {googleButtonAndSeparator}

        <AuthForm isSignUp={isSignUp} />

        <div className="text-center inline-flex ">
          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </p>
          <Button
            onClick={toggleMode}
            type="button"
            className="text-orange-500 font-semibold ml-1 hover:text-orange-600 transition-colors"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Button>
        </div>
      </div>

      <AuthPageFooter />
    </section>
  );
}
