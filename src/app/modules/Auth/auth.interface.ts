import { z } from "zod";
import { authSchemaValidation } from "./auth.validation";

export type TRegisterUser = z.infer<typeof authSchemaValidation.register>;

export type TLoginUser = z.infer<typeof authSchemaValidation.login>;
