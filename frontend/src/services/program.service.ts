import { genericServiceFactory } from "./generic.service";
import { programValidation } from "../../../shared/validations/program.validations";

import type {
  IProgramDTO,
  IProgramFilter,
  IProgramEditDTO,
} from "../../../shared/models/program.model";
import type {
  TProgramCreateValidatedInput,
  TProgramUpdateValidatedInput,
  TProgramQuery,
} from "../../../shared/validations/program.validations";

const rootPath = "/programs" as const;

export const programService = genericServiceFactory<
  IProgramDTO,
  IProgramEditDTO,
  IProgramFilter,
  TProgramCreateValidatedInput,
  TProgramUpdateValidatedInput,
  TProgramQuery
>({
  rootPath,
  validation: programValidation,
});
