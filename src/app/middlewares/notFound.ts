import { RequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notfound: RequestHandler = (req, res, next) => {
   res.status(404).json({
      success: false,
      message: "Resource not found",
      errors: null,
   });
};
