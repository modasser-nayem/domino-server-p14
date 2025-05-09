import prisma from "../../db/connector";
import { TCreateModule, TUpdateModule } from "./module.interface";

export class ModuleRepository {
  // create new module
  public static async createModule(payload: { data: TCreateModule }) {
    const moduleCount = await prisma.module.count({
      where: {
        lesson_id: payload.data.lessonId,
        course_id: payload.data.courseId,
      },
    });
    payload.data.order = moduleCount + 1;

    const result = await prisma.module.create({
      data: {
        lesson_id: payload.data.lessonId,
        course_id: payload.data.courseId,
        title: `${payload.data.order}: ${payload.data.title}`,
        video_url: payload.data.video_url,
        order: payload.data.order,
      },
    });

    return result;
  }

  // Get module
  static async getModule(payload: { moduleId: string }) {
    return await prisma.module.findUnique({ where: { id: payload.moduleId } });
  }

  // Update module
  static async updateModule(payload: {
    moduleId: string;
    data: TUpdateModule;
  }) {
    const result = await prisma.module.update({
      where: { id: payload.moduleId },
      data: payload.data,
    });

    return result;
  }

  // delete module
  public static async deleteModule(payload: { moduleId: string }) {
    const result = await prisma.module.delete({
      where: { id: payload.moduleId },
    });

    return result;
  }

  // find module by id
  static async findModuleById(id: string) {
    return await prisma.module.findUnique({
      where: {
        id,
      },
    });
  }

  // find lesson by id
  public static async findLesson(id: string) {
    return await prisma.lesson.findFirst({
      where: {
        id,
      },
    });
  }
}
