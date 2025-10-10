//Lib
import { useEffect, useState, type FormEvent } from "react";
//Validations
import { authValidation } from "../../../../../shared/validations/auth.validation";
//Store
import { useAuthStore } from "../../../store/auth.store";
//Util
import { authUtil } from "../../../utils/auth.util";
import { formUtil } from "../../../utils/form.util";
//Hooks
import { useErrors } from "../../shared/useErrors";
//Types
import type {
  IAuthSignInDTO,
  IAuthSignUpDTO,
} from "../../../../../shared/models/auth.model";

type TAuthState = IAuthSignInDTO | IAuthSignUpDTO | null;

interface IUseAuthFormProps {
  isSignUp?: boolean;
}

export const useAuthForm = ({ isSignUp }: IUseAuthFormProps) => {
  const [authForm, setAuthForm] = useState<TAuthState>(
    authUtil.getEmptySignIn()
  );

  useEffect(() => {
    const _authForm = isSignUp
      ? authUtil.getEmptySignUp()
      : authUtil.getEmptySignIn();
    setAuthForm(_authForm);
  }, [isSignUp]);

  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const isLoading = useAuthStore((state) => state.isLoadingAuth);

  const { errors, handleError, setSingleFiledError } = useErrors<
    IAuthSignInDTO | IAuthSignUpDTO
  >();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (isSignUp) {
        const validateData = authValidation
          .signUpFactorySchema({
            toSanitize: false,
          })
          .parse(authForm);
        await signUp(validateData);
        return;
      }
      const validateData = authValidation
        .signInFactorySchema({
          toSanitize: false,
        })
        .parse(authForm);
      await signIn(validateData);
      return;
    } catch (error) {
      handleError({ error });
    }
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const factory = isSignUp
      ? authValidation.signUpFactorySchema
      : authValidation.signInFactorySchema;

    formUtil.handleInputChangeWithValidation({
      event,
      setStateToEdit: setAuthForm,
      factory,
      setSingleFiledError,
    });
  };

  return { isLoading, errors, authForm, handleSubmit, onChange };
};
