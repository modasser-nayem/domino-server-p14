import EventEmitter from "events";
import { sendEmail } from "./emailSender";
import emailTemplate from "./template/emailTemplate";
import config from "../../config";

class EmailEmitter extends EventEmitter {
  private resetPassUrl: string;

  constructor() {
    super();
    this.resetPassUrl = config.RESET_PASS_URL as string;
    this.on("forgot-pass-email", this.sendForgotPassEmail);
  }

  private async sendForgotPassEmail(data: {
    name: string;
    email: string;
    token: string;
  }) {
    const emailContent = await emailTemplate.generateForgotPassEmail(
      data.name,
      data.token,
      this.resetPassUrl,
    );

    await sendEmail({
      email: data.email,
      subject: "Reset your domino account password within 10 min",
      message: emailContent,
    });
  }
}

const emailEmitter = new EmailEmitter();
export default emailEmitter;
