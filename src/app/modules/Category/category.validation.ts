import { z } from "zod";

const addCategory = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((v) => v !== "", { message: "name is required" }),
});

const updateCategory = z.object({
  name: z
    .string()
    .refine((v) => v !== "", { message: "name is required" })
    .optional(),
});

export const categorySchemaValidation = { addCategory, updateCategory };
