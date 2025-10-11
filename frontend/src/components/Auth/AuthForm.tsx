//Hooks
import { useAuthForm } from "../../hooks/features/auth/useAuthForm";
//UI
import InputWithError from "../UI/Form/InputWithError";
import Button from "../UI/Button";
import PasswordInput from "../UI/Form/PasswordInput";
//Types
import type { IAuthSignUpDTO } from "../../../../shared/models/auth.model";
import type { TErrors } from "../../models/errors.model";

interface IAuthFormProps {
  isSignUp?: boolean;
}

export default function AuthForm({ isSignUp }: IAuthFormProps) {
  const { isLoading, errors, authForm, handleSubmit, onChange } = useAuthForm({
    isSignUp,
  });

  const getInput = ({
    type,
    name,
    label,
    value,
    error,
  }: {
    type: "text" | "email" | "password";
    name: string;
    label: string;
    value?: string;
    error?: string;
  }) => {
    return (
      <InputWithError
        inputProps={{
          type,
          name,
          id: name,
          placeholder: "",
          value: value || "",
          className: "h-10 pl-2",
          onChange: onChange,
          autoComplete: "off", //INFO:To make the browser quite, maybe update autofill later
        }}
        divStyle="rounded h-full border-black outline-black"
        labelProps={{
          htmlFor: name,
          children: label,
          isMoveUpEffect: true,
        }}
        error={error}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 w-full">
      <div className="text-error-red font-sm text-center h-6">{errors?.unknown ? errors.unknown : ""}</div>
      {isSignUp ? (
        <>
          {getInput({
            name: "firstName",
            type: "text",
            label: "First Name",
            value: (authForm as IAuthSignUpDTO)?.firstName,
            error: (errors as TErrors<IAuthSignUpDTO>)?.firstName,
          })}
          {getInput({
            name: "lastName",
            type: "text",
            label: "Last Name",
            value: (authForm as IAuthSignUpDTO)?.lastName,
            error: (errors as TErrors<IAuthSignUpDTO>)?.lastName,
          })}
        </>
      ) : null}

      {getInput({
        name: "email",
        type: "email",
        label: "Email",
        value: authForm?.email,
        error: errors?.email,
      })}

      <PasswordInput
        name="password"
        label="Password"
        onChange={onChange}
        value={authForm?.password}
        error={errors?.password}
      />

      {isSignUp ? (
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          onChange={onChange}
          value={(authForm as IAuthSignUpDTO).confirmPassword}
          error={(errors as TErrors<IAuthSignUpDTO>)?.confirmPassword}
        />
      ) : null}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 
               text-white hover:text-black font-bold h-12 rounded transition-all duration-200
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
  );
}
