import { z } from "zod";
import { lessonSchemaValidation } from "./lesson.validation";

export type TCreateLesson = z.infer<
  typeof lessonSchemaValidation.createLesson
> & { course_id: string; order: number };

export type TUpdateLesson = z.infer<typeof lessonSchemaValidation.updateLesson>;
