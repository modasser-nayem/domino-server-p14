import { Request, Response } from "express";
import { bindAllMethods } from "../../utils/bindmethod";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

export class CategoryController {
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
    bindAllMethods(this);
  }

  // Add Category
  async addCategory(req: Request, res: Response) {
    const result = await this.categoryService.addCategory({ data: req.body });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Successfully add new category",
      data: result,
    });
  }

  // Get all Category
  async getAllCategories(req: Request, res: Response) {
    const result = await this.categoryService.getAllCategories();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved categories",
      data: result,
    });
  }

  // Update Category
  async updateCategory(req: Request, res: Response) {
    const result = await this.categoryService.updateCategory({
      categoryId: req.params.id,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully update category",
      data: result,
    });
  }

  // Update Category
  async deleteCategory(req: Request, res: Response) {
    const result = await this.categoryService.deleteCategory({
      categoryId: req.params.id,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully delete category",
      data: result,
    });
  }
}
