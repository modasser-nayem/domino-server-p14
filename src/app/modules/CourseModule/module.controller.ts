import { Request, Response } from "express";
import { bindAllMethods } from "../../utils/bindmethod";
import sendResponse from "../../utils/sendResponse";
import { ModuleService } from "./module.service";

export class ModuleController {
  private moduleService: ModuleService;
  constructor() {
    this.moduleService = new ModuleService();
    bindAllMethods(this);
  }

  // create new module
  async createModule(req: Request, res: Response) {
    const result = await this.moduleService.createModule({
      data: {
        courseId: req.params.courseId,
        lessonId: req.params.lessonId,
        ...req.body,
      },
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Successfully create new module",
      data: result,
    });
  }

  // Get module
  async getModule(req: Request, res: Response) {
    const result = await this.moduleService.getModule({
      moduleId: req.params.moduleId,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved module",
      data: result,
    });
  }

  // Update module
  async updateModule(req: Request, res: Response) {
    const result = await this.moduleService.updateModule({
      data: req.body,
      moduleId: req.params.moduleId,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module Successfully Updated",
      data: result,
    });
  }

  // Delete module
  async deleteModule(req: Request, res: Response) {
    const result = await this.moduleService.deleteModule({
      moduleId: req.params.moduleId,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Module Successfully Deleted",
      data: result,
    });
  }
}
