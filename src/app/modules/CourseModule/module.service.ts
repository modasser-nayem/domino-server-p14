import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import { TCreateModule, TUpdateModule } from "./module.interface";
import { ModuleRepository } from "./module.repository";

export class ModuleService {
  constructor() {
    bindAllMethods(this);
  }

  // Create new module
  public async createModule(payload: { data: TCreateModule }) {
    const result = await ModuleRepository.createModule(payload);

    return result;
  }

  // Get module
  public async getModule(payload: { moduleId: string }) {
    const result = await ModuleRepository.getModule(payload);

    if (!result) {
      throw new AppError(404, "Module not found!");
    }

    return result;
  }

  // Update module
  public async updateModule(payload: {
    moduleId: string;
    data: TUpdateModule;
  }) {
    const currentModule = await ModuleRepository.findModuleById(
      payload.moduleId,
    );

    if (!currentModule) {
      throw new AppError(404, "Module not found!");
    }

    // if just title change
    if (payload.data.title && !payload.data.order) {
      payload.data.title = `${currentModule.order}: ${payload.data.title}`;
    }

    const result = await ModuleRepository.updateModule(payload);

    return result;
  }

  // Delete module
  public async deleteModule(payload: { moduleId: string }) {
    const result = await ModuleRepository.deleteModule(payload);

    return result;
  }
}
