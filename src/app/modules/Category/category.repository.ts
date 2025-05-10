import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { TAddCategory, TUpdateCategory } from "./category.interface";

export class CategoryRepository {
  public static async addCategory(payload: { data: TAddCategory }) {
    return await prisma.category.create({ data: payload.data });
  }

  public static async getAllCategories() {
    return await prisma.category.findMany();
  }

  public static async updateCategory(payload: {
    categoryId: string;
    data: TUpdateCategory;
  }) {
    return await prisma.category.update({
      where: { id: payload.categoryId },
      data: payload.data,
    });
  }

  public static async deleteCategory(payload: { categoryId: string }) {
    const courseExistOnThisCategory = await prisma.course.findFirst({
      where: { category_id: payload.categoryId },
      select: { id: true, category_id: true },
    });

    if (courseExistOnThisCategory) {
      throw new AppError(
        400,
        "Courses are exist on that category, you can't delete it, either update category or course",
      );
    }
    return await prisma.category.delete({
      where: { id: payload.categoryId },
    });
  }

  public static async findCategoryById(id: string) {
    return await prisma.category.findUnique({
      where: { id: id },
    });
  }

  public static async findCategoryByName(name: string) {
    return await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }
}
