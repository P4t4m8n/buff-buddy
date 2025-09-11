import { useState, type FormEvent, type MouseEvent } from "react";
import { useAuthStore } from "../store/auth.store";
import IconGoogle from "../components/UI/Icons/IconGoogle";
import Input from "../components/UI/Form/Input";
import Label from "../components/UI/Form/Label";
import Button from "../components/UI/Button";
import AuthPageHeader from "../components/Auth/AuthPageHeader";
import AuthPageFooter from "../components/Auth/AuthPageFooter";
import { GOOGLE_AUTH_URL } from "../consts/auth.const";
import { useErrors } from "../hooks/shared/useErrors";
import type {
  IAuthSignInDTO,
  IAuthSignUpDTO,
} from "../../../shared/models/auth.model";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const isLoading = useAuthStore((state) => state.isLoadingAuth);

  const { errors, handleError } = useErrors<IAuthSignInDTO | IAuthSignUpDTO>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
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
    } catch (error) {
      handleError({ error });
    }
  };

  const toggleMode = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSignUp((prev) => !prev);
  };

  return (
    <section className="h-screen background flex items-center justify-center pt-16 text-main-orange">
      <div className="flex flex-col items-center py-4 px-1 justify-center gap-6 h-full w-screen md:w-[30rem]">
        <AuthPageHeader />

        <div className="bg-black-500 rounded shadow p-4 border border-main-orange  w-full grid justify-items-center gap-4">
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

          {errors && (
            <span className="bg-red-100 border border-red-400 text-red-700">
              {errors.email || errors.password || errors.unknown}
            </span>
          )}

          <a
            href={GOOGLE_AUTH_URL}
            className=" flex items-center gap-2 justify-center border h-12 px-2
           rounded-xl  bg-black-800
          text-main-orange/70 font-medium hover:bg-gray-50 transition-colors w-fit"
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

          <form onSubmit={handleSubmit} className="grid gap-2 w-full">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder=""
                  defaultValue={""}
                  className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
                  divStyle="  rounded h-full border-black outline-black"
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
                  className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
                  divStyle="  rounded h-full border-black outline-black"
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
              className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
              divStyle="  rounded h-full border-black outline-black"
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
              className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
              divStyle="  rounded h-full border-black outline-black"
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
                className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded`}
                divStyle="  rounded h-full border-black outline-black"
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
              type="button"
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
