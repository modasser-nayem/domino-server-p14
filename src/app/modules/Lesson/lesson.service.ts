import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import { TCreateLesson, TUpdateLesson } from "./lesson.interface";
import { LessonRepository } from "./lesson.repository";

export class LessonService {
  constructor() {
    bindAllMethods(this);
  }

  // create Lesson
  public async createLesson(payload: { data: TCreateLesson }) {
    return await LessonRepository.createLesson(payload);
  }

  // Update Lesson
  public async updateLesson(payload: {
    lessonId: string;
    courseId: string;
    data: TUpdateLesson;
  }) {
    const existLesson = await LessonRepository.findLessonById(payload.lessonId);

    if (!existLesson) {
      throw new AppError(400, "Invalid lesson_id");
    }

    if (existLesson.course_id !== payload.courseId) {
      throw new AppError(400, "This lesson not exist on that course");
    }

    // if just title change
    if (payload.data.title && !payload.data.order) {
      payload.data.title = `${existLesson.order}: ${payload.data.title}`;
    }

    return await LessonRepository.updateLesson({
      lessonId: payload.lessonId,
      data: payload.data,
    });
  }

  // Delete Lesson
  public async deleteLesson(payload: { courseId: string; lessonId: string }) {
    const existLesson = await LessonRepository.findLessonById(payload.lessonId);

    if (!existLesson) {
      throw new AppError(400, "Invalid lesson_id");
    }

    if (existLesson.course_id !== payload.courseId) {
      throw new AppError(400, "This lesson not exist on that course");
    }

    return await LessonRepository.deleteLesson({
      lessonId: payload.lessonId,
    });
  }
}
