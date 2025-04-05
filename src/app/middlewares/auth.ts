import { NextFunction, Request, Response } from "express";
import { JwtService } from "./../utils/jwt";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/Auth/auth.interface";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthRepository } from "../modules/Auth/auth.repository";

const jwtService = new JwtService();

export const authMiddleware = (...roles: TUserRole[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) throw new AppError(401, "unauthorized access");
      const decoded = jwtService.verifyAccessToken(token);
      if (!decoded) throw new AppError(401, "unauthorized access");

      if (!(await AuthRepository.findById(decoded.id))) {
        throw new AppError(401, "account not found!");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        throw new AppError(
          403,
          "You don't have permission to access this data!",
        );
      }

      req.user = decoded;
      next();
    },
  );
};
