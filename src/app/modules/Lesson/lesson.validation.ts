import { z } from "zod";

const createLesson = z.object({
  title: z
    .string({ required_error: "title is required" })
    .refine((v) => v !== "", { message: "title is required" }),
  description: z
    .string({ required_error: "description is required" })
    .refine((v) => v !== "", { message: "description is required" }),
});

const updateLesson = z.object({
  title: z
    .string()
    .refine((v) => v !== "", { message: "title is required" })
    .optional(),
  description: z
    .string()
    .refine((v) => v !== "", { message: "description is required" })
    .optional(),
  order: z.number().min(1).optional(),
});

export const lessonSchemaValidation = {
  createLesson,
  updateLesson,
};
