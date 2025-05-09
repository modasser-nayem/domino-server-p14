import prisma from "../../db/connector";
import {
  TAssignCourseInstructor,
  TCourseDTO,
  TCreateCourse,
  TUpdateCourse,
  TUpdateCourseStatus,
} from "./course.interface";

export class CourseRepository {
  // create new course
  public static async createCourse(payload: { data: TCreateCourse }) {
    return await prisma.course.create({
      data: payload.data,
      include: { _count: true },
    });
  }

  // get all courses
  public static async getAllCourses() {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
        price: true,
        status: true,
        created_at: true,
        updated_at: true,
        category: true,
        _count: true,
      },
    });

    const result: TCourseDTO[] = courses.map((item) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      price: item.price,
      status: item.status,
      created_at: item.created_at,
      updated_at: item.updated_at,
      category: item.category.name,
      total_lessons: item._count.lessons,
      total_modules: item._count.modules,
    }));

    return result;
  }

  // get course details
  public static async getCourseDetails(payload: { courseId: string }) {
    const courseDetails = await prisma.course.findUnique({
      where: { id: payload.courseId },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        description: true,
        price: true,
        status: true,
        created_at: true,
        updated_at: true,
        category: true,
        _count: true,
        instructor: { select: { id: true, name: true, profile_picture: true } },
        lessons: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            modules: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                title: true,
                video_url: true,
                order: true,
              },
            },
          },
        },
      },
    });

    return courseDetails;
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

  // is instructor access
  public static async isInstructorCourseAccess(
    course_id: string,
    instructor_id: string,
  ) {
    const exist = await prisma.course.findFirst({
      where: {
        id: course_id,
        instructor_id,
      },
      select: {
        id: true,
        instructor_id: true,
      },
    });
    return exist ? true : false;
  }
}
