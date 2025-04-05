import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { authSchemaValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { asyncHandler } from "../../utils/asyncHandler";
import { authMiddleware } from "../../middlewares/auth";

class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initRoutes();
  }

  private initRoutes() {
    // Register Student
    this.router.post(
      "/register/student",
      requestValidate(authSchemaValidation.register),
      asyncHandler(this.authController.registerStudent),
    );

    // Register Instructor
    this.router.post(
      "/register/instructor",
      authMiddleware("admin"),
      requestValidate(authSchemaValidation.register),
      asyncHandler(this.authController.registerInstructor),
    );

    // Register Admin
    this.router.post(
      "/register/admin",
      authMiddleware("admin"),
      requestValidate(authSchemaValidation.register),
      asyncHandler(this.authController.registerAdmin),
    );

    // Login User
    this.router.post(
      "/login",
      requestValidate(authSchemaValidation.login),
      asyncHandler(this.authController.login),
    );

    // Change Password
    this.router.put(
      "/change-password",
      authMiddleware(),
      requestValidate(authSchemaValidation.changePassword),
      asyncHandler(this.authController.changePassword),
    );

    // Forgot Password
    this.router.post(
      "/forgot-password",
      requestValidate(authSchemaValidation.forgotPassword),
      asyncHandler(this.authController.forgotPassword),
    );

    // Reset Password
    this.router.put(
      "/reset-password",
      requestValidate(authSchemaValidation.resetPassword),
      asyncHandler(this.authController.resetPassword),
    );
  }
}

const authRoutes = new AuthRouter().router;
export default authRoutes;
