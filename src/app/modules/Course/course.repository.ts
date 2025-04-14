import prisma from "../../db/connector";
import {
  TAssignCourseInstructor,
  TCreateCourse,
  TUpdateCourse,
  TUpdateCourseStatus,
} from "./course.interface";

export class CourseRepository {
  // create new course
  public static async createCourse(payload: { data: TCreateCourse }) {
    return await prisma.course.create({ data: payload.data });
  }

  // get all courses
  public static async getAllCourses() {
    return await prisma.course.findMany();
  }

  // get course details
  public static async getCourseDetails(payload: { courseId: string }) {
    return await prisma.course.findUnique({
      where: { id: payload.courseId },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            profile_picture: true,
          },
        },
        lessons: true,
      },
    });
  }

  // update course
  public static async updateCourse(payload: {
    courseId: string;
    data: TUpdateCourse;
  }) {
    return await prisma.course.update({
      where: { id: payload.courseId },
      data: payload.data,
    });
  }

  // update course status
  public static async updateCourseStatus(payload: {
    courseId: string;
    data: TUpdateCourseStatus;
  }) {
    return await prisma.course.update({
      where: { id: payload.courseId },
      data: payload.data,
    });
  }

  // assign course instructor
  public static async assignCourseInstructor(payload: {
    courseId: string;
    data: TAssignCourseInstructor;
  }) {
    return await prisma.course.update({
      where: { id: payload.courseId },
      data: payload.data,
    });
  }

  // delete course
  public static async deleteCourse(payload: { courseId: string }) {
    // TODO: also delete related lesson, module everything relate
    return { ...payload, message: "Delete course" };
  }

  // find course by id
  public static async findCourseById(id: string) {
    return await prisma.course.findFirst({
      where: {
        id,
      },
    });
  }

  // find category by id
  public static async findCategoryById(id: string) {
    return await prisma.category.findFirst({
      where: {
        id,
      },
    });
  }

  // find instructor by id
  public static async findInstructor(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
        role: "instructor",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}
