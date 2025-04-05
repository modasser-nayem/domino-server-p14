import { z } from "zod";
import { authSchemaValidation } from "./auth.validation";

export type TUserRole = "student" | "instructor" | "admin";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  role: TUserRole;
};

export type TLoginUser = z.infer<typeof authSchemaValidation.login>;

export type TChangePassword = z.infer<
  typeof authSchemaValidation.changePassword
>;

export type TForgotPassword = z.infer<
  typeof authSchemaValidation.forgotPassword
>;

export type TResetPassword = z.infer<typeof authSchemaValidation.resetPassword>;
