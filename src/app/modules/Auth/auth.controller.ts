import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { bindAllMethods } from "../../utils/bindmethod";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    bindAllMethods(this);
  }

  async registerStudent(req: Request, res: Response) {
    const result = await this.authService.register(
      { data: req.body },
      "student",
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Account successfully created",
      data: result,
    });
  }

  async registerInstructor(req: Request, res: Response) {
    const result = await this.authService.register(
      { data: req.body },
      "instructor",
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Account successfully created",
      data: result,
    });
  }

  async registerAdmin(req: Request, res: Response) {
    const result = await this.authService.register({ data: req.body }, "admin");

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Account successfully created",
      data: result,
    });
  }

  async login(req: Request, res: Response) {
    const result = await this.authService.login({ data: req.body });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully Login",
      data: result,
    });
  }

  async changePassword(req: Request, res: Response) {
    const result = await this.authService.changePassword({
      data: req.body,
      user: req.user,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully Update Password",
      data: result,
    });
  }

  async forgotPassword(req: Request, res: Response) {
    const result = await this.authService.forgotPassword({
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Check your email to reset your password",
      data: result,
    });
  }

  async resetPassword(req: Request, res: Response) {
    const result = await this.authService.resetPassword({
      data: req.body,
      token: req.query?.token as string | undefined,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully reset password",
      data: result,
    });
  }
}
