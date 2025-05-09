import { z } from "zod";

const createCourse = z.object({
  title: z
    .string({ required_error: "title is required" })
    .refine((v) => v !== "", { message: "title is required" }),
  thumbnail: z
    .string({ required_error: "thumbnail is required" })
    .refine((v) => v !== "", { message: "thumbnail is required" }),
  description: z
    .string({ required_error: "description is required" })
    .refine((v) => v !== "", { message: "description is required" }),
  category_id: z
    .string({ required_error: "category_id is required" })
    .refine((v) => v !== "", { message: "category is required" }),
  price: z
    .number({ required_error: "price is required" })
    .min(0, { message: "price can't be negative value" }),
});

const updateCourse = z.object({
  title: z
    .string()
    .refine((v) => v !== "", { message: "title is required" })
    .optional(),
  thumbnail: z
    .string()
    .refine((v) => v !== "", { message: "thumbnail is required" })
    .optional(),
  description: z
    .string()
    .refine((v) => v !== "", { message: "description is required" })
    .optional(),
  category_id: z
    .string()
    .refine((v) => v !== "", { message: "category is required" })
    .optional(),
  price: z
    .number()
    .min(0, { message: "price can't be negative value" })
    .optional(),
});

const updateCourseStatus = z.object({
  status: z.enum(["upcoming", "open", "closed"]),
});

const assignCourseInstructor = z.object({
  instructor_id: z
    .string({ required_error: "instructor_id is required" })
    .refine((v) => v !== "", { message: "instructor is required" }),
});

export const courseSchemaValidation = {
  createCourse,
  updateCourse,
  updateCourseStatus,
  assignCourseInstructor,
};
