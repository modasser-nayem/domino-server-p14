import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { LessonRepository } from "../modules/Lesson/lesson.repository";
import AppError from "../errors/AppError";

export const instructorCourseAccess = () => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const course_id = req.body.course_id;

      if (!course_id) {
        throw new AppError(401, "Please provide course_id in req.body");
      }

      if (
        !(await LessonRepository.isInstructorCourseAccess(
          course_id,
          req.user.id,
        ))
      ) {
        throw new AppError(403, "You don't have permission to access!");
      }

      next();
    },
  );
};
