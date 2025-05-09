import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import AppError from "../errors/AppError";
import { CourseRepository } from "../modules/Course/course.repository";

export const instructorCourseAccess = () => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const courseId = req.params.courseId;
      console.log(req.params);

      if (!courseId) {
        throw new AppError(401, "Please provide courseId in req.params");
      }

      if (
        !(await CourseRepository.isInstructorCourseAccess(
          courseId,
          req.user.id,
        ))
      ) {
        throw new AppError(403, "You don't have permission to access!");
      }

      next();
    },
  );
};
