import { Request, Response } from "express";
import { bindAllMethods } from "../../utils/bindmethod";
import sendResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";

export class CourseController {
  private courseService: CourseService;
  constructor() {
    this.courseService = new CourseService();
    bindAllMethods(this);
  }

  // Create new course
  async createCourse(req: Request, res: Response) {
    const result = await this.courseService.createCourse({ data: req.body });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Successfully create new course",
      data: result,
    });
  }

  // get all course
  async getAllCourse(req: Request, res: Response) {
    const result = await this.courseService.getAllCourse({ query: req.query });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved courses",
      data: result,
    });
  }

  // get student enrolled courses
  async getStudentEnrolledCourses(req: Request, res: Response) {
    const result = await this.courseService.getStudentEnrolledCourses({
      studentId: req.user.id,
      query: req.query,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved courses",
      data: result,
    });
  }

  // get instructor assign course
  async getInstructorAssignCourses(req: Request, res: Response) {
    const result = await this.courseService.getInstructorAssignCourses({
      instructorId: req.user.id,
      query: req.query,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved courses",
      data: result,
    });
  }

  // get course details
  async getCourseDetails(req: Request, res: Response) {
    const result = await this.courseService.getCourseDetails({
      courseId: req.params.id,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved course details",
      data: result,
    });
  }

  // update course
  async updateCourse(req: Request, res: Response) {
    const result = await this.courseService.updateCourse({
      courseId: req.params.id,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course Successfully Updated",
      data: result,
    });
  }

  // update course status
  async updateCourseStatus(req: Request, res: Response) {
    const result = await this.courseService.updateCourseStatus({
      courseId: req.params.id,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully update course status",
      data: result,
    });
  }

  // assign course instructor
  async assignCourseInstructor(req: Request, res: Response) {
    const result = await this.courseService.assignCourseInstructor({
      courseId: req.params.id,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully assign instructor",
      data: result,
    });
  }

  // delete course
  async deleteCourse(req: Request, res: Response) {
    const result = await this.courseService.deleteCourse({
      courseId: req.params.id,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course successfully deleted",
      data: result,
    });
  }
}
