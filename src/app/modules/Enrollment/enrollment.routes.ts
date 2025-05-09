import express from "express";
import { authMiddleware } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";

import { asyncHandler } from "../../utils/asyncHandler";
import { enrollmentSchemaValidation } from "./enrollment.validation";
import { EnrollmentController } from "./enrollment.controller";

class EnrollmentRouter {
  public router: express.Router;
  private enrollmentController: EnrollmentController;
  constructor() {
    this.router = express.Router({ mergeParams: true });
    this.enrollmentController = new EnrollmentController();
    this.initRoutes();
  }

  private initRoutes() {
    // checkout
    this.router.post(
      "/checkout",
      authMiddleware("student"),
      requestValidate(enrollmentSchemaValidation.enroll),
      asyncHandler(this.enrollmentController.initiateCheckout),
    );

    // stripe webhook for check success and enroll course also store payment data
    this.router.post(
      "/webhook/stripe",
      express.raw({ type: "application/json" }),
      this.enrollmentController.handleStripeWebhook,
    );
  }
}

const enrollmentRoutes = new EnrollmentRouter().router;
export default enrollmentRoutes;
