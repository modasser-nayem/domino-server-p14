/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import { PasswordHelper } from "../../utils/hash";
import { JwtService } from "../../utils/jwt";
import emailEmitter from "../../utils/mail/emmiter";

import {
  TChangePassword,
  TForgotPassword,
  TLoginUser,
  TRegisterUser,
  TResetPassword,
  TUserRole,
} from "./auth.interface";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  private readonly jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
    bindAllMethods(this);
  }

  public async register(payload: { data: TRegisterUser }, role: TUserRole) {
    payload.data.password = await PasswordHelper.hashPassword(
      payload.data.password,
    );
    payload.data.role = role;

    if (await AuthRepository.findByEmail(payload.data.email)) {
      throw new AppError(
        400,
        `User with the email ${payload.data.email} already exist`,
      );
    }
    return await AuthRepository.createUser({
      name: payload.data.name,
      email: payload.data.email,
      password: payload.data.password,
      profile_picture: payload.data.profile_picture,
      role: payload.data.role,
    });
  }

  async login(payload: { data: TLoginUser }) {
    const user = await AuthRepository.findByEmailWithPassword(
      payload.data.email,
    );

    // check user exist
    if (!user) {
      throw new AppError(400, "User not found!");
    }

    // check password match
    if (
      !(await PasswordHelper.comparePassword(
        payload.data.password,
        user.password,
      ))
    ) {
      throw new AppError(400, "incorrect password!");
    }

    const access_token = this.jwtService.signAccessToken({
      id: user.id,
      role: user.role,
    });

    return { access_token };
  }

  async changePassword(payload: { data: TChangePassword; user: any }) {
    const user = await AuthRepository.findByIdWithPassword(payload.user.id);

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    // check current password match
    if (
      !(await PasswordHelper.comparePassword(
        payload.data.currentPassword,
        user.password,
      ))
    ) {
      throw new AppError(400, "incorrect current password!");
    }

    const data = {
      email: user.email,
      password: await PasswordHelper.hashPassword(payload.data.newPassword),
    };

    // update password
    await AuthRepository.updatePassword(data);

    return null;
  }

  async forgotPassword(payload: { data: TForgotPassword }) {
    const user = await AuthRepository.findByEmail(payload.data.email);

    if (!user) {
      throw new AppError(404, "User not found!");
    }

    // generate forget token
    const forgotPassToken = this.jwtService.signForgotPassToken({
      id: user.id,
      role: user.role,
    });

    emailEmitter.emit("forgot-pass-email", {
      name: user.name,
      email: user.email,
      token: forgotPassToken,
    });

    return null;
  }

  async resetPassword(payload: { data: TResetPassword; token?: string }) {
    if (!payload.token) {
      throw new AppError(403, "Forbidden access");
    }

    const decodeUser = this.jwtService.verifyAccessToken(payload.token);

    const user = await AuthRepository.findById(decodeUser.id);

    if (!user) {
      throw new AppError(404, "User not exist!");
    }

    const data = {
      email: user.email,
      password: await PasswordHelper.hashPassword(payload.data.newPassword),
    };

    // update password
    await AuthRepository.updatePassword(data);

    return null;
  }
}
