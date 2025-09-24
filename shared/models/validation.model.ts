import { z } from "zod";

export interface IValidation<
  CreateInput,
  UpdateInput,
  Filter extends z.ZodType
> {
  createFactorySchema: (options: {
    toSanitize?: boolean;
  }) => z.ZodType<CreateInput>;
  updateFactorySchema: (options: {
    toSanitize?: boolean;
  }) => z.ZodType<UpdateInput>;
  QuerySchema: Filter;
}
