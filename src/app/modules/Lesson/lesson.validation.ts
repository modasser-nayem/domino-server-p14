import { z } from "zod";

const createLesson = z.object({
  title: z
    .string({ required_error: "title is required" })
    .refine((v) => v !== "", { message: "title is required" }),
  description: z
    .string({ required_error: "description is required" })
    .refine((v) => v !== "", { message: "description is required" }),
  course_id: z
    .string({ required_error: "course_id is required" })
    .refine((v) => v !== "", { message: "course_id is required" }),
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
  course_id: z
    .string({ required_error: "course_id is required" })
    .refine((v) => v !== "", { message: "course_id is required" }),
  order: z.number().min(1).optional(),
});

const deleteLesson = z.object({
  course_id: z
    .string({ required_error: "course_id is required" })
    .refine((v) => v !== "", { message: "course_id is required" }),
});

export const lessonSchemaValidation = {
  createLesson,
  updateLesson,
  deleteLesson,
};
