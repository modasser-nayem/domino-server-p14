import prisma from "../../db/connector";
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
    return await prisma.category.delete({ where: { id: payload.categoryId } });
  }

  public static async findCategory(payload: {
    categoryId?: string;
    name?: string;
  }) {
    if (!payload.categoryId && !payload.name) {
      throw new Error("prismaError: Please provide category id or name");
    }
    return await prisma.category.findFirst({
      where: {
        OR: [{ name: payload.name }, { id: payload.categoryId }],
      },
    });
  }
}
