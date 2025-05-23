import { Request, Response } from "express";
import { bindAllMethods } from "../../utils/bindmethod";
import sendResponse from "../../utils/sendResponse";
import { LessonService } from "./lesson.service";

export class LessonController {
  private lessonService: LessonService;
  constructor() {
    this.lessonService = new LessonService();
    bindAllMethods(this);
  }

  // Create new lesson
  async createLesson(req: Request, res: Response) {
    const result = await this.lessonService.createLesson({
      data: { course_id: req.params.courseId, ...req.body },
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Successfully create new lesson",
      data: result,
    });
  }

  // update lesson
  async updateLesson(req: Request, res: Response) {
    const result = await this.lessonService.updateLesson({
      courseId: req.params.courseId,
      lessonId: req.params.lessonId,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson Successfully Updated",
      data: result,
    });
  }

  // delete lesson
  async deleteLesson(req: Request, res: Response) {
    const result = await this.lessonService.deleteLesson({
      courseId: req.params.courseId,
      lessonId: req.params.lessonId,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Lesson successfully deleted",
      data: result,
    });
  }
}
