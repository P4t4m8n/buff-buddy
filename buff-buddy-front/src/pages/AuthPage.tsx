import { useState, type FormEvent, type MouseEvent } from "react";
import { useAuthStore } from "../store/auth.store";
import IconGoogle from "../components/UI/Icons/IconGoogle";
import Input from "../components/UI/Form/Input";
import Label from "../components/UI/Form/Label";
import Button from "../components/UI/Button";
import AuthPageHeader from "../components/Auth/AuthPageHeader";
import AuthPageFooter from "../components/Auth/AuthPageFooter";
import { GOOGLE_AUTH_URL } from "../consts/auth.const";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn, signUp, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isSignUp) {
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      await signUp({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
    } else {
      await signIn({ email, password });
    }
  };

  const toggleMode = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignUp((prev) => !prev);
  };

  return (
    <section
      className="h-screen bg-gradient-to-br from-main-orange
     via-main-orange/80 to-red-orange flex items-center justify-center"
    >
      <div className="flex flex-col items-center  py-4 px-1 justify-center gap-2 h-full w-screen md:w-[30rem]">
        <AuthPageHeader />

        <div className="bg-white rounded shadow p-4 border border-white/20 w-full grid justify-items-center gap-4">
          <div className="text-center grid gap-1">
            <h2 className="text-2xl font-bold text-gray-800">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600 ">
              {isSignUp
                ? "Join the buff community today"
                : "Sign in to continue your journey"}
            </p>
          </div>

          {error && (
            <span className="bg-red-100 border border-red-400 text-red-700">
              {error.message}
            </span>
          )}

          <a
            href={GOOGLE_AUTH_URL}
            className=" flex items-center gap-2 justify-center border h-12 px-2
          border-gray-300 rounded-xl shadow-sm bg-white
          text-gray-700 font-medium hover:bg-gray-50 transition-colors w-fit"
          >
            <IconGoogle className="h-6 aspect-square" />
            <p>Continue with Google</p>
          </a>

          <div className="relative w-full text-center z-0 ">
            <div className=" absolute -z-10 top-1/2 w-full border-t border-gray-300"></div>

            <span className=" text-gray-500 bg-white z-20 px-2">
              Or continue with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-2 w-full">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder=""
                  defaultValue={""}
                  className="w-full h-12 border border-gray-300 rounded-xl focus:ring-2 peer px-4
                focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required={isSignUp}
                  divStyle="bg-white"
                >
                  <Label
                    isMoveUpEffect={true}
                    labelPosition="input"
                    htmlFor="firstName"
                  >
                    First Name
                  </Label>
                </Input>

                <Input
                  type="text"
                  name="lastName"
                  placeholder=""
                  className="w-full h-12 border border-gray-300 rounded-xl focus:ring-2 peer px-4
                focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required={isSignUp}
                  divStyle="bg-white"
                >
                  <Label
                    isMoveUpEffect={true}
                    labelPosition="input"
                    htmlFor="lastName"
                  >
                    Last Name
                  </Label>
                </Input>
              </div>
            )}

            <Input
              type="email"
              name="email"
              placeholder=""
              className="w-full h-12 border border-gray-300 rounded-xl focus:ring-2 peer px-4
            focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              required
              divStyle="bg-white w-full"
            >
              <Label
                isMoveUpEffect={true}
                labelPosition="input"
                htmlFor="email"
              >
                Email
              </Label>
            </Input>

            <Input
              type="password"
              name="password"
              placeholder=""
              className="w-full h-12 border border-gray-300 rounded-xl focus:ring-2 peer px-4
            focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              required
              divStyle="bg-white"
            >
              <Label
                isMoveUpEffect={true}
                labelPosition="input"
                htmlFor="password"
              >
                Password
              </Label>
            </Input>

            {isSignUp && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder=""
                className="w-full h-12 border border-gray-300 rounded-xl focus:ring-2 peer px-4
            focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                required={isSignUp}
                divStyle="bg-white"
              >
                <Label
                  isMoveUpEffect={true}
                  labelPosition="input"
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </Label>
              </Input>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 
            text-white hover:text-black font-semibold h-12 rounded transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading
                ? isSignUp
                  ? "Creating Account..."
                  : "Signing In..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </Button>
          </form>

          <div className="text-center inline-flex ">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <Button
              onClick={toggleMode}
              className="text-orange-500 font-semibold ml-1 hover:text-orange-600 transition-colors"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </Button>
          </div>
        </div>

        <AuthPageFooter />
      </div>
    </section>
  );
}
