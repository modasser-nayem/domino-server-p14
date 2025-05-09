import prisma from "../../db/connector";
import { TCreateLesson, TUpdateLesson } from "./lesson.interface";

export class LessonRepository {
  // create new lesson
  public static async createLesson(payload: { data: TCreateLesson }) {
    const lessonCount = await prisma.lesson.count({
      where: { course_id: payload.data.course_id },
    });
    payload.data.order = lessonCount + 1;

    return await prisma.lesson.create({
      data: {
        course_id: payload.data.course_id,
        title: `${payload.data.order}: ${payload.data.title}`,
        description: payload.data.description,
        order: payload.data.order,
      },
    });
  }

  // update lesson
  public static async updateLesson(payload: {
    lessonId: string;
    data: TUpdateLesson;
  }) {
    const newData = {
      title: payload.data.title,
      description: payload.data.description,
      order: payload.data.order,
    };

    return await prisma.lesson.update({
      where: { id: payload.lessonId },
      data: newData,
    });
  }

  // delete lesson
  public static async deleteLesson(payload: { lessonId: string }) {
    const result = await prisma.$transaction(async (t) => {
      const deletedLesson = await t.lesson.delete({
        where: { id: payload.lessonId },
      });

      await t.module.deleteMany({ where: { lesson_id: payload.lessonId } });

      return deletedLesson;
    });

    return result;
  }

  // find lesson by id
  public static async findLessonById(id: string) {
    return await prisma.lesson.findFirst({
      where: {
        id,
      },
    });
  }
}
