import { z } from "zod";
import { courseSchemaValidation } from "./course.validation";

export type TCreateCourse = z.infer<typeof courseSchemaValidation.createCourse>;

export type TUpdateCourse = z.infer<typeof courseSchemaValidation.updateCourse>;

export type TUpdateCourseStatus = z.infer<
  typeof courseSchemaValidation.updateCourseStatus
>;

export type TAssignCourseInstructor = z.infer<
  typeof courseSchemaValidation.assignCourseInstructor
>;
