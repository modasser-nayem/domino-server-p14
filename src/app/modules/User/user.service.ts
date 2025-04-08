import { JwtPayload } from "jsonwebtoken";
import { bindAllMethods } from "../../utils/bindmethod";
import { TGetAllUserQuery, TUpdateUserProfile } from "./user.interface";
import { UserRepository } from "./user.repository";
import AppError from "../../errors/AppError";
import { AuthRepository } from "../Auth/auth.repository";

export class UserService {
  constructor() {
    bindAllMethods(this);
  }

  public async getAllUsers(payload: { query: TGetAllUserQuery }) {
    return await UserRepository.getAllUsers(payload.query);
  }

  public async getAllInstructor() {
    return await UserRepository.getAllInstructor();
  }

  public async getSingleUser(payload: { userId: string }) {
    const user = await UserRepository.getSingleUser(payload.userId);

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    return user;
  }

  public async getUserProfile(payload: { user: JwtPayload }) {
    const user = await UserRepository.getUserProfile(payload.user.id);

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    return user;
  }

  public async updateUserProfile(payload: {
    user: JwtPayload;
    data: TUpdateUserProfile;
  }) {
    if (payload.data.email) {
      // if email already exist without this user
      const existEmail = await AuthRepository.findByEmail(payload.data.email);

      // if email already exist without this user
      if (existEmail && existEmail.id !== payload.user.id) {
        throw new AppError(
          400,
          "Email already exist, please try another email",
        );
      }
    }

    return await UserRepository.updateUserProfile({
      userId: payload.user.id,
      data: payload.data,
    });
  }
}
