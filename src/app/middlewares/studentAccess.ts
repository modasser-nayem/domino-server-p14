import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import AppError from "../errors/AppError";

export const studentAccess = () => {
  return asyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const courseId = req.params.courseId;

      if (!courseId) {
        throw new AppError(401, "Please provide courseId as params");
      }

      next();
    },
  );
};
