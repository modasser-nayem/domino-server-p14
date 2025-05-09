import express from "express";
import { authMiddleware } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";

import { asyncHandler } from "../../utils/asyncHandler";
import { instructorCourseAccess } from "../../middlewares/instructorCourseAccess";
import { moduleSchemaValidation } from "./module.validation";
import { ModuleController } from "./module.controller";

class ModuleRouter {
  public router: express.Router;
  private moduleController: ModuleController;
  constructor() {
    this.router = express.Router({ mergeParams: true });
    this.moduleController = new ModuleController();
    this.initRoutes();
  }

  private initRoutes() {
    // Create New Module
    this.router.post(
      "/",
      authMiddleware("instructor"),
      requestValidate(moduleSchemaValidation.createModule),
      instructorCourseAccess(),
      asyncHandler(this.moduleController.createModule),
    );

    // Get module
    this.router.get(
      "/:moduleId",
      authMiddleware(),
      // instructor and student access
      asyncHandler(this.moduleController.getModule),
    );

    // Update Module
    this.router.put(
      "/:moduleId",
      authMiddleware("instructor"),
      requestValidate(moduleSchemaValidation.updateModule),
      instructorCourseAccess(),
      asyncHandler(this.moduleController.updateModule),
    );

    // delete module
    this.router.delete(
      "/:moduleId",
      authMiddleware("instructor"),
      instructorCourseAccess(),
      asyncHandler(this.moduleController.deleteModule),
    );
  }
}

const courseModuleRoutes = new ModuleRouter().router;
export default courseModuleRoutes;
