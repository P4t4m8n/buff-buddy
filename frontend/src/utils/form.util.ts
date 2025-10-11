//Utils
import { validationUtil } from "../../../shared/validations/util.validation";
//Types
import type { ZodError, ZodObject } from "zod";
import type { IToSanitize } from "../../../shared/models/app.model";
import type { TErrors } from "../models/errors.model";

const handleInputChange = <T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setStateToEdit: React.Dispatch<React.SetStateAction<T | null>>
) => {
  e.stopPropagation();
  const target = e.target as HTMLInputElement;
  const { name, value, type, checked } = target;

  let newVal: boolean | string | number | null;
  switch (type) {
    case "checkbox":
      newVal = checked;
      break;
    case "number":
      newVal = parseFloat(value);
      break;
    default:
      newVal = value;
      break;
  }

  setStateToEdit((prev) => {
    if (!prev) return null;
    return {
      ...prev,
      [name]: newVal,
    };
  });
};

//TODO:Add proper key validation
const onInputChangeWithValidation = <T>({
  event,
  setStateToEdit,
  factory,
  setSingleFiledError,
}: {
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  setStateToEdit: React.Dispatch<React.SetStateAction<T | null>>;
  factory: ({ toSanitize }: IToSanitize) => ZodObject<any>;
  setSingleFiledError: ({
    key,
    error,
  }: {
    key: keyof TErrors<T>;
    error: ZodError<Record<string, unknown>> | undefined;
  }) => void;
}) => {
  event.stopPropagation();
  const target = event.target as HTMLInputElement;
  const { name, value, type, checked } = target;

  let newVal: boolean | string | number | null;
  switch (type) {
    case "checkbox":
      newVal = checked;
      break;
    case "number":
      newVal = parseFloat(value);
      break;
    default:
      newVal = value;
      break;
  }

  const { error } = validationUtil.validateFieldOnly({
    toSanitize: false,
    factory,
    value: newVal,
    field: name,
  });

  setSingleFiledError({
    key: name as keyof TErrors<T>,
    error,
  });

  setStateToEdit((prev) => {
    if (!prev) return null;
    return {
      ...prev,
      [name]: newVal,
    };
  });
};

export const formUtil = {
  handleInputChange,
   onInputChangeWithValidation,
};
