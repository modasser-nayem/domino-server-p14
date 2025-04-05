import nodemailer, { TransportOptions } from "nodemailer";
import config from "../../config";

type TransportOptionsType = TransportOptions & {
  host: string;
  port: number;
  auth: { user: string; pass: string };
  tls: {
    rejectUnauthorized: boolean;
  };
};

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (option: EmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as TransportOptionsType);

  try {
    const message = {
      from: `Domino <${config.SMTP_USER}>`,
      to: option.email,
      subject: option.subject,
      text: option.message,
      html: option.message,
    };

    const info = await transporter.sendMail(message);
    console.log(`Message sent: ${info}`);
    return info;
  } catch (error) {
    return error;
  }
};

export { sendEmail };
