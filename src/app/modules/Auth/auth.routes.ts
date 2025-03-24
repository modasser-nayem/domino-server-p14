import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { authSchemaValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import { asyncHandler } from "../../utils/asyncHandler";

class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      "/register",
      requestValidate(authSchemaValidation.register),
      asyncHandler(this.authController.register),
    );

    this.router.post(
      "/login",
      requestValidate(authSchemaValidation.login),
      asyncHandler(this.authController.register),
    );
  }
}

const authRoutes = new AuthRouter().router;
export default authRoutes;
