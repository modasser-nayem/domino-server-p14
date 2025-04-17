import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import {
  TCreateLesson,
  TDeleteLesson,
  TUpdateLesson,
} from "./lesson.interface";
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
    lesson_id: string;
    data: TUpdateLesson;
  }) {
    const existLesson = await LessonRepository.findLesson(payload.lesson_id);

    if (!existLesson) {
      throw new AppError(400, "Invalid lesson_id");
    }

    if (existLesson.course_id !== payload.data.course_id) {
      throw new AppError(400, "This lesson not exist on that course");
    }

    return await LessonRepository.updateLesson(payload);
  }

  // Delete Lesson
  public async deleteLesson(payload: {
    lesson_id: string;
    data: TDeleteLesson;
  }) {
    const existLesson = await LessonRepository.findLesson(payload.lesson_id);

    if (!existLesson) {
      throw new AppError(400, "Invalid lesson_id");
    }

    if (existLesson.course_id !== payload.data.course_id) {
      throw new AppError(400, "This lesson not exist on that course");
    }

    return await LessonRepository.deleteLesson({
      lesson_id: payload.lesson_id,
      course_id: payload.data.course_id,
    });
  }
}
