import React from "react";
import InputWithError from "./InputWithError";
import Button from "../Button";
import { IconRevel } from "../Icons/IconRevel";
import { IconHide } from "../Icons/IconHide";

interface IPasswordInputProps {
  name: string;
  label: string;
  value?: string;
  error?: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export default function PasswordInput({
  name,
  label,
  value,
  error,
  onChange,
}: IPasswordInputProps) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const getIcon = () => {
    return !isShowPassword ? (
      <IconRevel className="w-5 h-5" />
    ) : (
      <IconHide className="w-5 h-5" />
    );
  };

  return (
    <InputWithError
      inputProps={{
        type: isShowPassword ? "text" : "password",
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
    >
      <Button
        onClick={() => setIsShowPassword((prev) => !prev)}
        type="button"
        className=" absolute stroke-main-orange w-6 h-6 top-1/2 -translate-y-1/2 right-4"
      >
        {getIcon()}
      </Button>
    </InputWithError>
  );
}
