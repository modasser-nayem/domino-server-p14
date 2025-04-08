import { z } from "zod";
import { userSchemaValidation } from "./user.validation";

export type TGetAllUserQuery = {
  usertype?: "student" | "instructor" | "admin";
};

export type TUpdateUserProfile = z.infer<
  typeof userSchemaValidation.updateProfile
>;
