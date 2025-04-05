import prisma from "../../db/connector";
import { prismaExclude } from "../../utils/prisma";
import { TRegisterUser } from "./auth.interface";

export class AuthRepository {
  public static async createUser(data: TRegisterUser) {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        profile_picture: data.profile_picture,
        role: data.role,
      },
    });

    return prismaExclude(user, ["password"]);
  }

  public static async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return prismaExclude(user, ["password"]);
    }
    return user;
  }

  public static async findByEmailWithPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  public static async findById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return prismaExclude(user, ["password"]);
    }
    return user;
  }

  public static async findByIdWithPassword(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  public static async updatePassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    await prisma.user.update({
      where: { email },
      data: { password: password },
    });
    return null;
  }
}
