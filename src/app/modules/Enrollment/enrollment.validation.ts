import { z } from "zod";

const enroll = z.object({
  courseId: z
    .string({ required_error: "course id is required!" })
    .refine((v) => v !== "", { message: "courseId is required" }),
});

export const enrollmentSchemaValidation = { enroll };
