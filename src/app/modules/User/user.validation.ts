import { z } from "zod";

const updateProfile = z.object({
  name: z
    .string({ required_error: "name is required" })
    .refine((value) => value !== "", { message: "name is required" })
    .optional(),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email address" })
    .optional(),
  profile_picture: z
    .string()
    .refine((value) => value !== "", {
      message: "profile picture is required",
    })
    .optional(),
});

export const userSchemaValidation = { updateProfile };
