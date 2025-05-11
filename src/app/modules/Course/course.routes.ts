import express from "express";
import { authMiddleware } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";

import { asyncHandler } from "../../utils/asyncHandler";
import { CourseController } from "./course.controller";
import { courseSchemaValidation } from "./course.validation";

class CourseRouter {
  public router: express.Router;
  private courseController: CourseController;
  constructor() {
    this.router = express.Router();
    this.courseController = new CourseController();
    this.initRoutes();
  }

  private initRoutes() {
    // Create Course
    this.router.post(
      "/",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.createCourse),
      asyncHandler(this.courseController.createCourse),
    );

    // Get Courses
    this.router.get("/", asyncHandler(this.courseController.getAllCourse));

    // Get student enrolled courses
    this.router.get(
      "/student",
      authMiddleware("student"),
      asyncHandler(this.courseController.getStudentEnrolledCourses),
    );

    // Get instructor assign courses
    this.router.get(
      "/instructor",
      authMiddleware("instructor"),
      asyncHandler(this.courseController.getInstructorAssignCourses),
    );

    // Get Course Details
    this.router.get(
      "/:id",
      asyncHandler(this.courseController.getCourseDetails),
    );

    // Update Course
    this.router.put(
      "/:id",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.updateCourse),
      asyncHandler(this.courseController.updateCourse),
    );

    // Update course status
    this.router.patch(
      "/status/:id",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.updateCourseStatus),
      asyncHandler(this.courseController.updateCourseStatus),
    );

    // Assign course instructor
    this.router.patch(
      "/assign/:id",
      authMiddleware("admin"),
      requestValidate(courseSchemaValidation.assignCourseInstructor),
      asyncHandler(this.courseController.assignCourseInstructor),
    );

    // Delete course
    this.router.delete(
      "/:id",
      authMiddleware("admin"),
      asyncHandler(this.courseController.deleteCourse),
    );
  }
}

const courseRoutes = new CourseRouter().router;
export default courseRoutes;
