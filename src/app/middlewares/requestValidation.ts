import { ZodSchema } from "zod";
import { asyncHandler } from "../utils/asyncHandler";

const requestValidate = <T>(schema: ZodSchema<T>) => {
  return asyncHandler(async (req, res, next) => {
    const result = await schema.parseAsync(req.body);
    req.body = result;
    next();
  });
};

export default requestValidate;
