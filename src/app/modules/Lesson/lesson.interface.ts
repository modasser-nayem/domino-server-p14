import { z } from "zod";
import { lessonSchemaValidation } from "./lesson.validation";

export type TCreateLesson = z.infer<
  typeof lessonSchemaValidation.createLesson
> & { order: number };

export type TUpdateLesson = z.infer<typeof lessonSchemaValidation.updateLesson>;

export type TDeleteLesson = z.infer<typeof lessonSchemaValidation.deleteLesson>;
