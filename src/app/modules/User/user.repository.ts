import { Prisma } from "@prisma/client";
import prisma from "../../db/connector";
import { TGetAllUserQuery, TUpdateUserProfile } from "./user.interface";

export class UserRepository {
  public static async getAllUsers(query: TGetAllUserQuery) {
    const userType = query.usertype;
    const filter: Prisma.UserWhereInput = {};

    if (
      (userType && userType === "student") ||
      userType === "instructor" ||
      userType === "admin"
    ) {
      filter.role = query.usertype;
    }

    const result = await prisma.user.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        role: true,
      },
    });

    return result;
  }

  public static async getAllInstructor() {
    return await prisma.user.findMany({
      where: { role: "instructor" },
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        role: true,
      },
    });
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
      },
    });
  }

  public static async getUserProfile(id: string) {
    return await this.getSingleUser(id);
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
      },
    });
  }
}
