import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import { paginate } from "../../utils/pagination";
import {
  TAssignCourseInstructor,
  TCourseDTO,
  TCreateCourse,
  TUpdateCourse,
  TUpdateCourseStatus,
} from "./course.interface";
import { PaginationQuery } from "../../types/pagination";
import AppError from "../../errors/AppError";

export class CourseRepository {
  // create new course
  public static async createCourse(payload: { data: TCreateCourse }) {
    const newData = await prisma.course.create({
      data: payload.data,
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
      },
    });

    const result: TCourseDTO & { description: string } = {
      id: newData.id,
      title: newData.title,
      thumbnail: newData.thumbnail,
      description: newData.description,
      category: newData.category.name,
      price: newData.price,
      status: newData.status,
      total_lessons: newData._count.lessons,
      total_modules: newData._count.modules,
      total_enroll: newData._count.enrollments,
      created_at: newData.created_at,
      updated_at: newData.updated_at,
    };

    return result;
  }

  // get all course
  public static async getAllCourse(payload: { query: PaginationQuery }) {
    const select: Prisma.CourseSelect = {
      id: true,
      title: true,
      thumbnail: true,
      price: true,
      status: true,
      created_at: true,
      updated_at: true,
      category: true,
      _count: true,
    };

    const result = await paginate({
      model: prisma.course,
      select,
      page: payload.query.page,
      limit: payload.query.limit,
      sortBy: payload.query.sortBy,
      sortOrder: payload.query.sortOrder,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: TCourseDTO[] = result.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      category: item.category.name,
      price: item.price,
      status: item.status,
      total_lessons: item._count.lessons,
      total_modules: item._count.modules,
      total_enroll: item._count.enrollments,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    result.data = data;

    return result;
  }

  // get student enrolled courses
  public static async getStudentEnrolledCourses(payload: {
    studentId: string;
    query: PaginationQuery;
  }) {
    const where: Prisma.CourseWhereInput = {
      enrollments: { every: { student_id: payload.studentId } },
    };

    const select: Prisma.CourseSelect = {
      id: true,
      title: true,
      thumbnail: true,
      price: true,
      status: true,
      created_at: true,
      updated_at: true,
      category: true,
      _count: true,
    };

    const result = await paginate({
      model: prisma.course,
      select,
      where,
      page: payload.query.page,
      limit: payload.query.limit,
      sortBy: payload.query.sortBy,
      sortOrder: payload.query.sortOrder,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: TCourseDTO[] = result.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      category: item.category.name,
      price: item.price,
      status: item.status,
      total_lessons: item._count.lessons,
      total_modules: item._count.modules,
      total_enroll: item._count.enrollments,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    result.data = data;

    return result;
  }

  // get instructor assign courses
  public static async getInstructorAssignCourses(payload: {
    instructorId: string;
    query: PaginationQuery;
  }) {
    const where: Prisma.CourseWhereInput = {
      instructor_id: payload.instructorId,
    };

    const select: Prisma.CourseSelect = {
      id: true,
      title: true,
      thumbnail: true,
      price: true,
      status: true,
      created_at: true,
      updated_at: true,
      category: true,
      _count: true,
    };

    const result = await paginate({
      model: prisma.course,
      where,
      select,
      page: payload.query.page,
      limit: payload.query.limit,
      sortBy: payload.query.sortBy,
      sortOrder: payload.query.sortOrder,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: TCourseDTO[] = result.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      category: item.category.name,
      price: item.price,
      status: item.status,
      total_lessons: item._count.lessons,
      total_modules: item._count.modules,
      total_enroll: item._count.enrollments,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    result.data = data;

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
        _count: {
          select: {
            lessons: true,
            modules: true,
          },
        },
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
    const updateData = await prisma.course.update({
      where: { id: payload.courseId },
      data: payload.data,
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
      },
    });

    const result: TCourseDTO & { description: string } = {
      id: updateData.id,
      title: updateData.title,
      thumbnail: updateData.thumbnail,
      description: updateData.description,
      category: updateData.category.name,
      price: updateData.price,
      status: updateData.status,
      total_lessons: updateData._count.lessons,
      total_modules: updateData._count.modules,
      total_enroll: updateData._count.enrollments,
      created_at: updateData.created_at,
      updated_at: updateData.updated_at,
    };

    return result;
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
    // if any student enroll course can't delete
    const enrollAnyone = await prisma.enrollment.findFirst({
      where: { course_id: payload.courseId },
    });

    if (enrollAnyone) {
      throw new AppError(
        400,
        "Student already enrolled on this course, you can't delete it",
      );
    }

    await prisma.$transaction(async (tran) => {
      await tran.course.delete({ where: { id: payload.courseId } });

      await tran.lesson.deleteMany({ where: { course_id: payload.courseId } });

      await tran.module.deleteMany({ where: { course_id: payload.courseId } });
    });

    return { course_id: payload.courseId };
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
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  // find instructor by id
  public static async findInstructor(id: string) {
    return await prisma.user.findUnique({
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
