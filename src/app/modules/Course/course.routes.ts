import express from "express";
import { authMiddleware } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";

import { asyncHandler } from "../../utils/asyncHandler";
import { CourseController } from "./course.controller";
import { courseSchemaValidation } from "./course.validation";
import { CourseService } from "./course.service";

const courseService = new CourseService();
const courseController = new CourseController(courseService);

export class CourseRouter {
  public router: express.Router;
  constructor(private controller: CourseController) {
    this.router = express.Router();
    this.initRoutes();
  }

  private initRoutes() {
    // Create Course
    this.router.post(
      "/",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.createCourse),
      asyncHandler(this.controller.createCourse),
    );

    // Get Courses
    this.router.get("/", asyncHandler(this.controller.getAllCourse));

    // Get student enrolled courses
    this.router.get(
      "/student",
      authMiddleware("student"),
      asyncHandler(this.controller.getStudentEnrolledCourses),
    );

    // Get instructor assign courses
    this.router.get(
      "/instructor",
      authMiddleware("instructor"),
      asyncHandler(this.controller.getInstructorAssignCourses),
    );

    // Get Course Details
    this.router.get("/:id", asyncHandler(this.controller.getCourseDetails));

    // Update Course
    this.router.put(
      "/:id",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.updateCourse),
      asyncHandler(this.controller.updateCourse),
    );

    // Update course status
    this.router.patch(
      "/status/:id",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.updateCourseStatus),
      asyncHandler(this.controller.updateCourseStatus),
    );

    // Assign course instructor
    this.router.patch(
      "/assign/:id",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.assignCourseInstructor),
      asyncHandler(this.controller.assignCourseInstructor),
    );

    // Delete course
    this.router.delete(
      "/:id",
      authMiddleware("admin"),
      asyncHandler(this.controller.deleteCourse),
    );
  }
}

const courseRoutes = new CourseRouter(courseController).router;
export default courseRoutes;
