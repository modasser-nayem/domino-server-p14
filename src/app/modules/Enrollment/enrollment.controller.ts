import { Request, Response } from "express";
import { bindAllMethods } from "../../utils/bindmethod";
import sendResponse from "../../utils/sendResponse";
import { EnrollmentService } from "./enrollment.service";

export class EnrollmentController {
  private enrollmentService: EnrollmentService;

  constructor() {
    this.enrollmentService = new EnrollmentService();
    bindAllMethods(this);
  }

  // POST /enrollments/checkout
  async initiateCheckout(req: Request, res: Response) {
    const result = await this.enrollmentService.createCheckoutSession({
      courseId: req.body.courseId,
      studentId: req.user.id,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Checkout session created successfully.",
      data: result,
    });
  }

  // POST /enrollments/webhook/stripe
  async handleStripeWebhook(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"];

    const result = await this.enrollmentService.webhook({
      body: req.body,
      sig: sig,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Stripe webhook processed successfully.",
      data: result,
    });
  }
}
