import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import { TGetAllUserQuery, TUpdateUserProfile } from "./user.interface";
import { paginate } from "../../utils/pagination";

export class UserRepository {
  public static async getAllUsers({ query }: { query: TGetAllUserQuery }) {
    const userRole = query.role;
    let where: Prisma.UserWhereInput = {};
    where = userRole ? { role: userRole, ...where } : where;

    const select: Prisma.UserSelect = {
      id: true,
      name: true,
      email: true,
      profile_picture: true,
      role: true,
      created_at: true,
    };

    const result = await paginate({
      model: prisma.user,
      page: query.page,
      limit: query.limit,
      where: where,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      select: select,
    });

    return result;
  }

  public static async getSingleUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        role: true,
        created_at: true,
      },
    });
  }

  public static async getUserProfile(id: string) {
    return await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        role: true,
        created_at: true,
      },
    });
  }

  public static async updateUserProfile({
    userId,
    data,
  }: {
    userId: string;
    data: TUpdateUserProfile;
  }) {
    return await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        role: true,
        created_at: true,
      },
    });
  }
}
