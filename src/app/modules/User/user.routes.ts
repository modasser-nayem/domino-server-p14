import { Router } from "express";
import requestValidate from "../../middlewares/requestValidation";
import { asyncHandler } from "../../utils/asyncHandler";
import { authMiddleware } from "../../middlewares/auth";
import { userSchemaValidation } from "./user.validation";
import { UserController } from "./user.controller";

class UserRouter {
  public router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initRoutes();
  }

  private initRoutes() {
    // Get all users
    this.router.get(
      "/",
      authMiddleware("admin"),
      asyncHandler(this.userController.getAllUsers),
    );

    // Get My Profile
    this.router.get(
      "/profile",
      authMiddleware(),
      asyncHandler(this.userController.getUserProfile),
    );

    // Get single user
    this.router.get(
      "/:id",
      authMiddleware("admin"),
      asyncHandler(this.userController.getSingleUser),
    );

    // Update my profile
    this.router.put(
      "/profile",
      authMiddleware(),
      requestValidate(userSchemaValidation.updateProfile),
      asyncHandler(this.userController.updateUserProfile),
    );
  }
}

const userRoutes = new UserRouter().router;
export default userRoutes;
