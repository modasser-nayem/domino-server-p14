import config from "../../config";
import prisma from "../../db/connector";
import AppError from "../../errors/AppError";
import { bindAllMethods } from "../../utils/bindmethod";
import { Stripe } from "stripe";
import logger from "../../utils/logger";

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
});

export class EnrollmentService {
  constructor() {
    bindAllMethods(this);
  }

  // Create Stripe Checkout Session
  public async createCheckoutSession(payload: {
    courseId: string;
    studentId: string;
  }) {
    const course = await prisma.course.findUnique({
      where: { id: payload.courseId },
    });

    if (!course) {
      throw new AppError(404, "Invalid course ID");
    }

    if (course.status === "upcoming" || course.status === "closed") {
      throw new AppError(
        400,
        `This course is not eligible for enrollment. The course is ${course.status}`,
      );
    }

    const alreadyExist = await prisma.enrollment.findFirst({
      where: {
        student_id: payload.studentId,
        course_id: payload.courseId,
      },
    });

    if (alreadyExist) {
      throw new AppError(400, "You are already enrolled!");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: course.title },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${config.PAYMENT_SUCCESS_URL}`,
      cancel_url: `${config.PAYMENT_CANCEL_URL}`,
      metadata: {
        courseId: payload.courseId,
        studentId: payload.studentId,
      },
    });

    return { url: session.url };
  }

  // Handle Stripe Webhook
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async webhook(payload: { body: any; sig: any }) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload.body,
        payload.sig,
        config.STRIPE_WEBHOOK_SECRET,
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      logger.error("❌ Webhook signature verification failed:", err.message);
      throw new AppError(400, `Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const studentId = session.metadata?.studentId;
      const courseId = session.metadata?.courseId;

      if (!studentId || !courseId) {
        logger.error("❌ Missing metadata in session");
        throw new AppError(400, "Missing metadata in Stripe session");
      }

      try {
        // Idempotent logic: avoid duplicates on retry
        const existingPayment = await prisma.payment.findUnique({
          where: {
            stripe_session_id: session.id,
          },
        });

        if (existingPayment) {
          logger.warn("⚠️ Payment already recorded. Skipping...");
          return { received: true };
        }

        await prisma.$transaction([
          prisma.enrollment.create({
            data: {
              student_id: studentId,
              course_id: courseId,
            },
          }),
          prisma.payment.create({
            data: {
              student_id: studentId,
              course_id: courseId,
              stripe_session_id: session.id,
              stripe_payment_intent_id:
                session.payment_intent?.toString() || null,
              amount: session.amount_total || 0,
              currency: session.currency!,
              status: session.payment_status,
            },
          }),
        ]);

        logger.info("✅ Enrollment and payment recorded.");
        return { received: true };
      } catch (err) {
        logger.error("❌ Error saving enrollment/payment:", err);
        throw new AppError(500, "Error processing payment.");
      }
    }

    // If not the event type we care about
    return { received: true };
  }
}
