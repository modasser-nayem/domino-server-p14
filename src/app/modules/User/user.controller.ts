import { Request, Response } from "express";
import { bindAllMethods } from "../../utils/bindmethod";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    bindAllMethods(this);
  }

  // Get all user
  async getAllUsers(req: Request, res: Response) {
    const result = await this.userService.getAllUsers({ query: req.query });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved all users",
      data: result,
    });
  }

  // Get single user
  async getSingleUser(req: Request, res: Response) {
    const result = await this.userService.getSingleUser({
      userId: req.params.id,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved user profile",
      data: result,
    });
  }

  // Get user profile
  async getUserProfile(req: Request, res: Response) {
    const result = await this.userService.getUserProfile({ user: req.user });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Successfully retrieved Profile",
      data: result,
    });
  }

  // Update user profile
  async updateUserProfile(req: Request, res: Response) {
    const result = await this.userService.updateUserProfile({
      user: req.user,
      data: req.body,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile successfully updated",
      data: result,
    });
  }
}
