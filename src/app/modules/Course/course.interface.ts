import { z } from "zod";
import { courseSchemaValidation } from "./course.validation";

export type TCourseDTO = {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  status: string;
  created_at: Date;
  updated_at: Date;
  total_lessons: number;
  total_modules: number;
  category: string;
};

export type TCourseDetailsDTO = TCourseDTO & {
  description: string;
  instructor: {
    id: string;
    name: string;
    profile_picture: string | null;
  } | null;
  lessons: {
    id: string;
    title: string;
    description: string;
    order: number;
    modules: {
      id: string;
      title: string;
      video_url: string;
      order: number;
    }[];
  }[];
};

export type TCreateCourse = z.infer<typeof courseSchemaValidation.createCourse>;

export type TUpdateCourse = z.infer<typeof courseSchemaValidation.updateCourse>;

export type TUpdateCourseStatus = z.infer<
  typeof courseSchemaValidation.updateCourseStatus
>;

export type TAssignCourseInstructor = z.infer<
  typeof courseSchemaValidation.assignCourseInstructor
>;
