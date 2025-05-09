import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import {
  TAssignCourseInstructor,
  TCreateCourse,
  TUpdateCourse,
  TUpdateCourseStatus,
} from "./course.interface";
import { CourseRepository } from "./course.repository";

export class CourseService {
  constructor() {
    bindAllMethods(this);
  }

  // create course
  public async createCourse(payload: { data: TCreateCourse }) {
    // title already exist

    // check category_id is valid
    if (!(await CourseRepository.findCategoryById(payload.data.category_id))) {
      throw new AppError(404, "Invalid category id");
    }

    return await CourseRepository.createCourse(payload);
  }

  // get all course
  public async getAllCourses() {
    return await CourseRepository.getAllCourses();
  }

  // get course details
  public async getCourseDetails(payload: { courseId: string }) {
    const result = await CourseRepository.getCourseDetails({
      courseId: payload.courseId,
    });

    if (!result) {
      throw new AppError(404, "Course not found!");
    }

    return result;
  }

  // update course
  public async updateCourse(payload: {
    courseId: string;
    data: TUpdateCourse;
  }) {
    // check course_id is valid
    if (!(await CourseRepository.findCourseById(payload.courseId))) {
      throw new AppError(400, "Invalid course_id");
    }

    // check category_id is valid
    if (
      payload.data.category_id &&
      !(await CourseRepository.findCategoryById(payload.data.category_id))
    ) {
      throw new AppError(400, "Invalid category id");
    }

    return await CourseRepository.updateCourse(payload);
  }

  // update course status
  public async updateCourseStatus(payload: {
    courseId: string;
    data: TUpdateCourseStatus;
  }) {
    const course = await CourseRepository.findCourseById(payload.courseId);

    // check course_id is valid
    if (!course) {
      throw new AppError(400, "Invalid course_id");
    }

    // if status already exist
    if (course.status === payload.data.status) {
      throw new AppError(400, `Status already ${course.status}`);
    }

    // if status open
    if (course.status === "open" && payload.data.status === "upcoming") {
      throw new AppError(400, "Open course can't be upcoming");
    }

    return await CourseRepository.updateCourseStatus(payload);
  }

  // assign course instructor
  public async assignCourseInstructor(payload: {
    courseId: string;
    data: TAssignCourseInstructor;
  }) {
    // check course_id is valid
    if (!(await CourseRepository.findCourseById(payload.courseId))) {
      throw new AppError(400, "Invalid course_id");
    }

    const instructor = await CourseRepository.findInstructor(
      payload.data.instructor_id,
    );

    if (!instructor) {
      throw new AppError(400, "Invalid instructor_id");
    }

    return await CourseRepository.assignCourseInstructor(payload);
  }

  // delete course
  public async deleteCourse(payload: { courseId: string }) {
    // check course_id is valid
    if (!(await CourseRepository.findCourseById(payload.courseId))) {
      throw new AppError(400, "Invalid course_id");
    }

    return await CourseRepository.deleteCourse(payload);
  }
}
