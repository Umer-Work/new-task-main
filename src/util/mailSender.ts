import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { emailVerificationTemplate } from "../templates/emailVerificationTemplate";

dotenv.config();

export const emailVerification = async (email: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    const verificationLink = "www.dummy.link.com";
    const emailHTML = emailVerificationTemplate(verificationLink);

    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: "Email Verification",
      html: emailHTML,
    });

    return info;
  } catch (error) {
    return error;
  }
};
