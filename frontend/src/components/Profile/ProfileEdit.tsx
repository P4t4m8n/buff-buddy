//Lib
import { useState } from "react";
//Store
import { useAuthStore } from "../../store/auth.store";
//Hooks
import { useErrors } from "../../hooks/shared/useErrors";
import { usePageBack } from "../../hooks/shared/usePageBack";
//Validations
import {
  authValidation,
  type TUpdateUserInput,
} from "../../../../shared/validations/auth.validation";
//UI
import InputWithError from "../UI/Form/InputWithError";
import GenericSaveButton from "../UI/GenericSaveButton";
import Button from "../UI/Button";

interface IProfileEditProps {
  onSaved: () => void;
}

export default function ProfileEdit({ onSaved }: IProfileEditProps) {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const isSaving = useAuthStore((state) => state.isLoadingAuth);

  const { onBack } = usePageBack();
  const { errors, handleError, clearErrors } = useErrors<TUpdateUserInput>();

  const [profile, setProfile] = useState<TUpdateUserInput>({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      clearErrors();
      const validatedProfile = authValidation
        .updateUserFactorySchema({ toSanitize: false })
        .parse(profile);

      await updateUser(validatedProfile);
      onSaved();
    } catch (error) {
      handleError({ error, emitToToast: false });
    }
  };

  const inputs: { name: keyof TUpdateUserInput; label: string }[] = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
  ];

  return (
    <form onSubmit={onSubmit} className="grid gap-6 px-desktop h-fit">
      {inputs.map(({ name, label }) => (
        <InputWithError
          key={name}
          inputProps={{
            value: profile[name],
            type: "text",
            name,
            id: `${name}-profile-edit`,
            onChange: handleInputChange,
            className: "h-10 pl-2",
          }}
          labelProps={{
            htmlFor: `${name}-profile-edit`,
            children: label,
            isMoveUpEffect: true,
          }}
          error={errors?.[name]}
        />
      ))}

      <div className="grid grid-cols-2 gap-4 h-10">
        <Button buttonStyle="warning" type="button" onClick={onBack}>
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
