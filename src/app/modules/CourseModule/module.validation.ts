import { z } from "zod";

const createModule = z.object({
  title: z
    .string({ required_error: "title is required" })
    .refine((v) => v !== "", { message: "title is required" }),
  video_url: z.string({ required_error: "Video URL is required" }).url(),
});

const updateModule = z.object({
  title: z
    .string()
    .refine((v) => v !== "", { message: "title is required" })
    .optional(),
  video_url: z.string().url().optional(),
  order: z.number().min(1).optional(),
});

export const moduleSchemaValidation = {
  createModule,
  updateModule,
};
