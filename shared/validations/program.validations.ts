import { z } from "zod";
import { validationUtil } from "./util.validation";
import { programWorkoutValidation } from "./programWorkout.validations";

const programFactorySchema = ({ toSanitize }: { toSanitize?: boolean }) => {
  return z.object({
    name: validationUtil.stringSchemaFactory({
      fieldName: "Program name",
      minLength: 1,
      maxLength: 100,
      toSanitize,
    }),

    notes: validationUtil
      .stringSchemaFactory({
        fieldName: "Program notes",
        minLength: 0,
        maxLength: 500,
        toSanitize,
      })
      .optional()
      .nullish(),

    startDate: validationUtil.DateSchema,

    endDate: validationUtil.DateSchema,

    isActive: z.coerce.boolean().default(true),

    programWorkouts: z
      .array(
        programWorkoutValidation.createProgramWorkoutFactorySchema({
          toSanitize,
        })
      )
      .min(1, "At least one exercise is required")
      .max(50, "Maximum 50 exercises allowed per program"),
  });
};

const createProgramFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return programFactorySchema({ toSanitize }).refine(
    (data) => data.endDate > data.startDate,
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );
};

const updateProgramFactorySchema = ({
  toSanitize,
}: {
  toSanitize?: boolean;
}) => {
  return programFactorySchema({ toSanitize })
    .extend({
      programWorkouts: z
        .array(
          programWorkoutValidation.updateProgramWorkoutFactorySchema({
            toSanitize,
          })
        )
        .min(1, "At least one exercise is required")
        .max(50, "Maximum 50 exercises allowed per program"),
    })
    .partial()
    .refine(
      (data) =>
        !data?.endDate || !data?.startDate || data.endDate > data.startDate,
      {
        message: "End date must be after start date",
        path: ["endDate"],
      }
    );
};

const ProgramQuerySchema = z.object({
  name: z.string().optional(),
  isActive: z.coerce.boolean().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  skip: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
});

export const programValidation = {
  createProgramFactorySchema,
  updateProgramFactorySchema,
  ProgramQuerySchema,
};

export type TCreateProgramInput = z.infer<
  ReturnType<typeof createProgramFactorySchema>
>;

export type TUpdateProgramInput = z.infer<
  ReturnType<typeof updateProgramFactorySchema>
>;

export type TProgramQuery = z.infer<typeof ProgramQuerySchema>;
