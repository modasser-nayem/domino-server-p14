import express from "express";
import { authMiddleware } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";

import { asyncHandler } from "../../utils/asyncHandler";
import { LessonController } from "./lesson.controller";
import { lessonSchemaValidation } from "./lesson.validation";
import { instructorCourseAccess } from "../../middlewares/instructorCourseAccess";

class LessonRouter {
  public router: express.Router;
  private lessonController: LessonController;
  constructor() {
    this.router = express.Router();
    this.lessonController = new LessonController();
    this.initRoutes();
  }

  private initRoutes() {
    // Create lesson
    this.router.post(
      "/create",
      authMiddleware("instructor"),
      requestValidate(lessonSchemaValidation.createLesson),
      instructorCourseAccess(),
      asyncHandler(this.lessonController.createLesson),
    );

    // Update lesson
    this.router.put(
      "/:id",
      authMiddleware("instructor"),
      requestValidate(lessonSchemaValidation.updateLesson),
      instructorCourseAccess(),
      asyncHandler(this.lessonController.updateLesson),
    );

    // Delete Lesson
    this.router.delete(
      "/:id",
      authMiddleware("instructor"),
      requestValidate(lessonSchemaValidation.deleteLesson),
      instructorCourseAccess(),
      asyncHandler(this.lessonController.deleteLesson),
    );
  }
}

const lessonRoutes = new LessonRouter().router;
export default lessonRoutes;
