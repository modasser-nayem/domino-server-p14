import { z } from "zod";
import { userSchemaValidation } from "./user.validation";
import { PaginationQuery } from "../../types/pagination";
import { UserRole } from "@prisma/client";

export type TGetAllUserQuery = PaginationQuery & { role?: UserRole };

export type TUpdateUserProfile = z.infer<
  typeof userSchemaValidation.updateProfile
>;
