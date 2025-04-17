import prisma from "../../db/connector";
import { TCreateLesson, TUpdateLesson } from "./lesson.interface";

export class LessonRepository {
  // create new lesson
  public static async createLesson(payload: { data: TCreateLesson }) {
    const lessonCount = await prisma.lesson.count();
    payload.data.order = lessonCount + 1;

    return await prisma.lesson.create({ data: payload.data });
  }

  // update lesson
  public static async updateLesson(payload: {
    lesson_id: string;
    data: TUpdateLesson;
  }) {
    const newData = {
      title: payload.data.title,
      description: payload.data.description,
      order: payload.data.order,
    };

    return await prisma.lesson.update({
      where: { id: payload.lesson_id },
      data: newData,
    });
  }

  // delete lesson
  public static async deleteLesson(payload: {
    lesson_id: string;
    course_id: string;
  }) {
    // TODO: also delete related lesson, module everything relate
    return { ...payload, message: "Delete Lesson" };
  }

  // find lesson by id
  public static async findLesson(id: string) {
    return await prisma.lesson.findFirst({
      where: {
        id,
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
