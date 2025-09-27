import { programsService } from "./programs.service";

import { programValidation } from "../../../../shared/validations/program.validations";

import { genericControllerFactory } from "../../shared/generics/genericControllerFactory";

import type {
  TProgramCreateValidatedInput,
  TProgramQuery,
  TProgramUpdateValidatedInput,
} from "../../../../shared/validations/program.validations";

import type {
  IProgramDTO,
  IProgramEditDTO,
  IProgramFilter,
} from "../../../../shared/models/program.model";
import type { IProgram } from "./programs.models";

export const programsController = genericControllerFactory<
  IProgramDTO,
  IProgramEditDTO,
  IProgramFilter,
  TProgramCreateValidatedInput,
  TProgramUpdateValidatedInput,
  TProgramQuery,
  IProgram
>({
  service: programsService,
  validation: programValidation,
  entityName: "Program",
  isAuth: true,
});
