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

  async register(req: Request, res: Response) {
    const result = await this.authService.register({ data: req.body });

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
}
