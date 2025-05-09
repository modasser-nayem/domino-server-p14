import { z } from "zod";
import { moduleSchemaValidation } from "./module.validation";

export type TCreateModule = z.infer<
  typeof moduleSchemaValidation.createModule
> & { courseId: string; lessonId: string; order: number };

export type TUpdateModule = z.infer<typeof moduleSchemaValidation.updateModule>;
