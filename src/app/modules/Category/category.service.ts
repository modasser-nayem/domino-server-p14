import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import { TAddCategory, TUpdateCategory } from "./category.interface";
import { CategoryRepository } from "./category.repository";

export class CategoryService {
  constructor() {
    bindAllMethods(this);
  }

  public async addCategory(payload: { data: TAddCategory }) {
    const existName = await CategoryRepository.findCategoryByName(
      payload.data.name,
    );

    if (existName) {
      throw new AppError(400, "Category name already exist!");
    }

    return await CategoryRepository.addCategory({ data: payload.data });
  }

  public async getAllCategories() {
    return await CategoryRepository.getAllCategories();
  }

  public async updateCategory(payload: {
    categoryId: string;
    data: TUpdateCategory;
  }) {
    if (!(await CategoryRepository.findCategoryById(payload.categoryId))) {
      throw new AppError(404, "Invalid category ID!");
    }

    const existName = await CategoryRepository.findCategoryByName(
      payload.data.name!,
    );

    if (existName && existName.id !== payload.categoryId) {
      throw new AppError(400, "Category name already exist!");
    }

    return await CategoryRepository.updateCategory(payload);
  }

  public async deleteCategory(payload: { categoryId: string }) {
    if (!(await CategoryRepository.findCategoryById(payload.categoryId))) {
      throw new AppError(404, "Invalid category ID!");
    }

    return await CategoryRepository.deleteCategory(payload);
  }
}
